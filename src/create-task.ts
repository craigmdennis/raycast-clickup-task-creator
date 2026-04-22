import { getPreferenceValues, showHUD, LaunchProps } from "@raycast/api";
import { createTask } from "./clickup";

interface Preferences {
  apiKey: string;
  listId: string;
}

interface CommandArguments {
  taskTitle: string;
}

function extractListId(value: string): string {
  const match = value.match(/\/li\/(\d+)/);
  return match ? match[1] : value.trim();
}

export default async function Command(props: LaunchProps<{ arguments: CommandArguments }>) {
  const { apiKey, listId: rawListId } = getPreferenceValues<Preferences>();
  const listId = extractListId(rawListId);
  const { taskTitle } = props.arguments;

  try {
    await createTask(taskTitle, listId, apiKey);
    await showHUD("Task created");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error";
    await showHUD(`Failed: ${message}`);
  }
}
