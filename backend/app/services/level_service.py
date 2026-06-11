"""Level loading, validation, and query helpers."""

from __future__ import annotations

import json
from collections.abc import Mapping, Sequence
from pathlib import Path
from typing import Any, TypedDict

from backend.app.schemas import LevelDefinition, LevelMeta, LevelValidationError

# Tile symbols are resolved from the contract at load time; this set is the
# required contract value and is also used as the validation target.
_REQUIRED_TILE_SYMBOLS: frozenset[str] = frozenset({".", "#", "P", "B", "G"})
_CANONICAL_EXPECTED_IDS: list[int] = list(range(1, 21))
_CANDIDATE_EXPECTED_IDS: list[int] = list(range(6, 21))
_SLUG_PATTERN = "level-{id}"
_RESOURCE_MANIFEST_VERSION = "0.1.0"


class LevelResourceSegmentAnalysis(TypedDict):
    name: str
    fromRow: int
    toRow: int
    rise: int
    requiredBlocks: int


class LevelResourceAnalysis(TypedDict):
    levelId: int
    availableBlocks: int
    requiredBlocks: int
    surplusBlocks: int
    segments: list[LevelResourceSegmentAnalysis]


# ---------------------------------------------------------------------------
# Contract loader
# ---------------------------------------------------------------------------


def load_contract(path: str | Path) -> dict[str, Any]:
    """Load and return the app contract JSON.

    Raises:
        LevelValidationError: LEVELS_FILE_NOT_FOUND or LEVELS_JSON_INVALID.
    """
    path = Path(path)
    if not path.exists():
        raise LevelValidationError(
            "LEVELS_FILE_NOT_FOUND",
            "Contract file not found.",
            {"path": str(path)},
        )
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        raise LevelValidationError(
            "LEVELS_JSON_INVALID",
            "Contract JSON is invalid.",
            {"path": str(path)},
        )


# ---------------------------------------------------------------------------
# Level loaders
# ---------------------------------------------------------------------------


def load_levels(path: str | Path) -> list[LevelDefinition]:
    """Load and validate levels from *path*.

    Raises:
        LevelValidationError: on any file, parse, or validation failure.
    """
    from backend.app.settings import get_settings  # local import avoids circular

    path = Path(path)
    if not path.exists():
        raise LevelValidationError(
            "LEVELS_FILE_NOT_FOUND",
            "Levels file not found.",
            {"path": str(path)},
        )
    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        raise LevelValidationError(
            "LEVELS_JSON_INVALID",
            "Levels JSON is invalid.",
            {"path": str(path)},
        )

    if not isinstance(raw, dict) or "levels" not in raw:
        raise LevelValidationError(
            "LEVELS_ROOT_INVALID",
            "Levels JSON must be an object with a 'levels' array.",
        )

    settings = get_settings()
    contract = load_contract(settings.shared_contract_path)
    return validate_levels(raw["levels"], contract)


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------


def validate_levels(
    levels: Any,
    contract: Mapping[str, Any],
) -> list[LevelDefinition]:
    """Validate canonical levels against *contract*.

    Stops on the first validation failure.

    Raises:
        LevelValidationError: describing the first violation found.
    """
    return _validate_level_sequence(levels, contract, _CANONICAL_EXPECTED_IDS)


def validate_candidate_levels(
    levels: Any,
    contract: Mapping[str, Any],
) -> list[LevelDefinition]:
    """Validate candidate levels 6-20 from the intake source."""
    return _validate_level_sequence(levels, contract, _CANDIDATE_EXPECTED_IDS)


def analyze_level_resources(
    levels: Sequence[LevelDefinition],
    resource_manifest: Mapping[str, Any],
) -> list[LevelResourceAnalysis]:
    """Compare available blocks against deterministic scaffold requirements."""
    if not isinstance(resource_manifest, Mapping):
        raise _resource_manifest_error("Resource manifest must be a JSON object.")

    version = resource_manifest.get("version")
    if version != _RESOURCE_MANIFEST_VERSION:
        raise _resource_manifest_error(
            "Resource manifest version is invalid.",
            {"expected": _RESOURCE_MANIFEST_VERSION, "got": version},
        )

    entries = resource_manifest.get("levels")
    if not isinstance(entries, list):
        raise _resource_manifest_error("Resource manifest must include a levels array.")

    expected_ids = _CANDIDATE_EXPECTED_IDS
    try:
        manifest_ids = [entry["levelId"] for entry in entries]
    except (TypeError, KeyError):
        raise _resource_manifest_error(
            "Every resource entry must include levelId.",
        )

    expected = list(expected_ids)
    if manifest_ids != expected:
        raise _resource_manifest_error(
            f"Resource manifest IDs must be exactly {expected} in order.",
            {"expected": expected, "got": manifest_ids},
        )

    levels_by_id = {level.id: level for level in levels}
    missing_levels = [level_id for level_id in expected if level_id not in levels_by_id]
    if missing_levels:
        raise _resource_manifest_error(
            "Resource manifest references levels that are not loaded.",
            {"levelIds": missing_levels},
        )

    reports: list[LevelResourceAnalysis] = []
    for entry in entries:
        reports.append(_analyze_one_level_resource(levels_by_id[entry["levelId"]], entry))

    return reports


