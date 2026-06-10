# Communication Contract

Status: Scaffold
Source: `shared/app_contract.json`

`shared/app_contract.json` is the machine-readable contract shared by future Python backend code and vanilla JavaScript frontend code.

## Current Scope

This scaffold declares stable names, paths, and ownership boundaries only. It does not implement backend routes, gameplay state transitions, level validation, or progress persistence.

## Sections

| Section | Purpose |
|---|---|
| `version` | Contract version for future compatibility checks. |
| `appName` | Human-readable application name. |
| `api` | Same-origin API prefix and route patterns future backend/frontend code must share. |
| `static` | Static frontend entry paths future backend serving code can reference. |
| `tiles` | Canonical symbols for future level data and engine tests. |
| `actions` | Canonical action names for future input and engine code. |
| `keyboard` | Default keyboard bindings for future input handling. |
| `storageKeys` | Browser storage keys reserved for local progress and settings. |
| `gameplay` | Deferred gameplay ownership metadata. |
| `ui` | Deferred UI ownership metadata and root element id. |

## Python Usage

Future backend code should load this JSON file from `SHARED_CONTRACT_PATH` and derive public config responses or route metadata from it. This scaffold does not add that loader yet.

## JavaScript Usage

Future frontend code should derive route construction, action names, keyboard bindings, and storage keys from this contract. This scaffold does not add JavaScript loaders yet.

## Change Rule

Any future change to route names, tile symbols, action names, storage keys, gameplay constants, or UI constants is a cross-boundary contract change and should be backed by an accepted spec or Change Request.
