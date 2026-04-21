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
