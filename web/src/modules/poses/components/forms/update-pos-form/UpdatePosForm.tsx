import { useUpdatePosByIdMutation } from "@/modules/poses/api/hooks/mutations/useUpdatePosByIdMutation";
import type { IPos } from "@/modules/poses/api/types";
import { UpdatePosFormView } from "@/modules/poses/components/forms/update-pos-form/UpdatePosFormView.tsx";
import {
  createUpdatePosFormDefaultValues,
  updatePosFormSchema,
  type UpdatePosFormData,
} from "@/modules/poses/components/forms/update-pos-form/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
    setValue,
    formState: { isSubmitting },
  } = form;

  const updatePosMutation = useUpdatePosByIdMutation();

  // Сбрасываем состояние формы при открытии диалога
  useEffect(() => {
    if (isDialogOpen) {
      form.reset(createUpdatePosFormDefaultValues(pos));
    }
  }, [isDialogOpen, form, pos]);

  // InputQuant уже фильтрует/нормализует — только прокидываем строку
  const handleQuantChange = (value: string) => {
    setValue("quant", value, { shouldValidate: true });
  };

  const handleBoxesChange = (value: string) => {
    setValue("boxes", value, { shouldValidate: true });
  };

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
      console.error("Error updating pos:", error);
      // Помилка буде оброблена в компоненті через formState
    }
  };

  // Блокируем поля только если форма отправляется
  const isFormSubmitting = isSubmitting;

  return (
    <UpdatePosFormView
      form={form}
      artikul={pos.artikul}
      onQuantChange={handleQuantChange}
      onBoxesChange={handleBoxesChange}
      isSubmitting={isFormSubmitting}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
