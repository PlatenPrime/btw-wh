import type { IPos } from "@/modules/poses/api";
import { useUpdatePosMutation } from "@/modules/poses/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UpdatePosFormView } from "./UpdatePosFormView";
import {
  createUpdatePosFormDefaultValues,
  updatePosFormSchema,
  type UpdatePosFormData,
} from "./schema";

interface UpdatePosFormProps {
  pos: IPos;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdatePosForm({
  pos,
  onSuccess,
  onCancel,
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

  const updatePosMutation = useUpdatePosMutation(pos);

  // Обработчики для числовых полей без ведущих нулей
  const handleQuantChange = (value: string) => {
    // Убираем все нецифровые символы
    const numericValue = value.replace(/\D/g, "");

    // Если поле пустое, оставляем пустым для лучшего UX
    if (numericValue === "") {
      setValue("quant", "", { shouldValidate: true });
      return;
    }

    // Если введен только 0, оставляем как есть
    if (numericValue === "0") {
      setValue("quant", "0", { shouldValidate: true });
      return;
    }

    // Убираем лидирующие нули для ненулевых значений
    const cleanValue = numericValue.replace(/^0+/, "");
    setValue("quant", cleanValue, { shouldValidate: true });
  };

  const handleBoxesChange = (value: string) => {
    // Убираем все нецифровые символы
    const numericValue = value.replace(/\D/g, "");

    // Если поле пустое, оставляем пустым для лучшего UX
    if (numericValue === "") {
      setValue("boxes", "", { shouldValidate: true });
      return;
    }

    // Если введен только 0, оставляем как есть
    if (numericValue === "0") {
      setValue("boxes", "0", { shouldValidate: true });
      return;
    }

    // Убираем лидирующие нули для ненулевых значений
    const cleanValue = numericValue.replace(/^0+/, "");
    setValue("boxes", cleanValue, { shouldValidate: true });
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
      // Ошибка будет обработана в компоненте через formState
    }
  };

  const isFormSubmitting = isSubmitting || updatePosMutation.isPending;

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
