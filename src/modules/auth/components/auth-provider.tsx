import { createContext, useCallback, useEffect, useRef, useState } from "react";
import * as api from "../api/authApi";
import type {
  AuthContextType,
  AuthProviderProps,
  RegisterData,
  UpdateUserData,
  User,
} from "../types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// Define the expected API response type
type AuthApiResponse = {
  user: User;
  token: string;
};

function isAuthApiResponse(obj: unknown): obj is AuthApiResponse {
  return (
    typeof obj === "object" && obj !== null && "user" in obj && "token" in obj
  );
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isLoggingOut = useRef(false);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
    console.log(
      "AuthProvider mount: storedUser",
      storedUser,
      "storedToken",
      storedToken,
    );
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Save token/user to localStorage
  useEffect(() => {
    if (isLoggingOut.current) return;
    if (token && user) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  }, [token, user]);

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.login(username, password);
      if (isAuthApiResponse(data)) {
        setUser(data.user);
        setToken(data.token);
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (data: RegisterData) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.register(data);
        if (
          typeof res === "object" &&
          res !== null &&
          "user" in res &&
          data.password
        ) {
          await login(data.username, data.password);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [login],
  );

  const logout = useCallback(() => {
    isLoggingOut.current = true;
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    console.log("Logout: cleared auth localStorage");
    setTimeout(() => {
      isLoggingOut.current = false;
    }, 100); // allow state to settle
  }, []);

  const updateUser = useCallback(
    async (data: UpdateUserData) => {
      if (!user || !token) return;
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.updateUser(user._id, data, token);
        if (isAuthApiResponse(res)) {
          setUser(res.user);
          setToken(res.token || token);
        } else {
          throw new Error("Invalid updateUser response");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [user, token],
  );

  const fetchCurrentUser = useCallback(async () => {
    if (!user || !token) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.getMe(user._id, token);
      if (isAuthApiResponse(res)) {
        setUser(res.user);
        setToken(res.token || token);
      } else {
        throw new Error("Invalid fetchCurrentUser response");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [user, token, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        login,
        register,
        logout,
        updateUser,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
