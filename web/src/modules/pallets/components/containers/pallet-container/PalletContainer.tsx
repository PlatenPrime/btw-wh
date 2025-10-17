import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { PalletResponse } from "@/modules/pallets/api/types";
import { PalletContainerView } from "@/modules/pallets/components/containers/pallet-container/PalletContainerView.tsx";
import { EraserIcon, MoveIcon, Trash2Icon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ClearPalletDialog } from "../../dialogs/clear-pallet-dialog/ClearPalletDialog";
import { DeletePalletDialog } from "../../dialogs/delete-pallet-dialog/DeletePalletDialog";
import { DeletePalletEmptyPosesDialog } from "../../dialogs/delete-pallet-empty-poses-dialog/DeletePalletEmptyPosesDialog";
import { MovePalletPosesDialog } from "../../dialogs/move-pallet-poses-dialog/MovePalletPosesDialog";

interface PalletContainerProps {
  pallet: PalletResponse;
  onPosCreated?: () => void;
}

export function PalletContainer({
  pallet,
  onPosCreated,
}: PalletContainerProps) {
  const navigate = useNavigate();
  const [newPosIds, setNewPosIds] = useState<string[]>([]);

  // Состояния для диалогов
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [deleteEmptyPosesDialogOpen, setDeleteEmptyPosesDialogOpen] =
    useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handlePosCreated = (newPosId?: string) => {
    if (newPosId) {
      setNewPosIds((prev) => [...prev, newPosId]);
    }
    onPosCreated?.();
  };

  const handlePalletDeleted = () => {
    navigate(`/wh/rows/${pallet.rowData.title}`);
  };



  // Регистрируем действия в header меню
  useRegisterHeaderActions([
    {
      id: "move-pallet-poses",
      label: "Перемістити позиції",
      icon: MoveIcon,
      iconColor: "purple",
      variant: "default",
      onClick: () => setMoveDialogOpen(true),
    },
    {
      id: "clear-pallet",
      label: "Очистити палету",
      icon: EraserIcon,
      variant: "destructive",
      onClick: () => setClearDialogOpen(true),
    },
    {
      id: "delete-empty-poses",
      label: "Видалити порожні",
      icon: TrashIcon,
      variant: "destructive",
      onClick: () => setDeleteEmptyPosesDialogOpen(true),
    },
    {
      id: "delete-pallet",
      label: "Видалити палету",
      icon: Trash2Icon,
      variant: "super-destructive",
      onClick: () => setDeleteDialogOpen(true),
    },
  ]);

  return (
    <>
      <PalletContainerView pallet={pallet} handlePosCreated={handlePosCreated} newPosIds={newPosIds} />
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
