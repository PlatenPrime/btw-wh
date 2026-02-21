import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { ProdsHeaderActionsView } from "@/modules/prods/components/actions/prods-header-actions/ProdsHeaderActionsView";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function ProdsHeaderActions() {
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
              id: "create-prod",
              label: "Створити виробника",
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
    <ProdsHeaderActionsView
      createDialogOpen={createDialogOpen}
      onCreateDialogOpenChange={setCreateDialogOpen}
    />
  );
}
