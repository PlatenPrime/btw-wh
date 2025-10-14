import { hasAnyRole as checkAnyRole, hasRoleAccess } from "@/constants/roles";
import * as api from "@/modules/auth/api/services/index.ts";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import type {
  AuthContextType,
  AuthProviderProps,
  RegisterData,
  RoleType,
  UpdateUserData,
  User,
} from "../../api/types";
import { isTokenExpired } from "../../utils/token";

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

  // Load token from localStorage on mount and validate
  useEffect(() => {
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;

    if (storedToken && storedUser) {
      // Проверяем, не истек ли токен
      if (isTokenExpired(storedToken)) {
        // Токен истек - очищаем данные
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        setToken(null);
        setUser(null);
      } else {
        // Токен валиден - загружаем данные
        setToken(storedToken);
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Ошибка парсинга данных пользователя:", error);
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
          setToken(null);
          setUser(null);
        }
      }
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
        throw new Error("Невірна відповідь сервера при вході");
      }
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
          throw new Error(
            "Невірна відповідь сервера при оновленні користувача",
          );
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
        throw new Error("Невірна відповідь сервера при отриманні користувача");
      }
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
