import { SERVER_URL } from "@/constants/server";
import type { RegisterData } from "@/modules/auth/api/types";

export async function register(data: RegisterData) {
  const res = await fetch(`${SERVER_URL}auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    throw new Error(message || "Registration error");
  }
  return result;
}