def _resource_manifest_error(
    message: str,
    details: dict[str, Any] | None = None,
) -> LevelValidationError:
    return LevelValidationError("LEVEL_RESOURCE_MANIFEST_INVALID", message, details)


def _analyze_one_level_resource(
    level: LevelDefinition,
    entry: Any,
) -> LevelResourceAnalysis:
    if not isinstance(entry, Mapping):
        raise _resource_manifest_error(
            "Each resource entry must be a JSON object.",
        )

    level_id = level.id
    segments = entry.get("segments")
    if not isinstance(segments, list) or len(segments) == 0:
        raise _resource_manifest_error(
            f"Level {level_id} resource entry must include segments.",
            {"levelId": level_id},
        )

    seen_names: set[str] = set()
    segment_reports: list[LevelResourceSegmentAnalysis] = []
    required_blocks = 0
    for segment in segments:
        report = _analyze_resource_segment(level, segment, seen_names)
        segment_reports.append(report)
        required_blocks += report["requiredBlocks"]

    available_blocks = sum(row.count("B") for row in level.grid)
    surplus_blocks = available_blocks - required_blocks
    if surplus_blocks < 0:
        raise LevelValidationError(
            "LEVEL_RESOURCE_DEFICIT",
            f"Level {level_id} needs {required_blocks} blocks but has {available_blocks}.",
            {
                "levelId": level_id,
                "availableBlocks": available_blocks,
                "requiredBlocks": required_blocks,
                "surplusBlocks": surplus_blocks,
            },
        )

    return {
        "levelId": level_id,
        "availableBlocks": available_blocks,
        "requiredBlocks": required_blocks,
        "surplusBlocks": surplus_blocks,
        "segments": segment_reports,
    }


def _analyze_resource_segment(
    level: LevelDefinition,
    segment: Any,
    seen_names: set[str],
) -> LevelResourceSegmentAnalysis:
    if not isinstance(segment, Mapping):
        raise _resource_manifest_error(
            "Each resource segment must be a JSON object.",
            {"levelId": level.id},
        )

    name = segment.get("name")
    if not isinstance(name, str) or name.strip() == "":
        raise _resource_manifest_error(
            f"Level {level.id} resource segment name must be non-empty.",
            {"levelId": level.id},
        )
    if name in seen_names:
        raise _resource_manifest_error(
            f"Level {level.id} resource segment names must be unique.",
            {"levelId": level.id, "name": name},
        )
    seen_names.add(name)

    from_row = segment.get("fromRow")
    to_row = segment.get("toRow")
    if type(from_row) is not int or type(to_row) is not int:
        raise _resource_manifest_error(
            f"Level {level.id} resource segment rows must be integers.",
            {"levelId": level.id, "name": name},
        )
    if not 0 <= from_row < level.height or not 0 <= to_row < level.height:
        raise _resource_manifest_error(
            f"Level {level.id} resource segment rows must be within level height.",
            {
                "levelId": level.id,
                "name": name,
                "fromRow": from_row,
                "toRow": to_row,
                "height": level.height,
            },
        )

    rise = max(0, from_row - to_row)
    required_blocks = rise * (rise + 1) // 2
    return {
        "name": name,
        "fromRow": from_row,
        "toRow": to_row,
        "rise": rise,
        "requiredBlocks": required_blocks,
    }


