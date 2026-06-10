"""Level loading, validation, and query helpers."""

from __future__ import annotations

import json
from collections.abc import Mapping, Sequence
from pathlib import Path
from typing import Any

from backend.app.schemas import LevelDefinition, LevelMeta, LevelValidationError

# Tile symbols are resolved from the contract at load time; this set is the
# required contract value and is also used as the validation target.
_REQUIRED_TILE_SYMBOLS: frozenset[str] = frozenset({".", "#", "P", "B", "G"})
_EXPECTED_IDS: list[int] = [1, 2, 3, 4, 5]
_SLUG_PATTERN = "level-{id}"


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
    """Validate *levels* against *contract* and return sorted LevelDefinition list.

    Stops on the first validation failure.

    Raises:
        LevelValidationError: describing the first violation found.
    """
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
    if sorted(ids) != _EXPECTED_IDS or len(ids) != len(set(ids)):
        raise LevelValidationError(
            "LEVEL_ID_SEQUENCE_INVALID",
            f"Level IDs must be exactly {_EXPECTED_IDS} with no duplicates.",
            {"got": ids},
        )

    definitions: list[LevelDefinition] = []
    for raw in levels:
        definitions.append(_validate_one(raw, legal_tiles))

    return sorted(definitions, key=lambda lv: lv.id)


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
            "LEVEL_GRID_EMPTY",
            f"Level {level_id} grid must be a non-empty array.",
            {"levelId": level_id},
        )

    # --- Rectangular (all rows same length) — checked before dimension match ---
    row_lengths = {len(row) for row in grid}
    if len(row_lengths) != 1:
        raise LevelValidationError(
            "LEVEL_GRID_NOT_RECTANGULAR",
            f"Level {level_id} grid rows have inconsistent lengths.",
            {"levelId": level_id, "lengths": sorted(row_lengths)},
        )

    # --- Dimensions ---
    width = raw.get("width")
    height = raw.get("height")
    if not isinstance(width, int) or not isinstance(height, int):
        raise LevelValidationError(
            "LEVEL_DIMENSIONS_INVALID",
            f"Level {level_id} width and height must be integers.",
            {"levelId": level_id},
        )
    if width < 3 or height < 3:
        raise LevelValidationError(
            "LEVEL_DIMENSIONS_INVALID",
            f"Level {level_id} width and height must be >= 3.",
            {"levelId": level_id, "width": width, "height": height},
        )
    if len(grid) != height:
        raise LevelValidationError(
            "LEVEL_DIMENSIONS_INVALID",
            f"Level {level_id} grid row count {len(grid)} does not match height {height}.",
            {"levelId": level_id},
        )
    if any(len(row) != width for row in grid):
        raise LevelValidationError(
            "LEVEL_DIMENSIONS_INVALID",
            f"Level {level_id} grid column count does not match width {width}.",
            {"levelId": level_id},
        )

    # --- Tile validity ---
    for r, row in enumerate(grid):
        for c, ch in enumerate(row):
            if ch not in legal_tiles:
                raise LevelValidationError(
                    "LEVEL_TILE_INVALID",
                    f"Level {level_id} contains illegal tile '{ch}' at row {r}, col {c}.",
                    {"levelId": level_id, "tile": ch, "row": r, "col": c},
                )

    # --- Boundary: every cell in first/last row and first/last col must be '#' ---
    for c in range(width):
        if grid[0][c] != "#" or grid[height - 1][c] != "#":
            raise LevelValidationError(
                "LEVEL_BOUNDARY_INVALID",
                f"Level {level_id} boundary is not fully walled.",
                {"levelId": level_id},
            )
    for r in range(height):
        if grid[r][0] != "#" or grid[r][width - 1] != "#":
            raise LevelValidationError(
                "LEVEL_BOUNDARY_INVALID",
                f"Level {level_id} boundary is not fully walled.",
                {"levelId": level_id},
            )

    # --- Tile counts ---
    flat = "".join(grid)
    player_count = flat.count("P")
    goal_count = flat.count("G")
    block_count = flat.count("B")

    if player_count != 1:
        raise LevelValidationError(
            "LEVEL_PLAYER_COUNT_INVALID",
            f"Level {level_id} must have exactly 1 player tile, found {player_count}.",
            {"levelId": level_id, "count": player_count},
        )
    if goal_count < 1:
        raise LevelValidationError(
            "LEVEL_GOAL_COUNT_INVALID",
            f"Level {level_id} must have at least 1 goal tile, found {goal_count}.",
            {"levelId": level_id, "count": goal_count},
        )
    if block_count < 1:
        raise LevelValidationError(
            "LEVEL_BLOCK_COUNT_INVALID",
            f"Level {level_id} must have at least 1 block tile, found {block_count}.",
            {"levelId": level_id, "count": block_count},
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
