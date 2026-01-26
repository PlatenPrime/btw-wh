import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { IPallet } from "@/modules/pallets/api/types";
import { PalletHeaderActionsView } from "@/modules/pallets/components/actions/pallet-header-actions/PalletHeaderActionsView";
import { EraserIcon, MoveIcon, Trash2Icon, TrashIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

interface PalletHeaderActionsProps {
  pallet: IPallet;
}

export function PalletHeaderActions({ pallet }: PalletHeaderActionsProps) {
  const navigate = useNavigate();
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [deleteEmptyPosesDialogOpen, setDeleteEmptyPosesDialogOpen] =
    useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openMoveDialog = useCallback(() => {
    setMoveDialogOpen(true);
  }, []);

  const openDeleteEmptyPosesDialog = useCallback(() => {
    setDeleteEmptyPosesDialogOpen(true);
  }, []);

  const openClearDialog = useCallback(() => {
    setClearDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handlePalletDeleted = useCallback(() => {
    const rowTitle = pallet.rowData?.title;
    navigate(rowTitle ? `/wh/rows/${rowTitle}` : "/wh/rows");
  }, [navigate, pallet.rowData?.title]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "move-pallet-poses",
        label: "Перемістити позиції",
        icon: MoveIcon,
        iconColor: "purple",
        variant: "default",
        onClick: openMoveDialog,
      },
      {
        id: "delete-empty-poses",
        label: "Очистити порожні",
        icon: TrashIcon,
        variant: "destructive",
        onClick: openDeleteEmptyPosesDialog,
      },
      {
        id: "clear-pallet",
        label: "Видалити позиції",
        icon: EraserIcon,
        variant: "super-destructive",
        onClick: openClearDialog,
      },
      {
        id: "delete-pallet",
        label: "Видалити палету",
        icon: Trash2Icon,
        variant: "super-destructive",
        onClick: openDeleteDialog,
      },
    ],
    [openClearDialog, openDeleteDialog, openDeleteEmptyPosesDialog, openMoveDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <PalletHeaderActionsView
      pallet={pallet}
      clearDialogOpen={clearDialogOpen}
      onClearDialogOpenChange={setClearDialogOpen}
      deleteEmptyPosesDialogOpen={deleteEmptyPosesDialogOpen}
      onDeleteEmptyPosesDialogOpenChange={setDeleteEmptyPosesDialogOpen}
      moveDialogOpen={moveDialogOpen}
      onMoveDialogOpenChange={setMoveDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
      onDeleteSuccess={handlePalletDeleted}
    />
  );
}

