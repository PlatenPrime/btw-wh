import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { Container } from "@/components/shared/containers/Container";
import { Button } from "@/components/ui/button";
import type { PalletResponse } from "@/modules/pallets/api/types";
import { ClearPalletDialog } from "@/modules/pallets/components/dialogs/clear-pallet-dialog/ClearPalletDialog";
import { DeletePalletDialog } from "@/modules/pallets/components/dialogs/delete-pallet-dialog/DeletePalletDialog";
import { DeletePalletEmptyPosesDialog } from "@/modules/pallets/components/dialogs/delete-pallet-empty-poses-dialog/DeletePalletEmptyPosesDialog";
import { MovePalletPosesDialog } from "@/modules/pallets/components/dialogs/move-pallet-poses-dialog/MovePalletPosesDialog";
import { PalletInfo } from "@/modules/pallets/components/elements/pallet-info/PalletInfo";
import {
  PosesByPalletContainer,
  PosesByPalletContainerSkeleton,
} from "@/modules/poses/components/containers/poses-by-pallet-container";
import { CreatePosDialog } from "@/modules/poses/components/dialogs/create-pos-dialog/CreatePosDialog";
import { PosesByPalletFetcher } from "@/modules/poses/components/fetchers";
import { EraserIcon, MoveIcon, Trash2Icon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface PalletContainerViewProps {
  pallet: PalletResponse;
  onPosCreated?: () => void;
}

export function PalletContainerView({
  pallet,
  onPosCreated,
}: PalletContainerViewProps) {
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
      label: "Видалити пусті позиції",
      icon: TrashIcon,
      variant: "destructive",
      onClick: () => setDeleteEmptyPosesDialogOpen(true),
    },
    {
      id: "delete-pallet",
      label: "Видалити палету",
      icon: Trash2Icon,
      variant: "destructive",
      onClick: () => setDeleteDialogOpen(true),
    },
  ]);

  return (
    <div className="grid gap-2">
      <Container className="flex flex-wrap items-center justify-between gap-2">
        {" "}
        <PalletInfo pallet={pallet} />
        <CreatePosDialog
          pallet={pallet}
          onSuccess={handlePosCreated}
          trigger={<Button variant="outline">+ Додати позицію</Button>}
        />
      </Container>

      <PosesByPalletFetcher
        palletId={pallet._id}
        ContainerComponent={PosesByPalletContainer}
        SkeletonComponent={PosesByPalletContainerSkeleton}
        newPosIds={newPosIds}
      />

      {/* Диалоги вне dropdown для избежания конфликта фокуса */}
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
    </div>
  );
}
