import { createContext, useCallback, useState } from "react";
import type { HeaderAction, HeaderActionsContextValue } from "./types";

export const HeaderActionsContext = createContext<
  HeaderActionsContextValue | undefined
>(undefined);

interface HeaderActionsProviderProps {
  children: React.ReactNode;
}

export function HeaderActionsProvider({
  children,
}: HeaderActionsProviderProps) {
  const [actions, setActions] = useState<HeaderAction[]>([]);

  const registerAction = useCallback((action: HeaderAction) => {
    setActions((prev) => {
      // Проверяем, не зарегистрировано ли уже это действие
      const exists = prev.some((a) => a.id === action.id);
      if (exists) {
        // Обновляем существующее действие
        return prev.map((a) => (a.id === action.id ? action : a));
      }
      return [...prev, action];
    });
  }, []);

  const unregisterAction = useCallback((id: string) => {
    setActions((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const clearActions = useCallback(() => {
    setActions([]);
  }, []);

  return (
    <HeaderActionsContext.Provider
      value={{
        actions,
        registerAction,
        unregisterAction,
        clearActions,
      }}
    >
      {children}
    </HeaderActionsContext.Provider>
  );
}
