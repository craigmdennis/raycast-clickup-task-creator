# ClickUp Quick Capture — Raycast Extension

Type a task title directly into the Raycast search bar and save it to a ClickUp list instantly. No form, no new window.

## Setup

1. Clone this repo and run `npm install`
2. Run `npm run build` to register the extension with Raycast
3. Open Raycast and search for **Create ClickUp Task**
4. On first run, Raycast will prompt for two preferences:

| Preference | Where to find it |
|------------|-----------------|
| **API Key** | ClickUp → Profile → Settings → Apps → API Token |
| **List ID** | The number after `/li/` in your ClickUp list URL, or paste the full URL |

## Usage

1. Open Raycast
2. Type **Create ClickUp Task** (or bind it to a shortcut)
3. Type your task title
4. Press Enter — the task is saved and Raycast closes

After making code changes, re-run `npm run build` to update the extension.

## Development

```bash
npm run dev   # watch mode with hot reload
npm run build # production build
npm run lint  # lint
```

---

> **Notice:** This extension was built with the assistance of AI. It is provided as-is with no warranty. Use at your own risk.
