import type { HeaderAction } from "@/components/layout/header";
import { useRegisterHeaderActions } from "@/components/layout/header";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowDetailHeaderActionsView } from "@/modules/rows/components/actions/row-detail-header-actions/RowDetailHeaderActionsView";
import { useCallback, useMemo, useState } from "react";

interface RowDetailHeaderActionsProps {
  row: RowDto;
}

export function RowDetailHeaderActions({ row }: RowDetailHeaderActionsProps) {
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
        id: "create-pallet",
        label: "Створити палету",
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
    <RowDetailHeaderActionsView
      row={row}
      createDialogOpen={createDialogOpen}
      onCreateDialogOpenChange={setCreateDialogOpen}
      onCreateSuccess={onCreateSuccess}
    />
  );
}

