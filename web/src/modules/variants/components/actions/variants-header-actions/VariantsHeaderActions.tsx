import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { Plus } from "lucide-react";
import { useCallback, useMemo } from "react";

interface VariantsHeaderActionsProps {
  onCreateDialogOpenChange?: (open: boolean) => void;
}

export function VariantsHeaderActions({
  onCreateDialogOpenChange,
}: VariantsHeaderActionsProps) {
  const { hasRole } = useAuth();

  const openCreateDialog = useCallback(() => {
    onCreateDialogOpenChange?.(true);
  }, [onCreateDialogOpenChange]);

  const canCreate = hasRole(RoleType.ADMIN);

  const headerActions = useMemo<HeaderAction[]>(
    () => {
      const actions: HeaderAction[] = [];

      if (canCreate) {
        actions.push({
          id: "create-variant",
          label: "Створити варіант",
          icon: Plus,
          iconColor: "emerald",
          variant: "default",
          onClick: openCreateDialog,
        });
      }

      return actions;
    },
    [canCreate, openCreateDialog],
  );

  useRegisterHeaderActions(headerActions);

  // Совпадение: header menu не рендерит сам компонент.
  // Делаем return null как и в аналогах.
  return null;
}

