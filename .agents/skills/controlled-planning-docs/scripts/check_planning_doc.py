#!/usr/bin/env python3
"""Lightweight planning-doc lint for specs, plans, and batches."""

from __future__ import annotations

import re
import sys
from pathlib import Path

PLACEHOLDERS = re.compile(r"\b(TBD|TODO|FIXME|fill in|implement later)\b|<[^>\n]+>")
TEMPLATE_NOTES = re.compile(r"Template note:|delete guidance text", re.IGNORECASE)
TRAILING_WS = re.compile(r"[ \t]+$", re.MULTILINE)
POLICY_DUPES = [
    "Do not pipe remote content into a shell",
    "Do not use sudo",
    "Approval request format",
    "Human Approval Value Policy",
    "Auto-allowed actions",
    "Hard-denied actions",
]


def required_sections(path: Path) -> list[str]:
    text = path.as_posix()
    if "/docs/specs/" in text:
        return ["## Context", "## Problem", "## Behavioral contract", "## Interface and data contract", "## Acceptance gates", "## Stop conditions"]
    if "/docs/plans/batches/" in text:
        return ["## Purpose", "## Included work", "## Execution contract", "## Required checks", "## Stop conditions", "## Final report"]
    if "/docs/plans/" in text:
        return ["**Goal:**", "## File structure", "## Contracts to implement", "## Tasks", "## Validation", "## Stop conditions"]
    return []


def check(path: Path) -> list[str]:
    body = path.read_text(encoding="utf-8")
    errors: list[str] = []
    for section in required_sections(path):
        if section not in body:
            errors.append(f"missing required section: {section}")
    if PLACEHOLDERS.search(body):
        errors.append("contains placeholder text")
    if TEMPLATE_NOTES.search(body):
        errors.append("contains template guidance")
    for phrase in POLICY_DUPES:
        if phrase in body:
            errors.append(f"appears to duplicate AGENTS.md policy: {phrase}")
    if TRAILING_WS.search(body):
        errors.append("has trailing whitespace")
    return errors


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("usage: check_planning_doc.py <doc> [<doc> ...]", file=sys.stderr)
        return 2
    failed = False
    for raw in argv[1:]:
        path = Path(raw)
        errors = check(path)
        if errors:
            failed = True
            print(f"{path}: FAIL", file=sys.stderr)
            for error in errors:
                print(f"  - {error}", file=sys.stderr)
        else:
            print(f"{path}: ok")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
