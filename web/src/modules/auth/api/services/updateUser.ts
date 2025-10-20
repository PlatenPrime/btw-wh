import { SERVER_URL } from "@/constants/server";
import type { UpdateUserData } from "@/modules/auth/api/types";

export async function updateUser(
  userId: string,
  data: UpdateUserData,
  token: string,
) {
  const res = await fetch(`${SERVER_URL}auth/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const text = await res.text();
  let result: unknown = null;
  try {
    result = text ? JSON.parse(text) : null;
  } catch {
    result = null;
  }
  if (!res.ok) {
    const message =
      typeof result === "object" && result && "message" in result
        ? (result as { message?: string }).message
        : undefined;
    throw new Error(message || "Update error");
  }
  return result;
}
