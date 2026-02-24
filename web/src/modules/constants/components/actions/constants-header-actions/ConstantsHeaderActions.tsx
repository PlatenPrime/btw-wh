import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { ConstantsHeaderActionsView } from "@/modules/constants/components/actions/constants-header-actions/ConstantsHeaderActionsView";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function ConstantsHeaderActions() {
  const { hasRole } = useAuth();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const canCreate = hasRole(RoleType.ADMIN);

  const openCreateDialog = useCallback(() => {
    setCreateDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(
    () =>
      canCreate
        ? [
            {
              id: "create-constant",
              label: "Створити константу",
              icon: Plus,
              iconColor: "emerald",
              variant: "default",
              onClick: openCreateDialog,
            },
          ]
        : [],
    [canCreate, openCreateDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <ConstantsHeaderActionsView
      createDialogOpen={createDialogOpen}
      onCreateDialogOpenChange={setCreateDialogOpen}
    />
  );
}
