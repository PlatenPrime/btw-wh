import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdatePalletGroupMutation } from "@/modules/pallet-groups/api/hooks/mutations/useUpdatePalletGroupMutation";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { useState } from "react";

interface RenamePalletGroupDialogViewProps {
  group: PalletGroupDto;
  onClose: () => void;
}

export function RenamePalletGroupDialogView({
  group,
  onClose,
}: RenamePalletGroupDialogViewProps) {
  const [title, setTitle] = useState(group.title);
  const updateMutation = useUpdatePalletGroupMutation();

  const handleSubmit = async () => {
    if (!title.trim() || title === group.title) {
      onClose();
      return;
    }

    await updateMutation.mutateAsync({
      id: group.id,
      data: { title: title.trim() },
    });

    onClose();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Перейменувати групу палет</DialogTitle>
      </DialogHeader>
      <div className="grid gap-3 pt-2">
        <div className="grid gap-1">
          <label className="text-xs font-medium">Нова назва групи</label>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={updateMutation.isPending}
          >
            Скасувати
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim() || updateMutation.isPending}
          >
            {updateMutation.isPending ? "Збереження..." : "Зберегти"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
