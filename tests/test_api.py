"""Tests for FastAPI route handlers."""

import pytest
from fastapi.testclient import TestClient

from backend.app.main import app


@pytest.fixture(scope="module")
def client():
    with TestClient(app, base_url="http://localhost") as c:
        yield c


def test_health_response(client):
    r = client.get("/api/v1/health")
    assert r.status_code == 200
    body = r.json()
    assert body["status"] == "ok"
    assert body["appName"] == "Block Builder"
    assert body["version"] == "0.1.0"


def test_config_response_is_public_contract(client):
    r = client.get("/api/v1/config")
    assert r.status_code == 200
    body = r.json()
    contract = body["contract"]
    for key in ("version", "appName", "api", "tiles", "actions", "keyboard", "storageKeys", "gameplay", "ui"):
        assert key in contract, f"missing key: {key}"
    for private_key in ("HOST", "PORT", "LEVELS_PATH"):
        assert private_key not in body


def test_levels_list_omits_grids(client):
    r = client.get("/api/v1/levels")
    assert r.status_code == 200
    levels = r.json()["levels"]
    assert len(levels) == 20
    assert [lv["id"] for lv in levels] == list(range(1, 21))
    for lv in levels:
        assert "grid" not in lv


def test_level_detail_returns_grid(client):
    r = client.get("/api/v1/levels/1")
    assert r.status_code == 200
    body = r.json()
    assert body["title"] == "First Steps"
    assert body["width"] == 8
    assert body["height"] == 6
    assert len(body["grid"]) == 6


def test_level_20_detail_returns_variable_grid(client):
    r = client.get("/api/v1/levels/20")
    assert r.status_code == 200
    body = r.json()
    assert body["title"] == "Final Scaffold Yard"
    assert body["width"] == 34
    assert body["height"] == 17
    assert len(body["grid"]) == 17
    assert all(len(row) == 34 for row in body["grid"])


def test_unknown_level_uses_error_envelope(client):
    r = client.get("/api/v1/levels/99")
    assert r.status_code == 404
    assert r.json() == {
        "error": {
            "code": "LEVEL_NOT_FOUND",
            "message": "Level not found.",
            "details": {"levelId": 99},
        }
    }


def test_shared_contract_file_route(client):
    r = client.get("/shared/app_contract.json")
    assert r.status_code == 200
    assert r.json()["appName"] == "Block Builder"


def test_frontend_root_serves_html(client):
    r = client.get("/")
    assert r.status_code == 200
    assert "text/html" in r.headers["content-type"]
    assert "<main" in r.text
