# Raycast ClickUp Quick-Capture Extension

## Overview

A Raycast extension that lets you type a task title directly into the Raycast search bar and save it to a ClickUp list — no form, no new window, no extra steps.

## User Flow

1. Invoke the command in Raycast
2. Type the task title inline in the search bar argument field
3. Press Enter
4. Brief HUD overlay confirms success or reports failure
5. Raycast closes

## Architecture

Single Raycast command, `no-view` type, with one declared argument.

### Files

- `package.json` — declares the command, its argument (`taskTitle`, text, required), and the two Raycast preferences (`apiKey`, `listId`)
- `src/create-task.ts` — command entry point: reads preferences, calls the ClickUp API, shows HUD
- `src/clickup.ts` — thin API module with a single `createTask(title, listId, apiKey)` function

## Raycast Preferences (configured once)

| Key | Description |
|-----|-------------|
| `apiKey` | ClickUp personal API token |
| `listId` | Destination list ID |

Both are required. Raycast prevents the command from running if either is missing.

## API Integration

- Endpoint: `POST https://api.clickup.com/api/v2/list/{listId}/task`
- Auth: `Authorization: <apiKey>` header
- Payload: `{ "name": "<taskTitle>" }`
- Fields: title only

## HUD Messages

- Success: `"Task created"`
- Failure: `"Failed: <error message>"`

Error message comes from the ClickUp API response where available, otherwise `"Network error"`.

## Error Handling

| Case | Behaviour |
|------|-----------|
| Missing preferences | Raycast blocks command invocation automatically |
| Network error | HUD: `"Failed: Network error"` |
| ClickUp API error | HUD: `"Failed: <API error message>"` |

No retries. No fallback queue.

## Testing

Manual only. Run the command against the real ClickUp API and verify the task appears in the configured list.

## Out of Scope

- Selecting the list at task-creation time
- Due dates, assignees, priority, or any other fields
- OAuth / multi-user support
- Publishing to the Raycast store
