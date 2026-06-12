#!/usr/bin/env python3
"""CLI validator for levels.json.

Usage:
    python tools/validate_levels.py [path]
    python tools/validate_levels.py [path] --candidate-source docs/intake/candidate_levels_6_20.json
    python tools/validate_levels.py [path] --candidate-source docs/intake/block_builder_levels_20_30_rebuilt.json
    python tools/validate_levels.py [path] --candidate-source docs/intake/block_builder_levels_31_40_hardmode.json
    python tools/validate_levels.py [path] --candidate-source docs/intake/block_builder_levels_41_50_reverse_designed.json
    python tools/validate_levels.py [path] --resource-source tests/fixtures/level_resource_requirements.json

Defaults to backend/app/data/levels.json when no path is given.
Exits 0 on success, 1 on failure.
"""

import argparse
import json
import sys
from pathlib import Path

# Ensure repo root is on the path when invoked directly.
_repo_root = Path(__file__).resolve().parents[1]
if str(_repo_root) not in sys.path:
    sys.path.insert(0, str(_repo_root))

from backend.app.services.level_service import (  # noqa: E402
    analyze_level_resources,
    load_contract,
    load_levels,
    validate_candidate_levels,
)
from backend.app.settings import get_settings  # noqa: E402
from backend.app.schemas import LevelValidationError  # noqa: E402

_DEFAULT_PATH = Path("backend/app/data/levels.json")


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate Block Builder level data.")
    parser.add_argument(
        "path",
        nargs="?",
        default=_DEFAULT_PATH,
        type=Path,
        help="canonical levels file to validate",
    )
    parser.add_argument(
        "--candidate-source",
        type=Path,
        help=(
            "candidate level source to validate as levels 6-20, 20-30, "
            "31-40, or 41-50"
        ),
    )
    parser.add_argument(
        "--resource-source",
        type=Path,
        help="resource requirement source to validate against canonical levels",
    )
    return parser.parse_args()


def _load_candidate_source(path: Path):
    if not path.exists():
        raise LevelValidationError(
            "LEVELS_FILE_NOT_FOUND",
            "Candidate levels file not found.",
            {"path": str(path)},
        )
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        raise LevelValidationError(
            "LEVELS_JSON_INVALID",
            "Candidate levels JSON is invalid.",
            {"path": str(path)},
        )


def _load_resource_source(path: Path):
    if not path.exists():
        raise LevelValidationError(
            "LEVELS_FILE_NOT_FOUND",
            "Resource requirements file not found.",
            {"path": str(path)},
        )
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        raise LevelValidationError(
            "LEVELS_JSON_INVALID",
            "Resource requirements JSON is invalid.",
            {"path": str(path)},
        )


def _candidate_expected_ids(raw_candidates) -> list[int]:
    if not isinstance(raw_candidates, list):
        raise LevelValidationError(
            "LEVELS_ROOT_INVALID",
            "Candidate levels must be a JSON array.",
        )
    try:
        ids = [candidate["id"] for candidate in raw_candidates]
    except (TypeError, KeyError):
        raise LevelValidationError(
            "LEVEL_ID_SEQUENCE_INVALID",
            "Every candidate level must include id.",
        )
    if ids == list(range(6, 21)):
        return ids
    if ids == list(range(20, 31)):
        return ids
    if ids == list(range(31, 41)):
        return ids
    if ids == list(range(41, 51)):
        return ids
    raise LevelValidationError(
        "LEVEL_ID_SEQUENCE_INVALID",
        (
            "Candidate level IDs must be exactly 6-20, 20-30, 31-40, "
            "or 41-50 in order."
        ),
        {"got": ids},
    )


def main() -> int:
    args = _parse_args()
    try:
        levels = load_levels(args.path)
        print(f"Validated {len(levels)} levels from {args.path}")
        if args.candidate_source:
            settings = get_settings()
            contract = load_contract(settings.shared_contract_path)
            raw_candidates = _load_candidate_source(args.candidate_source)
            candidates = validate_candidate_levels(
                raw_candidates,
                contract,
                expected_ids=_candidate_expected_ids(raw_candidates),
            )
            print(
                f"Validated {len(candidates)} candidate levels from "
                f"{args.candidate_source}"
            )
        if args.resource_source:
            resource_manifest = _load_resource_source(args.resource_source)
            reports = analyze_level_resources(levels, resource_manifest)
            print(
                f"Validated resources for {len(reports)} levels from "
                f"{args.resource_source}"
            )
        return 0
    except LevelValidationError as exc:
        print(f"{exc.code}: {exc.message}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
