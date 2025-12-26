import { useState } from "react";
import { useRouter } from "expo-router";
import { useRegisterHeaderActions } from "@/components/layout/header/useHeaderActions";
import type { IPallet } from "@/modules/pallets/api/types";
import { PalletContainerView } from "./PalletContainerView";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import { ClearPalletDialog } from "../../dialogs/clear-pallet-dialog/ClearPalletDialog";
import { DeletePalletDialog } from "../../dialogs/delete-pallet-dialog/DeletePalletDialog";
import { DeletePalletEmptyPosesDialog } from "../../dialogs/delete-pallet-empty-poses-dialog/DeletePalletEmptyPosesDialog";
import { MovePalletPosesDialog } from "../../dialogs/move-pallet-poses-dialog/MovePalletPosesDialog";
import { CreatePosDialog } from "@/modules/poses/components/dialogs/create-pos-dialog/CreatePosDialog";

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
      variant: "default",
      onClick: () => setMoveDialogOpen(true),
    },
    {
      id: "clear-pallet",
      label: "Очистити палету",
      icon: "delete-sweep",
      iconColor: "rose",
      variant: "destructive",
      onClick: () => setClearDialogOpen(true),
    },
    {
      id: "delete-empty-poses",
      label: "Видалити порожні",
      icon: "delete-outline",
      iconColor: "red",
      variant: "destructive",
      onClick: () => setDeleteEmptyPosesDialogOpen(true),
    },
    {
      id: "delete-pallet",
      label: "Видалити палету",
      icon: "delete",
      iconColor: "red",
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

