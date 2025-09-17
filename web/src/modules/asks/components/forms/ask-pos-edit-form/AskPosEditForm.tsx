import type { PosResponse } from "@/modules/poses/api/types";
import { useUpdatePosByIdMutation } from "@/modules/poses/api/hooks/mutations/useUpdatePosByIdMutation";
import { useUpdateAskActionsByIdMutation } from "@/modules/asks/api/hooks/mutations/useUpdateAskActionsByIdMutation";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AskPosEditFormView } from "@/modules/asks/components/forms/ask-pos-edit-form/AskPosEditFormView.tsx";
import {
  createAskPosEditFormDefaultValues,
  askPosEditFormSchema,
  type AskPosEditFormData,
} from "@/modules/asks/components/forms/ask-pos-edit-form/schema.ts";

interface AskPosEditFormProps {
  pos: PosResponse;
  askId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AskPosEditForm({
  pos,
  askId,
  onSuccess,
  onCancel,
}: AskPosEditFormProps) {
  const form = useForm<AskPosEditFormData>({
    resolver: zodResolver(askPosEditFormSchema),
    defaultValues: createAskPosEditFormDefaultValues(),
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    formState: { isSubmitting },
  } = form;

  const removedQuant = watch("removedQuant");
  const removedBoxes = watch("removedBoxes");

  const { user } = useAuth();
  const updatePosMutation = useUpdatePosByIdMutation();
  const updateAskActionsMutation = useUpdateAskActionsByIdMutation();

  // Обработчики для числовых полей без ведущих нулей
  const handleRemovedQuantChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue === "") {
      setValue("removedQuant", "0", { shouldValidate: true });
      return;
    }

    if (numericValue === "0") {
      setValue("removedQuant", "0", { shouldValidate: true });
      return;
    }

    const cleanValue = numericValue.replace(/^0+/, "");
    setValue("removedQuant", cleanValue, { shouldValidate: true });
  };

  const handleRemovedBoxesChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue === "") {
      setValue("removedBoxes", "0", { shouldValidate: true });
      return;
    }

    if (numericValue === "0") {
      setValue("removedBoxes", "0", { shouldValidate: true });
      return;
    }

    const cleanValue = numericValue.replace(/^0+/, "");
    setValue("removedBoxes", cleanValue, { shouldValidate: true });
  };

  const onSubmit = async (data: AskPosEditFormData) => {
    if (!user) {
      console.error("User not found");
      return;
    }

    try {
      const removedQuantNum = parseInt(data.removedQuant, 10);
      const removedBoxesNum = parseInt(data.removedBoxes, 10);

      // Проверяем, что не пытаемся убрать больше чем есть
      if (removedQuantNum > pos.quant) {
        throw new Error("Не можна зняти більше товару, ніж є в наявності");
      }

      if (removedBoxesNum > pos.boxes) {
        throw new Error("Не можна зняти більше коробок, ніж є в наявності");
      }

      // Оновлюємо позицію - віднімаємо зняте кількість
      await updatePosMutation.mutateAsync({
        id: pos._id,
        data: {
          quant: pos.quant - removedQuantNum,
          boxes: pos.boxes - removedBoxesNum,
          sklad: pos.sklad,
        },
      });

      // Додаємо дію в ask
      const actionText = `Знято товару: ${removedQuantNum} шт., коробок: ${removedBoxesNum} шт. з палети ${pos.palletData?.title || "невідома паллета"}`;
      
      await updateAskActionsMutation.mutateAsync({
        id: askId,
        data: {
          action: actionText,
          userId: user._id,
        },
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error updating pos:", error);
      // Ошибка будет обработана в компоненте через formState
    }
  };

  const isFormSubmitting = isSubmitting || updatePosMutation.isPending || updateAskActionsMutation.isPending;

  // Вычисляем остатки
  const remainingQuant = pos.quant - parseInt(removedQuant, 10);
  const remainingBoxes = pos.boxes - parseInt(removedBoxes, 10);

  return (
    <AskPosEditFormView
      form={form}
      pos={pos}
      remainingQuant={remainingQuant}
      remainingBoxes={remainingBoxes}
      onRemovedQuantChange={handleRemovedQuantChange}
      onRemovedBoxesChange={handleRemovedBoxesChange}
      isSubmitting={isFormSubmitting}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
