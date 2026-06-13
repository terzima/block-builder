"""Block Builder FastAPI application."""

from __future__ import annotations

import logging
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse

from backend.app.middleware import configure_middleware, install_request_logging
from backend.app.schemas import (
    ApiError,
    ApiErrorDetail,
    ConfigResponse,
    HealthResponse,
    LevelDefinition,
    LevelListResponse,
    LevelValidationError,
)
from backend.app.services.level_service import (
    get_level,
    list_level_meta,
    load_contract,
    load_levels,
)
from backend.app.settings import get_settings

logger = logging.getLogger(__name__)

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.contract = load_contract(settings.shared_contract_path)
    app.state.levels = load_levels(settings.levels_path)
    yield


app = FastAPI(title="Block Builder", version="0.1.0", lifespan=lifespan)

configure_middleware(app, settings)
install_request_logging(app)


# ---------------------------------------------------------------------------
# Exception handlers
# ---------------------------------------------------------------------------


@app.exception_handler(LevelValidationError)
async def level_validation_error_handler(
    request: Request, exc: LevelValidationError
) -> JSONResponse:
    if exc.code == "LEVEL_NOT_FOUND":
        status_code = 404
    else:
        status_code = 500
    return JSONResponse(
        status_code=status_code,
        content=ApiError(
            error=ApiErrorDetail(
                code=exc.code,
                message=exc.message,
                details=exc.details,
            )
        ).model_dump(),
    )


# ---------------------------------------------------------------------------
# API routes
# ---------------------------------------------------------------------------


@app.get("/api/v1/health", response_model=HealthResponse)
async def health(request: Request) -> HealthResponse:
    contract: dict[str, Any] = request.app.state.contract
    return HealthResponse(
        status="ok",
        appName=contract["appName"],
        version=contract["version"],
    )


@app.get("/api/v1/config", response_model=ConfigResponse)
async def config(request: Request) -> ConfigResponse:
    return ConfigResponse(contract=request.app.state.contract)


@app.get("/api/v1/levels", response_model=LevelListResponse)
async def levels_list(request: Request) -> LevelListResponse:
    return LevelListResponse(levels=list_level_meta(request.app.state.levels))


@app.get("/api/v1/levels/{level_id}", response_model=LevelDefinition)
async def level_detail(level_id: int, request: Request) -> LevelDefinition:
    return get_level(request.app.state.levels, level_id)


# ---------------------------------------------------------------------------
# Static routes
# ---------------------------------------------------------------------------


@app.get("/shared/app_contract.json")
async def shared_contract() -> FileResponse:
    return FileResponse(
        path=str(settings.shared_contract_path),
        media_type="application/json",
    )


@app.get("/")
async def frontend_root() -> FileResponse:
    index = settings.repo_root / "frontend" / "index.html"
    return FileResponse(path=str(index), media_type="text/html")


@app.get("/{path:path}")
async def frontend_static(path: str) -> FileResponse:
    """Serve any file from the frontend/ directory.

    Falls back to index.html for unknown paths so SPA routing works.
    The /api/v1/* and /shared/* routes defined above take precedence.
    """
    target = settings.repo_root / "frontend" / path
    if target.exists() and target.is_file():
        return FileResponse(path=str(target))
    # Unknown path — serve index.html so the JS app can handle it
    return FileResponse(
        path=str(settings.repo_root / "frontend" / "index.html"),
        media_type="text/html",
    )
