# ClickUp Quick-Capture Raycast Extension Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Raycast extension that captures a task title typed directly in the search bar and creates it in a configured ClickUp list, with a HUD confirmation.

**Architecture:** A single `no-view` Raycast command with one inline argument (`taskTitle`). The command reads two Raycast preferences (`apiKey`, `listId`), calls the ClickUp REST API, and shows a HUD. The ClickUp API call lives in its own module (`src/clickup.ts`) to keep the command entry point simple.

**Tech Stack:** TypeScript, `@raycast/api` SDK, Node.js built-in `fetch`

---

## File Map

| File | Purpose |
|------|---------|
| `package.json` | Extension manifest: command definition, argument, preferences, dependencies |
| `tsconfig.json` | TypeScript compiler config (Raycast standard) |
| `assets/extension-icon.png` | Required 512×512 PNG icon (any image works for local dev) |
| `src/clickup.ts` | `createTask(title, listId, apiKey)` — single ClickUp API call |
| `src/create-task.ts` | Command entry point: reads preferences, calls `createTask`, shows HUD |

---

## Task 1: Create package.json

**Files:**
- Create: `package.json`

- [ ] **Step 1: Write package.json**

```json
{
  "name": "clickup-quick-capture",
  "title": "ClickUp Quick Capture",
  "description": "Add a task to ClickUp directly from the Raycast search bar",
  "icon": "extension-icon.png",
  "author": "craigmdennis",
  "categories": ["Productivity"],
  "license": "MIT",
  "commands": [
    {
      "name": "create-task",
      "title": "Create ClickUp Task",
      "description": "Add a task to ClickUp",
      "mode": "no-view",
      "arguments": [
        {
          "name": "taskTitle",
          "placeholder": "Task title",
          "type": "text",
          "required": true
        }
      ]
    }
  ],
  "preferences": [
    {
      "name": "apiKey",
      "title": "API Key",
      "description": "Your ClickUp personal API token (Settings > Apps > API Token)",
      "type": "password",
      "required": true
    },
    {
      "name": "listId",
      "title": "List ID",
      "description": "The ClickUp list ID where tasks will be created",
      "type": "textfield",
      "required": true
    }
  ],
  "dependencies": {
    "@raycast/api": "^1.79.0"
  },
  "devDependencies": {
    "@raycast/eslint-config": "^1.0.11",
    "eslint": "^8.57.0",
    "typescript": "^5.4.5"
  },
  "scripts": {
    "build": "ray build -e dist",
    "dev": "ray develop",
    "lint": "ray lint",
    "fix-lint": "ray lint --fix"
  }
}
```

> **Finding your List ID:** In ClickUp, open the list in the browser. The URL will contain the list ID — it looks like `app.clickup.com/123456/v/li/901234567`. The number after `/li/` is your list ID.

- [ ] **Step 2: Commit**

```bash
git add package.json
git commit -m "feat: add Raycast extension manifest"
```

---

## Task 2: Create tsconfig.json

**Files:**
- Create: `tsconfig.json`

- [ ] **Step 1: Write tsconfig.json**

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "include": ["src"],
  "compilerOptions": {
    "strict": true,
    "target": "ES2021",
    "module": "CommonJS",
    "lib": ["ES2021"],
    "jsx": "react-jsx",
    "jsxImportSource": "@raycast/api",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "outDir": "dist"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add tsconfig.json
git commit -m "feat: add TypeScript config"
```

---

## Task 3: Add extension icon

**Files:**
- Create: `assets/extension-icon.png`

Raycast requires a 512×512 PNG at `assets/extension-icon.png`. During local development any PNG works.

- [ ] **Step 1: Create assets directory and add icon**

```bash
mkdir -p assets
```

Copy any 512×512 PNG into `assets/extension-icon.png`. A quick option — download one from the web, or use ImageMagick if installed:

```bash
magick -size 512x512 xc:#7B68EE assets/extension-icon.png
```

(This creates a solid purple square — fine for dev.)

- [ ] **Step 2: Commit**

```bash
git add assets/extension-icon.png
git commit -m "feat: add extension icon placeholder"
```

---

## Task 4: Implement the ClickUp API module

**Files:**
- Create: `src/clickup.ts`

- [ ] **Step 1: Create src directory and write src/clickup.ts**

```bash
mkdir -p src
```

```typescript
export async function createTask(title: string, listId: string, apiKey: string): Promise<void> {
  let response: Response;

  try {
    response = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: title }),
    });
  } catch {
    throw new Error("Network error");
  }

  if (!response.ok) {
    const data: unknown = await response.json().catch(() => ({}));
    const errData = data as { err?: string; message?: string };
    throw new Error(errData.err ?? errData.message ?? "Unknown error");
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/clickup.ts
git commit -m "feat: add ClickUp API module"
```

---

## Task 5: Implement the command entry point

**Files:**
- Create: `src/create-task.ts`

- [ ] **Step 1: Write src/create-task.ts**

```typescript
import { getPreferenceValues, showHUD } from "@raycast/api";
import { createTask } from "./clickup";

interface Preferences {
  apiKey: string;
  listId: string;
}

interface Arguments {
  taskTitle: string;
}

export default async function Command(props: { arguments: Arguments }) {
  const { apiKey, listId } = getPreferenceValues<Preferences>();
  const { taskTitle } = props.arguments;

  try {
    await createTask(taskTitle, listId, apiKey);
    await showHUD("Task created");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error";
    await showHUD(`Failed: ${message}`);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/create-task.ts
git commit -m "feat: add create-task command"
```

---

## Task 6: Install dependencies and run in development mode

- [ ] **Step 1: Install dependencies**

```bash
npm install
```

Expected: `node_modules` created, no errors.

- [ ] **Step 2: Start development mode**

```bash
npm run dev
```

Expected output includes something like:
```
Building extension...
Done in Xs
```

Raycast will detect the extension automatically. Open Raycast and search for "Create ClickUp Task" — it should appear.

- [ ] **Step 3: Configure preferences in Raycast**

When you first invoke "Create ClickUp Task", Raycast will prompt for the two preferences:

1. **API Key** — your ClickUp personal token (found at `app.clickup.com` > Profile > Settings > Apps > API Token)
2. **List ID** — the list ID from your ClickUp list URL (the number after `/li/` in the URL)

- [ ] **Step 4: Test the happy path**

In Raycast, invoke "Create ClickUp Task", type a task title, press Enter.

Expected:
- HUD shows "Task created" briefly
- Raycast closes
- The task appears in your ClickUp list

- [ ] **Step 5: Test the error path**

Temporarily set an invalid API key in preferences (Raycast > Extensions > ClickUp Quick Capture > Preferences). Run the command.

Expected: HUD shows `"Failed: ..."` with an error message from ClickUp.

Restore the correct API key after testing.

- [ ] **Step 6: Commit final state**

```bash
git add package-lock.json
git commit -m "feat: add lockfile"
```
