import type { HeaderAction } from "@/components/layout/header";
import { useRegisterHeaderActions } from "@/components/layout/header";
import { RowsHeaderActionsView } from "@/modules/rows/components/actions/rows-header-actions/RowsHeaderActionsView";
import { useCallback, useMemo, useState } from "react";

export function RowsHeaderActions() {
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
        id: "create-row",
        label: "Створити ряд",
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
    <RowsHeaderActionsView
      createDialogOpen={createDialogOpen}
      onCreateDialogOpenChange={setCreateDialogOpen}
      onCreateSuccess={onCreateSuccess}
    />
  );
}

