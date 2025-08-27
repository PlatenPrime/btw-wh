import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  login as apiLogin,
  getMe,
  getToken as loadToken,
  setToken as saveToken,
} from "./api";

type User = { _id: string; username: string };

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const t = await loadToken();
      if (!t) {
        setIsLoading(false);
        return;
      }

      try {
        const me = await getMe("me", t);
        setUser(me.user);
        setToken(me.token);
      } catch {
        await saveToken(null);
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await apiLogin(username, password);
      setUser(res.user);
      setToken(res.token);
      await saveToken(res.token);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login error");
      setUser(null);
      setToken(null);
      await saveToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    setToken(null);
    setError(null);
    await saveToken(null);
  }, []);

  const refresh = useCallback(async () => {
    if (!user || !token) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await getMe(user._id, token);
      setUser(res.user);
      setToken(res.token);
      await saveToken(res.token);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Refresh error");
    } finally {
      setIsLoading(false);
    }
  }, [user, token]);

  const value = useMemo(
    () => ({ user, token, isLoading, error, login, logout, refresh }),
    [user, token, isLoading, error, login, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