def _validate_level_sequence(
    levels: Any,
    contract: Mapping[str, Any],
    expected_ids: Sequence[int],
) -> list[LevelDefinition]:
    """Validate a level sequence for an exact expected ID set."""
    if not isinstance(levels, list):
        raise LevelValidationError(
            "LEVELS_ROOT_INVALID",
            "Levels must be a JSON array.",
        )

    # Derive legal tile symbols from the contract.
    tiles_contract: dict[str, str] = contract.get("tiles", {})
    legal_tiles: frozenset[str] = frozenset(tiles_contract.values())
    if legal_tiles != _REQUIRED_TILE_SYMBOLS:
        raise LevelValidationError(
            "LEVELS_ROOT_INVALID",
            "Contract tile symbols do not match expected set.",
            {"expected": sorted(_REQUIRED_TILE_SYMBOLS), "got": sorted(legal_tiles)},
        )

    # Validate IDs form the exact expected sequence.
    try:
        ids = [lv["id"] for lv in levels]
    except (TypeError, KeyError):
        raise LevelValidationError(
            "LEVEL_ID_SEQUENCE_INVALID",
            "Every level must have an integer 'id' field.",
        )
    expected = list(expected_ids)
    if ids != expected:
        raise LevelValidationError(
            "LEVEL_ID_SEQUENCE_INVALID",
            f"Level IDs must be exactly {expected} in order.",
            {"expected": expected, "got": ids},
        )

    definitions: list[LevelDefinition] = []
    seen_titles: set[str] = set()
    for raw in levels:
        _validate_title(raw, seen_titles)
        _validate_difficulty(raw)
        definitions.append(_validate_one(raw, legal_tiles))

    return definitions


def _validate_title(raw: Any, seen_titles: set[str]) -> None:
    if not isinstance(raw, dict):
        raise LevelValidationError(
            "LEVELS_ROOT_INVALID",
            "Each level must be a JSON object.",
        )

    level_id = raw.get("id")
    title = raw.get("title")
    if not isinstance(title, str) or title.strip() == "":
        raise LevelValidationError(
            "LEVEL_TITLE_INVALID",
            f"Level {level_id} title must be a non-empty string.",
            {"levelId": level_id},
        )
    if title in seen_titles:
        raise LevelValidationError(
            "LEVEL_TITLE_INVALID",
            f"Level {level_id} title must be unique.",
            {"levelId": level_id, "title": title},
        )
    seen_titles.add(title)


def _validate_difficulty(raw: Any) -> None:
    if not isinstance(raw, dict):
        raise LevelValidationError(
            "LEVELS_ROOT_INVALID",
            "Each level must be a JSON object.",
        )

    level_id = raw.get("id")
    difficulty = raw.get("difficulty")
    if not isinstance(difficulty, int) or difficulty != level_id:
        raise LevelValidationError(
            "LEVEL_DIFFICULTY_INVALID",
            f"Level {level_id} difficulty must equal its id.",
            {"levelId": level_id, "expected": level_id, "got": difficulty},
        )


