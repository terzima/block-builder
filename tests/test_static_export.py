"""Tests for the static Vercel export artifact."""

import json
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EXPORT_SCRIPT = ROOT / "tools" / "export_static_site.py"
SUPPORTED_LOCKFILES = [
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "bun.lockb",
]
FRAMEWORK_CONFIGS = [
    "next.config.js",
    "vite.config.js",
    "nuxt.config.js",
    "svelte.config.js",
]


def run_export(output: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, str(EXPORT_SCRIPT), "--output", str(output)],
        cwd=ROOT,
        text=True,
        capture_output=True,
        check=False,
    )


def test_static_export_generates_safe_dist(tmp_path):
    output = tmp_path / "dist"

    result = run_export(output)

    assert result.returncode == 0, result.stderr
    assert "Exported 50 levels" in result.stdout

    levels_index = json.loads((output / "static-data" / "levels.json").read_text())
    levels = levels_index["levels"]
    assert [level["id"] for level in levels] == list(range(1, 51))
    assert all("grid" not in level for level in levels)

    for level_id in range(1, 51):
        level_path = output / "static-data" / "levels" / f"{level_id}.json"
        assert level_path.exists(), f"missing level {level_id}"
        assert json.loads(level_path.read_text())["id"] == level_id

    config = json.loads((output / "static-data" / "config.json").read_text())
    assert config["contract"]["version"] == "0.1.0"

    index_html = (output / "index.html").read_text()
    assert "BLOCK_BUILDER_RUNTIME_CONFIG" in index_html
    assert 'dataSource: "static"' in index_html
    assert 'dataBasePath: "/static-data"' in index_html
    assert "enableTraceRecorder: false" in index_html
    assert "enableUndo: false" in index_html
    for forbidden in (
        "trace-record-button",
        "Copy Trace",
        "Download Trace",
        'data-action="undo"',
        "KeyZ",
    ):
        assert forbidden not in index_html

    assert not (output / "js" / "trace-recorder.js").exists()
    assert not (output / "js" / "trace-dev.js").exists()


def test_static_release_package_metadata_is_vercel_ready():
    package_json = json.loads((ROOT / "package.json").read_text())
    assert package_json["scripts"]["build"] == "python3 tools/export_static_site.py"
    assert "dependencies" not in package_json
    assert "devDependencies" not in package_json

    existing_lockfiles = [
        lockfile for lockfile in SUPPORTED_LOCKFILES if (ROOT / lockfile).exists()
    ]
    assert existing_lockfiles == ["package-lock.json"]

    lock = json.loads((ROOT / "package-lock.json").read_text())
    assert lock["name"] == "block-builder"
    assert lock["version"] == "0.1.0"
    assert lock["lockfileVersion"] == 3
    assert set(lock["packages"]) == {""}

    for config_name in FRAMEWORK_CONFIGS:
        assert not (ROOT / config_name).exists()
