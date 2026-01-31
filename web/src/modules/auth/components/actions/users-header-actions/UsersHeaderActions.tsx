import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { UsersHeaderActionsView } from "./UsersHeaderActionsView";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function UsersHeaderActions() {
  const { hasAnyRole } = useAuth();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const isPrime = hasAnyRole([RoleType.PRIME]);

  const openCreateDialog = useCallback(() => {
    setCreateDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(
    () =>
      isPrime
        ? [
            {
              id: "create-user",
              label: "Додати користувача",
              icon: Plus,
              iconColor: "emerald",
              variant: "default",
              onClick: openCreateDialog,
            },
          ]
        : [],
    [isPrime, openCreateDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <UsersHeaderActionsView
      createDialogOpen={createDialogOpen}
      onCreateDialogOpenChange={setCreateDialogOpen}
    />
  );
}
