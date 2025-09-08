import type { IPos } from "@/modules/poses/api/types";
import { useUpdatePosMutation } from "@/modules/poses/api/hooks/mutations/useUpdatePosMutation";
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

  // Обробники для числових полів без провідних нулів
  const handleQuantChange = (value: string) => {
    // Прибираємо всі нецифрові символи
    const numericValue = value.replace(/\D/g, "");

    // Якщо поле порожнє, залишаємо порожнім для кращого UX
    if (numericValue === "") {
      setValue("quant", "", { shouldValidate: true });
      return;
    }

    // Якщо введено тільки 0, залишаємо як є
    if (numericValue === "0") {
      setValue("quant", "0", { shouldValidate: true });
      return;
    }

    // Прибираємо провідні нулі для ненульових значень
    const cleanValue = numericValue.replace(/^0+/, "");
    setValue("quant", cleanValue, { shouldValidate: true });
  };

  const handleBoxesChange = (value: string) => {
    // Прибираємо всі нецифрові символи
    const numericValue = value.replace(/\D/g, "");

    // Якщо поле порожнє, залишаємо порожнім для кращого UX
    if (numericValue === "") {
      setValue("boxes", "", { shouldValidate: true });
      return;
    }

    // Якщо введено тільки 0, залишаємо як є
    if (numericValue === "0") {
      setValue("boxes", "0", { shouldValidate: true });
      return;
    }

    // Прибираємо провідні нулі для ненульових значень
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
      // Помилка буде оброблена в компоненті через formState
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
