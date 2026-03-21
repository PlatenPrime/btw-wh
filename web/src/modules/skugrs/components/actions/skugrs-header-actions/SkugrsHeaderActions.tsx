import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { Plus } from "lucide-react";
import { useCallback, useMemo } from "react";

interface SkugrsHeaderActionsProps {
  onCreateDialogOpenChange?: (open: boolean) => void;
}

export function SkugrsHeaderActions({
  onCreateDialogOpenChange,
}: SkugrsHeaderActionsProps) {
  const { hasRole } = useAuth();
  const canCreate = hasRole(RoleType.ADMIN);

  const openCreateDialog = useCallback(() => {
    onCreateDialogOpenChange?.(true);
  }, [onCreateDialogOpenChange]);

  const headerActions = useMemo<HeaderAction[]>(() => {
    if (!canCreate) return [];
    return [
      {
        id: "create-skugr",
        label: "Створити товарну групу",
        icon: Plus,
        iconColor: "emerald",
        variant: "default",
        onClick: openCreateDialog,
      },
    ];
  }, [canCreate, openCreateDialog]);

  useRegisterHeaderActions(headerActions);

  return null;
}
