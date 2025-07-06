import { SERVER_URL } from "../../../constants/server";
import type { RegisterData, UpdateUserData } from "../types";

export async function login(username: string, password: string) {
  const res = await fetch(`${SERVER_URL}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
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
    throw new Error(message || "Login error");
  }
  return data;
}

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
