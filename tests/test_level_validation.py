"""Tests for level loading and validation service."""

import copy
import json
from pathlib import Path

import pytest

from backend.app.services import level_service
from backend.app.services.level_service import (
    get_level,
    list_level_meta,
    load_contract,
    load_levels,
)
from backend.app.schemas import LevelDefinition, LevelValidationError

LEVELS_PATH = Path("backend/app/data/levels.json")
CANDIDATE_LEVELS_PATH = Path("docs/intake/candidate_levels_6_20.json")
REBUILT_LEVELS_PATH = Path("docs/intake/block_builder_levels_20_30_rebuilt.json")
HARDMODE_LEVELS_PATH = Path("docs/intake/block_builder_levels_31_40_hardmode.json")
REVERSE_LEVELS_PATH = Path("docs/intake/block_builder_levels_41_50_reverse_designed.json")
RESOURCE_REQUIREMENTS_PATH = Path("tests/fixtures/level_resource_requirements.json")
CONTRACT_PATH = Path("shared/app_contract.json")


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
    assert [lv.id for lv in levels] == list(range(1, 51))
    assert all(isinstance(lv, LevelDefinition) for lv in levels)


def test_level_20_matches_expansion_contract():
    levels = load_levels(LEVELS_PATH)
    lv = get_level(levels, 20)
    assert lv.title == "Final Scaffold Yard"
    assert lv.width == 34
    assert lv.height == 17


def test_level_30_matches_expansion_contract():
    levels = load_levels(LEVELS_PATH)
    lv = get_level(levels, 30)
    assert lv.title == "Two Quarries, One Crossing"
    assert lv.width == 26
    assert lv.height == 14


def test_level_40_matches_playtest_import_contract():
    levels = load_levels(LEVELS_PATH)
    lv = get_level(levels, 40)
    assert lv.title == "Grand Commitment Yard"
    assert lv.width == 38
    assert lv.height == 22


def test_level_50_matches_playtest_import_contract():
    levels = load_levels(LEVELS_PATH)
    lv = get_level(levels, 50)
    assert lv.title == "Cathedral Scaffold"
    assert lv.width == 50
    assert lv.height == 23


def test_candidate_source_validates_ids_6_through_20():
    raw = json.loads(CANDIDATE_LEVELS_PATH.read_text())
    contract = load_contract(CONTRACT_PATH)

    levels = level_service.validate_candidate_levels(raw, contract)

    assert [lv.id for lv in levels] == list(range(6, 21))


def test_rebuilt_candidate_source_validates_ids_20_through_30():
    raw = json.loads(REBUILT_LEVELS_PATH.read_text())
    contract = load_contract(CONTRACT_PATH)

    levels = level_service.validate_candidate_levels(raw, contract, list(range(20, 31)))

    assert [lv.id for lv in levels] == list(range(20, 31))


def test_hardmode_candidate_source_validates_ids_31_through_40():
    raw = json.loads(HARDMODE_LEVELS_PATH.read_text())
    contract = load_contract(CONTRACT_PATH)

    levels = level_service.validate_candidate_levels(raw, contract, list(range(31, 41)))

    assert [lv.id for lv in levels] == list(range(31, 41))


def test_reverse_candidate_source_validates_ids_41_through_50():
    raw = json.loads(REVERSE_LEVELS_PATH.read_text())
    contract = load_contract(CONTRACT_PATH)

    levels = level_service.validate_candidate_levels(raw, contract, list(range(41, 51)))

    assert [lv.id for lv in levels] == list(range(41, 51))


def test_resource_analysis_reports_levels_6_through_30():
    levels = load_levels(LEVELS_PATH)
    manifest = json.loads(RESOURCE_REQUIREMENTS_PATH.read_text())

    reports = level_service.analyze_level_resources(levels, manifest)

    assert [report["levelId"] for report in reports] == list(range(6, 31))
    assert all(report["surplusBlocks"] >= 0 for report in reports)

    level_13 = next(report for report in reports if report["levelId"] == 13)
    assert level_13["availableBlocks"] == 15
    assert level_13["requiredBlocks"] == 12
    assert level_13["surplusBlocks"] == 3

    level_21 = next(report for report in reports if report["levelId"] == 21)
    assert level_21["availableBlocks"] == 3
    assert level_21["requiredBlocks"] == 3
    assert level_21["surplusBlocks"] == 0

    level_30 = next(report for report in reports if report["levelId"] == 30)
    assert level_30["availableBlocks"] == 6
    assert level_30["requiredBlocks"] == 4
    assert level_30["surplusBlocks"] == 2


