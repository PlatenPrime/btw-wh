import { Dialog } from "@/components/ui/dialog";
import type { ConstantDto } from "@/modules/constants/api/types";
import { useUpdateConstantMutation } from "@/modules/constants/api/hooks/mutations/useUpdateConstantMutation";
import { useCallback, useEffect, useState } from "react";
import { EditConstantEntryDialogView, type ConstantEntry } from "./EditConstantEntryDialogView";

interface EditConstantEntryDialogProps {
  constant: ConstantDto;
  entry: ConstantEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditConstantEntryDialog({
  constant,
  entry,
  open,
  onOpenChange,
  onSuccess,
}: EditConstantEntryDialogProps) {
  const [value, setValue] = useState("");

  const mutation = useUpdateConstantMutation();

  useEffect(() => {
    if (entry) {
      setValue(entry.value);
    }
  }, [entry]);

  const handleSuccess = useCallback(() => {
    onSuccess?.();
    onOpenChange(false);
  }, [onSuccess, onOpenChange]);

  const handleSubmit = useCallback(async () => {
    if (!entry) return;
    const newData = { ...(constant.data ?? {}), [entry.key]: value };
    try {
      await mutation.mutateAsync({ id: constant._id, data: { data: newData } });
      handleSuccess();
    } catch {
      // toast from mutation
    }
  }, [constant._id, constant.data, entry, value, mutation, handleSuccess]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  if (!entry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <EditConstantEntryDialogView
        entry={entry}
        value={value}
        onValueChange={setValue}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={mutation.isPending}
      />
    </Dialog>
  );
}
