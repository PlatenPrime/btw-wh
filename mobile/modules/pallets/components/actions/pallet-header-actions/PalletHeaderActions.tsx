import type { HeaderAction } from "@/components/layout/header";
import { useRegisterHeaderActions } from "@/components/layout/header";
import type { IPallet } from "@/modules/pallets/api/types";
import { PalletHeaderActionsView } from "@/modules/pallets/components/actions/pallet-header-actions/PalletHeaderActionsView";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";

interface PalletHeaderActionsProps {
  pallet: IPallet;
}

export function PalletHeaderActions({ pallet }: PalletHeaderActionsProps) {
  const router = useRouter();
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

  const handleDeleteSuccess = useCallback(() => {
    router.back();
  }, [router]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "move-pallet-poses",
        label: "Перемістити позиції",
        icon: "swap-horiz",
        iconColor: "purple",
        textColor: "purple",
        variant: "default",
        onClick: openMoveDialog,
      },
      {
        id: "delete-empty-poses",
        label: "Очистити порожні",
        icon: "delete-outline",
        iconColor: "red",
        textColor: "red",
        variant: "destructive",
        onClick: openDeleteEmptyPosesDialog,
      },
      {
        id: "clear-pallet",
        label: "Видалити позиції",
        icon: "delete-sweep",
        iconColor: "rose",
        textColor: "rose",
        variant: "super-destructive",
        onClick: openClearDialog,
      },
      {
        id: "delete-pallet",
        label: "Видалити палету",
        icon: "delete",
        iconColor: "red",
        textColor: "red",
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
      onDeleteSuccess={handleDeleteSuccess}
    />
  );
}

