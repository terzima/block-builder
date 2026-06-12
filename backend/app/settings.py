"""Application settings parsed from environment variables."""

from __future__ import annotations

import os
from collections.abc import Mapping
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class Settings:
    app_env: str = "local"
    host: str = "127.0.0.1"
    port: int = 8000
    repo_root: Path = field(default_factory=lambda: Path(__file__).resolve().parents[2])
    shared_contract_path: Path = field(default_factory=Path)
    levels_path: Path = field(default_factory=Path)
    progress_path: Path = field(default_factory=Path)
    cors_allowed_origins: tuple[str, ...] = ()
    trusted_hosts: tuple[str, ...] = ("127.0.0.1", "localhost", "10.0.0.117")
    enable_progress_api: bool = False


def get_settings(env: Mapping[str, str] | None = None) -> Settings:
    """Build and return a Settings instance from environment variables.

    Args:
        env: Mapping to read from. Defaults to ``os.environ``.
    """
    if env is None:
        env = os.environ

    repo_root = Path(env.get("REPO_ROOT", "")) or Path(__file__).resolve().parents[2]

    def _resolve(key: str, default_rel: str) -> Path:
        raw = env.get(key, "")
        if raw:
            p = Path(raw)
            return p if p.is_absolute() else repo_root / p
        return repo_root / default_rel

    shared_contract_path = _resolve("SHARED_CONTRACT_PATH", "shared/app_contract.json")
    levels_path = _resolve("LEVELS_PATH", "backend/app/data/levels.json")
    progress_path = _resolve("PROGRESS_PATH", "backend/app/data/progress.json")

    def _parse_list(key: str) -> tuple[str, ...]:
        raw = env.get(key, "")
        return tuple(item.strip() for item in raw.split(",") if item.strip())

    cors_allowed_origins = _parse_list("CORS_ALLOWED_ORIGINS")
    trusted_hosts_raw = env.get("TRUSTED_HOSTS", "")
    trusted_hosts: tuple[str, ...]
    if trusted_hosts_raw:
        trusted_hosts = tuple(item.strip() for item in trusted_hosts_raw.split(",") if item.strip())
    else:
        trusted_hosts = ("127.0.0.1", "localhost", "10.0.0.117")

    _truthy = {"1", "true", "yes"}
    enable_progress_api = env.get("ENABLE_PROGRESS_API", "").lower() in _truthy

    try:
        port = int(env.get("PORT", "8000"))
    except ValueError:
        port = 8000

    return Settings(
        app_env=env.get("APP_ENV", "local"),
        host=env.get("HOST", "127.0.0.1"),
        port=port,
        repo_root=repo_root,
        shared_contract_path=shared_contract_path,
        levels_path=levels_path,
        progress_path=progress_path,
        cors_allowed_origins=cors_allowed_origins,
        trusted_hosts=trusted_hosts,
        enable_progress_api=enable_progress_api,
    )
