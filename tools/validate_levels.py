#!/usr/bin/env python3
"""CLI validator for levels.json.

Usage:
    python tools/validate_levels.py [path]

Defaults to backend/app/data/levels.json when no path is given.
Exits 0 on success, 1 on failure.
"""

import sys
from pathlib import Path

# Ensure repo root is on the path when invoked directly.
_repo_root = Path(__file__).resolve().parents[1]
if str(_repo_root) not in sys.path:
    sys.path.insert(0, str(_repo_root))

from backend.app.services.level_service import load_levels  # noqa: E402
from backend.app.schemas import LevelValidationError  # noqa: E402

_DEFAULT_PATH = Path("backend/app/data/levels.json")


def main() -> int:
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else _DEFAULT_PATH
    try:
        levels = load_levels(path)
        print(f"Validated {len(levels)} levels from {path}")
        return 0
    except LevelValidationError as exc:
        print(f"{exc.code}: {exc.message}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
