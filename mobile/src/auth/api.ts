import * as SecureStore from "expo-secure-store";

const SERVER_URL = "https://btw-wh.up.railway.app/api/";

export type LoginResponse = {
  user: { _id: string; username: string };
  token: string;
};

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${SERVER_URL}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : null;

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? (data as any).message
        : "Login error";
    throw new Error(message);
  }

  return data as LoginResponse;
}

export async function getMe(id: string, token: string): Promise<LoginResponse> {
  const res = await fetch(`${SERVER_URL}auth/me/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : null;

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? (data as any).message
        : "User not found";
    throw new Error(message);
  }

  return data as LoginResponse;
}

export async function setToken(token: string | null) {
  if (token) {
    await SecureStore.setItemAsync("auth_token", token);
  } else {
    await SecureStore.deleteItemAsync("auth_token");
  }
}

export async function getToken() {
  return SecureStore.getItemAsync("auth_token");
}
