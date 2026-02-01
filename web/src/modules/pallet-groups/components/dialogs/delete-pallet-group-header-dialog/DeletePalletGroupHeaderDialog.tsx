import { Dialog } from "@/components/ui/dialog";
import { useDeletePalletGroupMutation } from "@/modules/pallet-groups/api/hooks/mutations/useDeletePalletGroupMutation";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { DeletePalletGroupHeaderDialogView } from "@/modules/pallet-groups/components/dialogs/delete-pallet-group-header-dialog/DeletePalletGroupHeaderDialogView";
import { useState } from "react";
import { useNavigate } from "react-router";

interface DeletePalletGroupHeaderDialogProps {
  group: PalletGroupDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onDeleted?: () => void;
}

export function DeletePalletGroupHeaderDialog({
  group,
  open: controlledOpen,
  onOpenChange,
  onDeleted,
}: DeletePalletGroupHeaderDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const deleteMutation = useDeletePalletGroupMutation();
  const navigate = useNavigate();

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(group.id);
    handleOpenChange?.(false);
    onDeleted?.();
    navigate("/wh/pallet-groups");
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DeletePalletGroupHeaderDialogView
        group={group}
        isDeleting={deleteMutation.isPending}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
