import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeletePalletGroupMutation } from "@/modules/pallet-groups/api/hooks/mutations/useDeletePalletGroupMutation";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";

interface DeletePalletGroupDialogViewProps {
  group: PalletGroupDto;
  onClose: () => void;
}

export function DeletePalletGroupDialogView({
  group,
  onClose,
}: DeletePalletGroupDialogViewProps) {
  const deleteMutation = useDeletePalletGroupMutation();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(group.id);
    onClose();
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
