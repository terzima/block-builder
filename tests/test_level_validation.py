"""Tests for level loading and validation service."""

import copy
import json
from pathlib import Path

import pytest

from backend.app.services.level_service import (
    get_level,
    list_level_meta,
    load_levels,
)
from backend.app.schemas import LevelDefinition, LevelValidationError

LEVELS_PATH = Path("backend/app/data/levels.json")


def _mutated(tmp_path: Path, mutate_fn) -> Path:
    """Load the canonical levels fixture, apply mutate_fn, write to tmp_path."""
    data = json.loads(LEVELS_PATH.read_text())
    mutate_fn(data)
    out = tmp_path / "levels.json"
    out.write_text(json.dumps(data))
    return out


# ---------------------------------------------------------------------------
# Happy-path tests
# ---------------------------------------------------------------------------


def test_plan_level_file_is_valid():
    levels = load_levels(LEVELS_PATH)
    assert [lv.id for lv in levels] == [1, 2, 3, 4, 5]
    assert all(isinstance(lv, LevelDefinition) for lv in levels)


def test_list_level_meta_omits_grid():
    levels = load_levels(LEVELS_PATH)
    for meta in list_level_meta(levels):
        assert not hasattr(meta, "grid") or meta.model_fields_set.isdisjoint({"grid"})
        serialized = meta.model_dump()
        assert "grid" not in serialized


def test_get_level_returns_exact_level():
    levels = load_levels(LEVELS_PATH)
    lv = get_level(levels, 1)
    assert lv.slug == "level-1"
    assert lv.title == "First Steps"


def test_get_level_missing_raises_level_not_found():
    levels = load_levels(LEVELS_PATH)
    with pytest.raises(LevelValidationError) as exc:
        get_level(levels, 99)
    assert exc.value.code == "LEVEL_NOT_FOUND"
    assert exc.value.details == {"levelId": 99}


# ---------------------------------------------------------------------------
# Parameterized failure cases
# ---------------------------------------------------------------------------


def _missing_file(tmp_path: Path) -> Path:
    return tmp_path / "missing.json"


def _invalid_json(tmp_path: Path) -> Path:
    p = tmp_path / "levels.json"
    p.write_text("{")
    return p


def _invalid_root(tmp_path: Path) -> Path:
    p = tmp_path / "levels.json"
    p.write_text("[]")
    return p


def _duplicate_id(tmp_path: Path) -> Path:
    return _mutated(tmp_path, lambda d: d["levels"].__setitem__(1, {**d["levels"][1], "id": 1}))


def _bad_slug(tmp_path: Path) -> Path:
    return _mutated(tmp_path, lambda d: d["levels"][0].update({"slug": "bad"}))


def _bad_dimensions(tmp_path: Path) -> Path:
    return _mutated(tmp_path, lambda d: d["levels"][0].update({"width": 99}))


def _empty_grid(tmp_path: Path) -> Path:
    return _mutated(tmp_path, lambda d: d["levels"][0].update({"grid": []}))


def _ragged_grid(tmp_path: Path) -> Path:
    def mutate(d):
        d["levels"][0]["grid"][1] = d["levels"][0]["grid"][1] + "#"
    return _mutated(tmp_path, mutate)


def _invalid_tile(tmp_path: Path) -> Path:
    def mutate(d):
        row = d["levels"][0]["grid"][1]
        d["levels"][0]["grid"][1] = row.replace(".", "X", 1)
    return _mutated(tmp_path, mutate)


def _missing_player(tmp_path: Path) -> Path:
    def mutate(d):
        for i, row in enumerate(d["levels"][0]["grid"]):
            d["levels"][0]["grid"][i] = row.replace("P", ".")
    return _mutated(tmp_path, mutate)


def _missing_goal(tmp_path: Path) -> Path:
    def mutate(d):
        for i, row in enumerate(d["levels"][0]["grid"]):
            d["levels"][0]["grid"][i] = row.replace("G", ".")
    return _mutated(tmp_path, mutate)


def _missing_block(tmp_path: Path) -> Path:
    def mutate(d):
        for lv in d["levels"]:
            lv["grid"] = [row.replace("B", ".") for row in lv["grid"]]
    return _mutated(tmp_path, mutate)


def _open_boundary(tmp_path: Path) -> Path:
    def mutate(d):
        row = list(d["levels"][0]["grid"][0])
        row[0] = "."
        d["levels"][0]["grid"][0] = "".join(row)
    return _mutated(tmp_path, mutate)


@pytest.mark.parametrize(
    "build_path,expected_code",
    [
        (_missing_file, "LEVELS_FILE_NOT_FOUND"),
        (_invalid_json, "LEVELS_JSON_INVALID"),
        (_invalid_root, "LEVELS_ROOT_INVALID"),
        (_duplicate_id, "LEVEL_ID_SEQUENCE_INVALID"),
        (_bad_slug, "LEVEL_SLUG_INVALID"),
        (_bad_dimensions, "LEVEL_DIMENSIONS_INVALID"),
        (_empty_grid, "LEVEL_GRID_EMPTY"),
        (_ragged_grid, "LEVEL_GRID_NOT_RECTANGULAR"),
        (_invalid_tile, "LEVEL_TILE_INVALID"),
        (_missing_player, "LEVEL_PLAYER_COUNT_INVALID"),
        (_missing_goal, "LEVEL_GOAL_COUNT_INVALID"),
        (_missing_block, "LEVEL_BLOCK_COUNT_INVALID"),
        (_open_boundary, "LEVEL_BOUNDARY_INVALID"),
    ],
)
def test_validation_failure_codes(build_path, expected_code, tmp_path):
    path = build_path(tmp_path)
    with pytest.raises(LevelValidationError) as exc:
        load_levels(path)
    assert exc.value.code == expected_code
