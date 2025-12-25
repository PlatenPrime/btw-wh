import { useContext, useEffect, useRef } from "react";
import { HeaderActionsContext } from "./HeaderActionsContext";
import type { HeaderAction } from "./types";

export function useHeaderActions() {
  const context = useContext(HeaderActionsContext);

  if (!context) {
    throw new Error(
      "useHeaderActions must be used within HeaderActionsProvider"
    );
  }

  return context;
}

/**
 * Хук для регистрации действия в header
 * Автоматически отменяет регистрацию при размонтировании компонента
 */
export function useRegisterHeaderAction(action: HeaderAction | null) {
  const { registerAction, unregisterAction } = useHeaderActions();
  const actionRef = useRef(action);

  // Обновляем ref при изменении action
  useEffect(() => {
    actionRef.current = action;
  });

  useEffect(() => {
    const currentAction = actionRef.current;
    if (!currentAction) return;

    registerAction(currentAction);

    return () => {
      unregisterAction(currentAction.id);
    };
  }, [action?.id, registerAction, unregisterAction]);
}

/**
 * Хук для регистрации нескольких действий в header
 * Автоматически отменяет регистрацию при размонтировании компонента
 */
export function useRegisterHeaderActions(actions: HeaderAction[]) {
  const { registerAction, unregisterAction } = useHeaderActions();
  const actionsRef = useRef(actions);

  // Обновляем ref при изменении actions
  useEffect(() => {
    actionsRef.current = actions;
  });

  // Создаем строку из ID для отслеживания изменения списка действий
  const actionsIds = actions.map((a) => a.id).join(",");

  useEffect(() => {
    const currentActions = actionsRef.current;
    if (!currentActions.length) return;

    currentActions.forEach((action) => {
      registerAction(action);
    });

    return () => {
      currentActions.forEach((action) => {
        unregisterAction(action.id);
      });
    };
  }, [actionsIds, registerAction, unregisterAction]);
}
