import * as api from "@/modules/auth/api/services/index.ts";
import { getItem, removeItem, setItem } from "@/utils/localStorage";
import { hasAnyRole as checkAnyRole, hasRoleAccess } from "@shared/constants";
import {
  isTokenExpired,
  type AuthContextType,
  type AuthProviderProps,
  type RegisterData,
  type RoleType,
  type UpdateUserData,
  type User,
} from "@shared/modules/auth";
import { createContext, useCallback, useEffect, useRef, useState } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isLoggingOut = useRef(false);

  // Load token from localStorage on mount and validate
  useEffect(() => {
    const storedToken = getItem("auth_token");
    const storedUser = getItem("auth_user");

    if (storedToken && storedUser) {
      // Проверяем, не истек ли токен
      if (isTokenExpired(storedToken)) {
        // Токен истек - очищаем данные
        removeItem("auth_token");
        removeItem("auth_user");
        setToken(null);
        setUser(null);
      } else {
        // Токен валиден - загружаем данные
        setToken(storedToken);
        setUser(storedUser);
      }
    }
    setIsLoading(false);
  }, []);

  // Save token/user to localStorage
  useEffect(() => {
    if (isLoggingOut.current) return;
    if (token && user) {
      setItem("auth_token", token);
      setItem("auth_user", user);
    } else {
      removeItem("auth_token");
      removeItem("auth_user");
    }
  }, [token, user]);

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.login({ username, password });
      setUser(data.user);
      setToken(data.token);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Сталася невідома помилка");
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
        if (res && data.password) {
          await login(data.username, data.password);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Сталася невідома помилка");
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
    removeItem("auth_token");
    removeItem("auth_user");
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
        const updatedUser = await api.updateUser(data);
        setUser(updatedUser);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Сталася невідома помилка");
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
      const currentUser = await api.getMe();
      setUser(currentUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Сталася невідома помилка");
      }
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [user, token, logout]);

  /**
   * Проверяет, имеет ли пользователь требуемую роль (с учетом иерархии)
   *
   * @param requiredRole - Минимальная требуемая роль
   * @returns true если у пользователя достаточно прав
   */
  const hasRole = useCallback(
    (requiredRole: RoleType): boolean => {
      if (!user || !user.role) return false;
      return hasRoleAccess(user.role, requiredRole);
    },
    [user],
  );

  /**
   * Проверяет, имеет ли пользователь хотя бы одну из указанных ролей
   *
   * @param allowedRoles - Массив разрешенных ролей
   * @returns true если пользователь имеет одну из ролей
   */
  const hasAnyRole = useCallback(
    (allowedRoles: RoleType[]): boolean => {
      if (!user || !user.role) return false;
      return checkAnyRole(user.role, allowedRoles);
    },
    [user],
  );

  const isAuthenticated = !!(user && token && !isTokenExpired(token));

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
        hasRole,
        hasAnyRole,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
