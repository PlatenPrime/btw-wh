import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeletePalletGroupMutation } from "@/modules/pallet-groups/api/hooks/mutations/useDeletePalletGroupMutation";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { useNavigate } from "react-router";

interface DeletePalletGroupHeaderDialogViewProps {
  group: PalletGroupDto;
  onClose: () => void;
  onDeleted?: () => void;
}

export function DeletePalletGroupHeaderDialogView({
  group,
  onClose,
  onDeleted,
}: DeletePalletGroupHeaderDialogViewProps) {
  const deleteMutation = useDeletePalletGroupMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(group.id);
    onClose();
    onDeleted?.();
    navigate("/wh/pallet-groups");
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Видалити групу палет</DialogTitle>
        <DialogDescription>
          Ви впевнені, що хочете видалити групу &quot;{group.title}&quot;?
          Палети залишаться в системі, але втратять прив&apos;язку до цієї
          групи.
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={deleteMutation.isPending}
        >
          Скасувати
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Видалення..." : "Видалити"}
        </Button>
      </div>
    </DialogContent>
  );
}
