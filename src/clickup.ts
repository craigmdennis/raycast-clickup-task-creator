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
    throw new Error(errData.err ?? errData.message ?? `HTTP ${response.status}`);
  }
}
