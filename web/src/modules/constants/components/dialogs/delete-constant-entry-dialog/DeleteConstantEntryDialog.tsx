import { Dialog } from "@/components/ui/dialog";
import type { ConstantDto } from "@/modules/constants/api/types";
import { useUpdateConstantMutation } from "@/modules/constants/api/hooks/mutations/useUpdateConstantMutation";
import { useCallback } from "react";
import { DeleteConstantEntryDialogView } from "./DeleteConstantEntryDialogView";
import type { ConstantEntry } from "@/modules/constants/components/dialogs/edit-constant-entry-dialog";

interface DeleteConstantEntryDialogProps {
  constant: ConstantDto;
  entry: ConstantEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteConstantEntryDialog({
  constant,
  entry,
  open,
  onOpenChange,
  onSuccess,
}: DeleteConstantEntryDialogProps) {
  const mutation = useUpdateConstantMutation();

  const handleSuccess = useCallback(() => {
    onSuccess?.();
    onOpenChange(false);
  }, [onSuccess, onOpenChange]);

  const handleDelete = useCallback(async () => {
    if (!entry) return;

    const currentData = constant.data ?? {};
    const { [entry.key]: _, ...rest } = currentData;

    try {
      await mutation.mutateAsync({
        id: constant._id,
        data: { data: rest },
      });
      handleSuccess();
    } catch {
      // toast handled in mutation
    }
  }, [constant._id, constant.data, entry, mutation, handleSuccess]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  if (!entry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DeleteConstantEntryDialogView
        constant={constant}
        entry={entry}
        isSubmitting={mutation.isPending}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