def _validate_one(raw: Any, legal_tiles: frozenset[str]) -> LevelDefinition:
    """Validate a single raw level dict and return a LevelDefinition."""
    if not isinstance(raw, dict):
        raise LevelValidationError(
            "LEVELS_ROOT_INVALID",
            "Each level must be a JSON object.",
        )

    level_id = raw.get("id")

    # --- Slug ---
    slug = raw.get("slug", "")
    expected_slug = _SLUG_PATTERN.format(id=level_id)
    if slug != expected_slug:
        raise LevelValidationError(
            "LEVEL_SLUG_INVALID",
            f"Level {level_id} slug must be '{expected_slug}', got '{slug}'.",
            {"levelId": level_id, "expected": expected_slug, "got": slug},
        )

    # --- Grid presence ---
    grid = raw.get("grid")
    if not isinstance(grid, list) or len(grid) == 0:
        raise LevelValidationError(
            "LEVEL_GRID_DIMENSIONS_INVALID",
            f"Level {level_id} grid must be a non-empty array.",
            {"levelId": level_id},
        )
    if not all(isinstance(row, str) for row in grid):
        raise LevelValidationError(
            "LEVEL_GRID_DIMENSIONS_INVALID",
            f"Level {level_id} grid rows must be strings.",
            {"levelId": level_id},
        )

    # --- Rectangular (all rows same length) — checked before dimension match ---
    row_lengths = {len(row) for row in grid}
    if len(row_lengths) != 1:
        raise LevelValidationError(
            "LEVEL_GRID_DIMENSIONS_INVALID",
            f"Level {level_id} grid rows have inconsistent lengths.",
            {"levelId": level_id, "lengths": sorted(row_lengths)},
        )

    # --- Dimensions ---
    width = raw.get("width")
    height = raw.get("height")
    if not isinstance(width, int) or not isinstance(height, int):
        raise LevelValidationError(
            "LEVEL_GRID_DIMENSIONS_INVALID",
            f"Level {level_id} width and height must be integers.",
            {"levelId": level_id},
        )
    if width < 3 or height < 3:
        raise LevelValidationError(
            "LEVEL_GRID_DIMENSIONS_INVALID",
            f"Level {level_id} width and height must be >= 3.",
            {"levelId": level_id, "width": width, "height": height},
        )
    if len(grid) != height:
        raise LevelValidationError(
            "LEVEL_GRID_DIMENSIONS_INVALID",
            f"Level {level_id} grid row count {len(grid)} does not match height {height}.",
            {"levelId": level_id},
        )
    if any(len(row) != width for row in grid):
        raise LevelValidationError(
            "LEVEL_GRID_DIMENSIONS_INVALID",
            f"Level {level_id} grid column count does not match width {width}.",
            {"levelId": level_id},
        )

    # --- Tile validity ---
    for r, row in enumerate(grid):
        for c, ch in enumerate(row):
            if ch not in legal_tiles:
                raise LevelValidationError(
                    "LEVEL_GRID_SYMBOL_INVALID",
                    f"Level {level_id} contains illegal tile '{ch}' at row {r}, col {c}.",
                    {"levelId": level_id, "tile": ch, "row": r, "col": c},
                )

    # --- Boundary: every cell in first/last row and first/last col must be '#' ---
    for c in range(width):
        if grid[0][c] != "#" or grid[height - 1][c] != "#":
            row = 0 if grid[0][c] != "#" else height - 1
            raise LevelValidationError(
                "LEVEL_GRID_BOUNDARY_INVALID",
                f"Level {level_id} boundary is not fully walled.",
                {"levelId": level_id, "row": row, "col": c},
            )
    for r in range(height):
        if grid[r][0] != "#" or grid[r][width - 1] != "#":
            col = 0 if grid[r][0] != "#" else width - 1
            raise LevelValidationError(
                "LEVEL_GRID_BOUNDARY_INVALID",
                f"Level {level_id} boundary is not fully walled.",
                {"levelId": level_id, "row": r, "col": col},
            )

    # --- Tile counts ---
    flat = "".join(grid)
    player_count = flat.count("P")
    goal_count = flat.count("G")
    block_count = flat.count("B")

    if player_count != 1:
        raise LevelValidationError(
            "LEVEL_ENTITY_COUNT_INVALID",
            f"Level {level_id} must have exactly 1 player tile, found {player_count}.",
            {"levelId": level_id, "count": player_count},
        )
    if goal_count != 1:
        raise LevelValidationError(
            "LEVEL_ENTITY_COUNT_INVALID",
            f"Level {level_id} must have exactly 1 goal tile, found {goal_count}.",
            {"levelId": level_id, "count": goal_count},
        )
    if block_count < 1:
        raise LevelValidationError(
            "LEVEL_ENTITY_COUNT_INVALID",
            f"Level {level_id} must have at least 1 block tile, found {block_count}.",
            {"levelId": level_id, "count": block_count},
        )

    for r, row in enumerate(grid[:-1]):
        for c, ch in enumerate(row):
            if ch in {"P", "B"} and grid[r + 1][c] not in {"#", "B"}:
                raise LevelValidationError(
                    "LEVEL_INITIAL_STATE_UNSTABLE",
                    f"Level {level_id} has unsupported '{ch}' at row {r}, col {c}.",
                    {
                        "levelId": level_id,
                        "row": r,
                        "col": c,
                        "got": grid[r + 1][c],
                    },
                )

    return LevelDefinition(
        id=level_id,
        slug=slug,
        title=raw.get("title", ""),
        width=width,
        height=height,
        difficulty=raw.get("difficulty", 1),
        grid=grid,
    )


# ---------------------------------------------------------------------------
# Query helpers
# ---------------------------------------------------------------------------


def list_level_meta(levels: Sequence[LevelDefinition]) -> list[LevelMeta]:
    """Return metadata for all levels, sorted by id, without grid data."""
    return sorted(
        [
            LevelMeta(
                id=lv.id,
                slug=lv.slug,
                title=lv.title,
                width=lv.width,
                height=lv.height,
                difficulty=lv.difficulty,
            )
            for lv in levels
        ],
        key=lambda m: m.id,
    )


def get_level(levels: Sequence[LevelDefinition], level_id: int) -> LevelDefinition:
    """Return the level with *level_id*.

    Raises:
        LevelValidationError: LEVEL_NOT_FOUND if no matching level exists.
    """
    for lv in levels:
        if lv.id == level_id:
            return lv
    raise LevelValidationError(
        "LEVEL_NOT_FOUND",
        "Level not found.",
        {"levelId": level_id},
    )
