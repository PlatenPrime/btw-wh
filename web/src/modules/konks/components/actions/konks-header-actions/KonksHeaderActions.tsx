import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { KonksHeaderActionsView } from "@/modules/konks/components/actions/konks-header-actions/KonksHeaderActionsView";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function KonksHeaderActions() {
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
              id: "create-konk",
              label: "Створити конкурента",
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
    <KonksHeaderActionsView
      createDialogOpen={createDialogOpen}
      onCreateDialogOpenChange={setCreateDialogOpen}
    />
  );
}
