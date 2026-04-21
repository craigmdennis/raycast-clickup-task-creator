import { getPreferenceValues, showHUD, LaunchProps } from "@raycast/api";
import { createTask } from "./clickup";

interface Preferences {
  apiKey: string;
  listId: string;
}

interface CommandArguments {
  taskTitle: string;
}

export default async function Command(props: LaunchProps<{ arguments: CommandArguments }>) {
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