def test_resource_analysis_rejects_deficit():
    levels = load_levels(LEVELS_PATH)
    manifest = json.loads(RESOURCE_REQUIREMENTS_PATH.read_text())
    manifest["levels"][0]["segments"] = [
        {"name": "too-tall", "fromRow": 7, "toRow": 0}
    ]

    with pytest.raises(LevelValidationError) as exc:
        level_service.analyze_level_resources(levels, manifest)

    assert exc.value.code == "LEVEL_RESOURCE_DEFICIT"
    assert exc.value.details["levelId"] == 6


def test_resource_analysis_rejects_bad_manifest_id_coverage():
    levels = load_levels(LEVELS_PATH)
    manifest = json.loads(RESOURCE_REQUIREMENTS_PATH.read_text())
    manifest["levels"] = manifest["levels"][:-1]

    with pytest.raises(LevelValidationError) as exc:
        level_service.analyze_level_resources(levels, manifest)

    assert exc.value.code == "LEVEL_RESOURCE_MANIFEST_INVALID"


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


def _duplicate_title(tmp_path: Path) -> Path:
    def mutate(d):
        d["levels"][1]["title"] = d["levels"][0]["title"]
    return _mutated(tmp_path, mutate)


def _empty_title(tmp_path: Path) -> Path:
    return _mutated(tmp_path, lambda d: d["levels"][0].update({"title": ""}))


def _wrong_difficulty(tmp_path: Path) -> Path:
    return _mutated(tmp_path, lambda d: d["levels"][0].update({"difficulty": 99}))


def _unsupported_block(tmp_path: Path) -> Path:
    def mutate(d):
        row = list(d["levels"][0]["grid"][2])
        row[1] = "B"
        d["levels"][0]["grid"][2] = "".join(row)
    return _mutated(tmp_path, mutate)


def _unsupported_player(tmp_path: Path) -> Path:
    def mutate(d):
        for i, row in enumerate(d["levels"][0]["grid"]):
            d["levels"][0]["grid"][i] = row.replace("P", ".")
        row = list(d["levels"][0]["grid"][2])
        row[1] = "P"
        d["levels"][0]["grid"][2] = "".join(row)
    return _mutated(tmp_path, mutate)


@pytest.mark.parametrize(
    "build_path,expected_code",
    [
        (_missing_file, "LEVELS_FILE_NOT_FOUND"),
        (_invalid_json, "LEVELS_JSON_INVALID"),
        (_invalid_root, "LEVELS_ROOT_INVALID"),
        (_duplicate_id, "LEVEL_ID_SEQUENCE_INVALID"),
        (_bad_slug, "LEVEL_SLUG_INVALID"),
        (_bad_dimensions, "LEVEL_GRID_DIMENSIONS_INVALID"),
        (_empty_grid, "LEVEL_GRID_DIMENSIONS_INVALID"),
        (_ragged_grid, "LEVEL_GRID_DIMENSIONS_INVALID"),
        (_invalid_tile, "LEVEL_GRID_SYMBOL_INVALID"),
        (_missing_player, "LEVEL_ENTITY_COUNT_INVALID"),
        (_missing_goal, "LEVEL_ENTITY_COUNT_INVALID"),
        (_missing_block, "LEVEL_ENTITY_COUNT_INVALID"),
        (_open_boundary, "LEVEL_GRID_BOUNDARY_INVALID"),
        (_duplicate_title, "LEVEL_TITLE_INVALID"),
        (_empty_title, "LEVEL_TITLE_INVALID"),
        (_wrong_difficulty, "LEVEL_DIFFICULTY_INVALID"),
        (_unsupported_block, "LEVEL_INITIAL_STATE_UNSTABLE"),
        (_unsupported_player, "LEVEL_INITIAL_STATE_UNSTABLE"),
    ],
)
def test_validation_failure_codes(build_path, expected_code, tmp_path):
    path = build_path(tmp_path)
    with pytest.raises(LevelValidationError) as exc:
        load_levels(path)
    assert exc.value.code == expected_code
