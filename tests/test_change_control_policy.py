"""Regression tests for agent change-control policy checks."""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CHECK_SCRIPT = ROOT / "scripts" / "agent" / "check_change_control.sh"


def run(cmd: list[str], cwd: Path, **kwargs) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        cmd,
        cwd=cwd,
        text=True,
        capture_output=True,
        check=False,
        **kwargs,
    )


def make_policy_repo(tmp_path: Path) -> Path:
    repo = tmp_path / "repo"
    repo.mkdir()
    (repo / "scripts" / "agent").mkdir(parents=True)
    shutil.copy2(CHECK_SCRIPT, repo / "scripts" / "agent" / "check_change_control.sh")
    (repo / "README.md").write_text("# policy test\n", encoding="utf-8")

    assert run(["git", "init"], repo).returncode == 0
    assert run(["git", "config", "user.email", "test@example.com"], repo).returncode == 0
    assert run(["git", "config", "user.name", "Policy Test"], repo).returncode == 0
    assert run(["git", "add", "."], repo).returncode == 0
    assert run(["git", "commit", "-m", "base"], repo).returncode == 0
    head = run(["git", "rev-parse", "HEAD"], repo)
    assert head.returncode == 0
    assert run(
        ["git", "update-ref", "refs/remotes/origin/main", head.stdout.strip()],
        repo,
    ).returncode == 0
    return repo


def test_change_control_allows_env_example(tmp_path: Path):
    repo = make_policy_repo(tmp_path)
    (repo / ".env.example").write_text("APP_ENV=development\n", encoding="utf-8")
    assert run(["git", "add", ".env.example"], repo).returncode == 0
    assert run(["git", "commit", "-m", "add env example"], repo).returncode == 0

    result = run(
        ["bash", "scripts/agent/check_change_control.sh"],
        repo,
        env={"BASE_REF": "main"},
    )

    assert result.returncode == 0, result.stderr
    assert "Change-control checks passed." in result.stdout


def test_change_control_rejects_real_env_file(tmp_path: Path):
    repo = make_policy_repo(tmp_path)
    (repo / ".env.local").write_text("SECRET_TOKEN=value\n", encoding="utf-8")
    assert run(["git", "add", ".env.local"], repo).returncode == 0
    assert run(["git", "commit", "-m", "add local env"], repo).returncode == 0

    result = run(
        ["bash", "scripts/agent/check_change_control.sh"],
        repo,
        env={"BASE_REF": "main"},
    )

    assert result.returncode == 1
    assert "Policy failure: likely secret file included." in result.stderr
