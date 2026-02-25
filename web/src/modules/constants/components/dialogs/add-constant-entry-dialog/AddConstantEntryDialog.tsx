import { Dialog } from "@/components/ui/dialog";
import type { ConstantDto } from "@/modules/constants/api/types";
import { useUpdateConstantMutation } from "@/modules/constants/api/hooks/mutations/useUpdateConstantMutation";
import {
  addConstantEntrySchema,
  type AddConstantEntryFormValues,
} from "@/modules/constants/components/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AddConstantEntryDialogView } from "./AddConstantEntryDialogView";

interface AddConstantEntryDialogProps {
  constant: ConstantDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddConstantEntryDialog({
  constant,
  open,
  onOpenChange,
  onSuccess,
}: AddConstantEntryDialogProps) {
  const form = useForm<AddConstantEntryFormValues>({
    resolver: zodResolver(addConstantEntrySchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      key: "",
      value: "",
    },
  });

  const mutation = useUpdateConstantMutation();

  useEffect(() => {
    if (open) {
      form.reset({
        key: "",
        value: "",
      });
    }
  }, [open, form]);

  const handleSuccess = useCallback(() => {
    onSuccess?.();
    onOpenChange(false);
  }, [onSuccess, onOpenChange]);

  const handleSubmit = useCallback(
    async (values: AddConstantEntryFormValues) => {
      const trimmedKey = values.key.trim();
      const trimmedValue = values.value.trim();

      if (!trimmedKey || !trimmedValue) {
        return;
      }

      const currentData = constant.data ?? {};

      if (Object.prototype.hasOwnProperty.call(currentData, trimmedKey)) {
        form.setError("key", {
          type: "manual",
          message: "Ключ вже існує",
        });
        return;
      }

      const newData = {
        ...currentData,
        [trimmedKey]: trimmedValue,
      };

      try {
        await mutation.mutateAsync({
          id: constant._id,
          data: { data: newData },
        });
        handleSuccess();
      } catch (error) {
        form.setError("root", {
          type: "manual",
          message:
            error instanceof Error
              ? error.message
              : "Помилка додавання пари",
        });
      }
    },
    [constant._id, constant.data, form, mutation, handleSuccess],
  );

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AddConstantEntryDialogView
        form={form}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={mutation.isPending}
      />
    </Dialog>
  );
}

