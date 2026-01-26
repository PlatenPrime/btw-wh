import type { HeaderAction } from "@/components/layout/header";
import { useRegisterHeaderActions } from "@/components/layout/header";
import { AsksHeaderActionsView } from "@/modules/asks/components/actions/asks-header-actions/AsksHeaderActionsView";
import { useCallback, useMemo, useState } from "react";

export function AsksHeaderActions() {
  const [createAskDialogOpen, setCreateAskDialogOpen] = useState(false);

  const openCreateAskDialog = useCallback(() => {
    setCreateAskDialogOpen(true);
  }, []);

  const onCreateAskSuccess = useCallback(() => {
    setCreateAskDialogOpen(false);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "create-ask",
        label: "Створити запит",
        icon: "add",
        iconColor: "emerald",
        textColor: "emerald",
        variant: "default",
        onClick: openCreateAskDialog,
      },
    ],
    [openCreateAskDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <AsksHeaderActionsView
      createAskDialogOpen={createAskDialogOpen}
      onCreateAskDialogOpenChange={setCreateAskDialogOpen}
      onCreateAskSuccess={onCreateAskSuccess}
    />
  );
}

