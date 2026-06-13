"""Pydantic response models and error types for the Block Builder API."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field


class ApiErrorDetail(BaseModel):
    code: str
    message: str
    details: dict[str, Any] = Field(default_factory=dict)


class ApiError(BaseModel):
    error: ApiErrorDetail


class HealthResponse(BaseModel):
    status: Literal["ok"]
    appName: str
    version: str


class ConfigResponse(BaseModel):
    contract: dict[str, Any]


class LevelMeta(BaseModel):
    id: int
    slug: str
    title: str
    width: int
    height: int
    difficulty: int


class LevelDefinition(LevelMeta):
    grid: list[str]


class LevelListResponse(BaseModel):
    levels: list[LevelMeta]


class LevelValidationError(Exception):
    """Raised when level data fails a validation rule."""

    def __init__(
        self,
        code: str,
        message: str,
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(message)
        self.code = code
        self.message = message
        self.details: dict[str, Any] = details or {}
