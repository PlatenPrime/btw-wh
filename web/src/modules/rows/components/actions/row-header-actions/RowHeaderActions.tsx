import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowHeaderActionsView } from "@/modules/rows/components/actions/row-header-actions/RowHeaderActionsView";
import { Plus, Trash2Icon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

interface RowHeaderActionsProps {
  row: RowDto;
}

export function RowHeaderActions({ row }: RowHeaderActionsProps) {
  const navigate = useNavigate();
  const [createPalletDialogOpen, setCreatePalletDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openCreatePalletDialog = useCallback(() => {
    setCreatePalletDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    navigate("/wh/rows");
  }, [navigate]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "create-pallet",
        label: "Додати палету",
        icon: Plus,
        variant: "default",
        onClick: openCreatePalletDialog,
      },
      {
        id: "delete-row",
        label: "Видалити ряд",
        icon: Trash2Icon,
        variant: "super-destructive",
        onClick: openDeleteDialog,
      },
    ],
    [openCreatePalletDialog, openDeleteDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <RowHeaderActionsView
      row={row}
      createPalletDialogOpen={createPalletDialogOpen}
      onCreatePalletDialogOpenChange={setCreatePalletDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
      onDeleteSuccess={handleDeleteSuccess}
    />
  );
}

