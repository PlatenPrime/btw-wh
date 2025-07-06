import { RegisterData, UpdateUserData } from "../types";

const BASE_URL = "/api/auth";

export async function login(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login error");
  }
  return res.json();
}

export async function register(data: RegisterData) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration error");
  }
  return res.json();
}

export async function getMe(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/me/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "User not found");
  }
  return res.json();
}

export async function updateUser(
  userId: string,
  data: UpdateUserData,
  token: string,
) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Update error");
  }
  return res.json();
}
