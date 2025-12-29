import { useRegisterHeaderActions } from "@/components/layout/header/useHeaderActions";
import type { IPallet } from "@/modules/pallets/api/types";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import { CreatePosDialog } from "@/modules/poses/components/dialogs/create-pos-dialog/CreatePosDialog";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ClearPalletDialog } from "../../dialogs/clear-pallet-dialog/ClearPalletDialog";
import { DeletePalletDialog } from "../../dialogs/delete-pallet-dialog/DeletePalletDialog";
import { DeletePalletEmptyPosesDialog } from "../../dialogs/delete-pallet-empty-poses-dialog/DeletePalletEmptyPosesDialog";
import { MovePalletPosesDialog } from "../../dialogs/move-pallet-poses-dialog/MovePalletPosesDialog";
import { PalletContainerView } from "./PalletContainerView";

interface PalletContainerProps {
  pallet: IPallet;
  onPosCreated?: () => void;
}

export function PalletContainer({
  pallet,
  onPosCreated,
}: PalletContainerProps) {
  const router = useRouter();
  const [sortParams, setSortParams] = useState<GetPosesByPalletIdParams>({
    sortBy: "updatedAt",
    sortOrder: "desc",
  });

  // Состояния для диалогов
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [deleteEmptyPosesDialogOpen, setDeleteEmptyPosesDialogOpen] =
    useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createPosDialogOpen, setCreatePosDialogOpen] = useState(false);

  const handlePosCreated = () => {
    onPosCreated?.();
  };

  const handlePalletDeleted = () => {
    router.back();
  };

  // Регистрируем действия в header меню
  useRegisterHeaderActions([
    {
      id: "move-pallet-poses",
      label: "Перемістити позиції",
      icon: "swap-horiz",
      iconColor: "purple",
      textColor: "purple",
      variant: "default",
      onClick: () => setMoveDialogOpen(true),
    },
    {
      id: "delete-empty-poses",
      label: "Очистити порожні",
      icon: "delete-outline",
      iconColor: "red",
      textColor: "red",
      variant: "destructive",
      onClick: () => setDeleteEmptyPosesDialogOpen(true),
    },
    {
      id: "clear-pallet",
      label: "Видалити позиції",
      icon: "delete-sweep",
      iconColor: "rose",
      textColor: "rose",
      variant: "super-destructive",
      onClick: () => setClearDialogOpen(true),
    },

    {
      id: "delete-pallet",
      label: "Видалити палету",
      icon: "delete",
      iconColor: "red",
      textColor: "red",
      variant: "super-destructive",
      onClick: () => setDeleteDialogOpen(true),
    },
  ]);

  return (
    <>
      <PalletContainerView
        pallet={pallet}
        handlePosCreated={handlePosCreated}
        sortParams={sortParams}
        onSortParamsChange={setSortParams}
        onCreatePosClick={() => setCreatePosDialogOpen(true)}
      />
      <CreatePosDialog
        pallet={pallet}
        open={createPosDialogOpen}
        onOpenChange={setCreatePosDialogOpen}
        onSuccess={handlePosCreated}
      />
      <ClearPalletDialog
        pallet={pallet}
        onSuccess={() => {}}
        open={clearDialogOpen}
        onOpenChange={setClearDialogOpen}
      />
      <DeletePalletEmptyPosesDialog
        pallet={pallet}
        onSuccess={() => {}}
        open={deleteEmptyPosesDialogOpen}
        onOpenChange={setDeleteEmptyPosesDialogOpen}
      />
      <MovePalletPosesDialog
        pallet={pallet}
        open={moveDialogOpen}
        onOpenChange={setMoveDialogOpen}
      />
      <DeletePalletDialog
        pallet={pallet}
        onSuccess={handlePalletDeleted}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
}
