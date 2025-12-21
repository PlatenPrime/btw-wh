import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useUpdatePosMutation } from "@/modules/poses/api/hooks/mutations/useUpdatePosMutation";
import type { IPos } from "@/modules/poses/api/types";
import {
  createUpdatePosFormDefaultValues,
  updatePosFormSchema,
  type UpdatePosFormData,
} from "./schema";
import { UpdatePosFormView } from "./UpdatePosFormView";

interface UpdatePosFormProps {
  pos: IPos;
  onSuccess?: () => void;
  onCancel?: () => void;
  isDialogOpen?: boolean;
}

export function UpdatePosForm({
  pos,
  onSuccess,
  onCancel,
  isDialogOpen = true,
}: UpdatePosFormProps) {
  const form = useForm<UpdatePosFormData>({
    resolver: zodResolver(updatePosFormSchema),
    defaultValues: createUpdatePosFormDefaultValues(pos),
    mode: "onChange",
  });

  const {
    formState: { isSubmitting },
  } = form;

  const updatePosMutation = useUpdatePosMutation(pos);

  // Сбрасываем состояние формы при открытии диалога
  useEffect(() => {
    if (isDialogOpen) {
      form.reset(createUpdatePosFormDefaultValues(pos));
    }
  }, [isDialogOpen, form, pos]);

  const onSubmit = async (data: UpdatePosFormData) => {
    try {
      await updatePosMutation.mutateAsync({
        id: pos._id,
        data: {
          quant: parseInt(data.quant, 10),
          boxes: parseInt(data.boxes, 10),
          sklad: data.sklad,
        },
      });
      onSuccess?.();
    } catch (error) {
      console.error("Помилка оновлення позиції:", error);
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка оновлення позиції",
      });
    }
  };

  const isFormSubmitting = isSubmitting || updatePosMutation.isPending;

  return (
    <UpdatePosFormView
      form={form}
      isSubmitting={isFormSubmitting}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

