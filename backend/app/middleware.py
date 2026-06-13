"""Middleware registration for the Block Builder FastAPI app."""

from __future__ import annotations

import logging
import time

from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware

from backend.app.settings import Settings

logger = logging.getLogger(__name__)


def configure_middleware(app: FastAPI, settings: Settings) -> None:
    """Register CORS and trusted-host middleware based on settings."""
    if settings.cors_allowed_origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=list(settings.cors_allowed_origins),
            allow_methods=["*"],
            allow_headers=["*"],
        )
    if settings.trusted_hosts:
        app.add_middleware(
            TrustedHostMiddleware,
            allowed_hosts=list(settings.trusted_hosts),
        )


def install_request_logging(app: FastAPI) -> None:
    """Add middleware that logs one line per request."""

    @app.middleware("http")
    async def _log_request(request: Request, call_next):
        start = time.monotonic()
        response = await call_next(request)
        elapsed_ms = (time.monotonic() - start) * 1000
        logger.info(
            "%s %s %s %.1fms",
            request.method,
            request.url.path,
            response.status_code,
            elapsed_ms,
        )
        return response
