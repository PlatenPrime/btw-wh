import type { HeaderAction } from "@/components/layout/header";
import { useRegisterHeaderActions } from "@/components/layout/header";
import { ZonesHeaderActionsView } from "@/modules/zones/components/actions/zones-header-actions/ZonesHeaderActionsView";
import { useCallback, useMemo, useState } from "react";

export function ZonesHeaderActions() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const openCreateDialog = useCallback(() => {
    setCreateDialogOpen(true);
  }, []);

  const onCreateSuccess = useCallback(() => {
    setCreateDialogOpen(false);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "create-zone",
        label: "Створити зону",
        icon: "add",
        iconColor: "emerald",
        textColor: "emerald",
        variant: "default",
        onClick: openCreateDialog,
      },
    ],
    [openCreateDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <ZonesHeaderActionsView
      createDialogOpen={createDialogOpen}
      onCreateDialogOpenChange={setCreateDialogOpen}
      onCreateSuccess={onCreateSuccess}
    />
  );
}

