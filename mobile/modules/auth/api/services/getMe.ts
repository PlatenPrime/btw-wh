import { SERVER_URL } from "@/constants/server";

export async function getMe(id: string, token: string) {
  const res = await fetch(`${SERVER_URL}auth/me/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  if (!res.ok) {
    const message =
      typeof data === "object" && data && "message" in data
        ? (data as { message?: string }).message
        : undefined;
    throw new Error(message || "User not found");
  }
  return data;
}

