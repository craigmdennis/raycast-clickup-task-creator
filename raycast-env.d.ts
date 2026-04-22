/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** API Key - Your ClickUp personal API token (Settings > Apps > API Token) */
  "apiKey": string,
  /** List ID - The ClickUp list ID where tasks will be created */
  "listId": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `create-task` command */
  export type CreateTask = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `create-task` command */
  export type CreateTask = {
  /** Task title */
  "taskTitle": string
}
}

