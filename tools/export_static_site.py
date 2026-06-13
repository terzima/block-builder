#!/usr/bin/env python3
"""Export Block Builder as a static site for Vercel-style hosting."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
import tempfile
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
FRONTEND_DIR = ROOT / "frontend"
LEVELS_PATH = ROOT / "backend" / "app" / "data" / "levels.json"
CONTRACT_PATH = ROOT / "shared" / "app_contract.json"
EXPECTED_LEVEL_IDS = list(range(1, 51))
STATIC_DATA_DIR = "static-data"
TRACE_FILES = {"trace-recorder.js", "trace-dev.js"}
REMOVE_BLOCK_PATTERN = re.compile(
    r"\s*<!-- BLOCK_BUILDER_DEPLOYED_REMOVE_START: (?P<name>[\w-]+) -->.*?"
    r"<!-- BLOCK_BUILDER_DEPLOYED_REMOVE_END: (?P=name) -->",
    re.DOTALL,
)
RUNTIME_CONFIG = """    <script>
      window.BLOCK_BUILDER_RUNTIME_CONFIG = {
        mode: "deployed",
        dataSource: "static",
        dataBasePath: "/static-data",
        enableTraceRecorder: false,
        enableUndo: false
      };
    </script>
"""
FORBIDDEN_INDEX_STRINGS = (
    "trace-record-button",
    "Copy Trace",
    "Download Trace",
    'data-action="undo"',
    "KeyZ",
)


class StaticExportError(Exception):
    """Raised when the static export cannot be generated safely."""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Export Block Builder static site.")
    parser.add_argument(
        "--output",
        default="dist",
        type=Path,
        help="output directory; defaults to dist",
    )
    return parser.parse_args()


def ensure_output_path(output: Path) -> Path:
    resolved = output.resolve()
    allowed_roots = [
        ROOT.resolve(),
        Path(tempfile.gettempdir()).resolve(),
        Path("/tmp").resolve(),
        Path("/private/tmp").resolve(),
        Path("/private/var").resolve(),
    ]
    if not any(_is_relative_to(resolved, root) for root in allowed_roots):
        raise StaticExportError(
            f"output must be inside the repository or a temporary directory: {output}"
        )
    if resolved == ROOT.resolve():
        raise StaticExportError("output directory cannot be the repository root")
    return resolved


def _is_relative_to(path: Path, root: Path) -> bool:
    try:
        path.relative_to(root)
        return True
    except ValueError:
        return False


def load_json(path: Path) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise StaticExportError(f"missing required file: {path}") from exc
    except json.JSONDecodeError as exc:
        raise StaticExportError(f"invalid JSON in {path}: {exc}") from exc


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def prepare_output(output: Path) -> None:
    if output.exists():
        shutil.rmtree(output)
    output.mkdir(parents=True)


def copy_frontend(output: Path) -> None:
    for source in FRONTEND_DIR.iterdir():
        target = output / source.name
        if source.is_dir():
            shutil.copytree(source, target, ignore=_ignore_trace_files)
        else:
            shutil.copy2(source, target)


def _ignore_trace_files(_directory: str, names: list[str]) -> set[str]:
    return {name for name in names if name in TRACE_FILES}


def transform_index(output: Path) -> None:
    index_path = output / "index.html"
    html = index_path.read_text(encoding="utf-8")
    html = REMOVE_BLOCK_PATTERN.sub("", html)
    module_script = '    <script type="module" src="./js/app.js"></script>'
    if module_script not in html:
        raise StaticExportError("index.html missing app module script")
    html = html.replace(module_script, f"{RUNTIME_CONFIG}{module_script}")
    index_path.write_text(html, encoding="utf-8")


def export_shared_contract(output: Path, contract: dict[str, Any]) -> None:
    write_json(output / "shared" / "app_contract.json", contract)


def export_static_data(output: Path, contract: dict[str, Any], levels: dict[str, Any]) -> None:
    raw_levels = levels.get("levels")
    if not isinstance(raw_levels, list):
        raise StaticExportError("levels JSON must contain a levels array")

    ids = [level.get("id") for level in raw_levels if isinstance(level, dict)]
    if ids != EXPECTED_LEVEL_IDS:
        raise StaticExportError(
            f"canonical level IDs must be exactly {EXPECTED_LEVEL_IDS}; got {ids}"
        )

    static_root = output / STATIC_DATA_DIR
    write_json(static_root / "config.json", {"contract": contract})
    write_json(
        static_root / "levels.json",
        {"levels": [_level_metadata(level) for level in raw_levels]},
    )
    for level in raw_levels:
        write_json(static_root / "levels" / f"{level['id']}.json", level)


def _level_metadata(level: dict[str, Any]) -> dict[str, Any]:
    return {key: value for key, value in level.items() if key != "grid"}


def verify_output(output: Path) -> None:
    for json_path in (
        output / STATIC_DATA_DIR / "config.json",
        output / STATIC_DATA_DIR / "levels.json",
    ):
        load_json(json_path)
    for level_id in EXPECTED_LEVEL_IDS:
        load_json(output / STATIC_DATA_DIR / "levels" / f"{level_id}.json")

    index_html = (output / "index.html").read_text(encoding="utf-8")
    forbidden = [value for value in FORBIDDEN_INDEX_STRINGS if value in index_html]
    if forbidden:
        raise StaticExportError(f"shipped index contains forbidden strings: {forbidden}")

    for trace_file in TRACE_FILES:
        if (output / "js" / trace_file).exists():
            raise StaticExportError(f"shipped artifact contains dev-only {trace_file}")


def export(output: Path) -> None:
    output = ensure_output_path(output)
    contract = load_json(CONTRACT_PATH)
    levels = load_json(LEVELS_PATH)
    prepare_output(output)
    copy_frontend(output)
    transform_index(output)
    export_shared_contract(output, contract)
    export_static_data(output, contract, levels)
    verify_output(output)


def main() -> int:
    args = parse_args()
    try:
        output = ensure_output_path(args.output)
        export(output)
    except StaticExportError as exc:
        print(f"Static export failed: {exc}", file=sys.stderr)
        return 1
    print(f"Exported static site to {args.output}")
    print("Exported 50 levels")
    return 0


if __name__ == "__main__":
    sys.exit(main())
