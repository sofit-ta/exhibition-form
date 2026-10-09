export async function saveContact(contact: Record<string, string>) {
  let response;
  let result;

  try {
    response = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    result = await response.json();
  } catch {
    throw new Error("Не удалось подтвердить сохранение. Проверьте таблицу перед повторной отправкой.");
  }

  if (!response.ok || result?.ok !== true) {
    throw new Error(
      typeof result?.error === "string" ? result.error : "Не удалось сохранить анкету",
    );
  }
}
