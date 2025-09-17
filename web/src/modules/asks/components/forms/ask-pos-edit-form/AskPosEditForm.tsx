import { useUpdateAskActionsByIdMutation } from "@/modules/asks/api/hooks/mutations/useUpdateAskActionsByIdMutation";
import { AskPosEditFormView } from "@/modules/asks/components/forms/ask-pos-edit-form/AskPosEditFormView.tsx";
import {
  askPosEditFormSchema,
  createAskPosEditFormDefaultValues,
  type AskPosEditFormData,
} from "@/modules/asks/components/forms/ask-pos-edit-form/schema.ts";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { useUpdatePosByIdMutation } from "@/modules/poses/api/hooks/mutations/useUpdatePosByIdMutation";
import type { PosResponse } from "@/modules/poses/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

  // Обработчики для числовых полей с поддержкой отрицательных чисел
  const handleRemovedQuantChange = (value: string) => {
    // Разрешаем только цифры и знак минус в начале
    const cleanValue = value.replace(/[^0-9-]/g, "");

    // Проверяем, что минус только в начале
    const hasMinus = cleanValue.includes("-");
    const numericPart = cleanValue.replace(/-/g, "");

    if (hasMinus && !cleanValue.startsWith("-")) {
      // Если минус не в начале, убираем его
      setValue("removedQuant", numericPart, { shouldValidate: true });
      return;
    }

    if (cleanValue === "" || cleanValue === "-") {
      setValue("removedQuant", "0", { shouldValidate: true });
      return;
    }

    if (numericPart === "0") {
      setValue("removedQuant", hasMinus ? "-0" : "0", { shouldValidate: true });
      return;
    }

    // Убираем ведущие нули, но сохраняем знак
    const finalValue = hasMinus
      ? `-${numericPart.replace(/^0+/, "") || "0"}`
      : numericPart.replace(/^0+/, "") || "0";

    setValue("removedQuant", finalValue, { shouldValidate: true });
  };

  const handleRemovedBoxesChange = (value: string) => {
    // Разрешаем только цифры и знак минус в начале
    const cleanValue = value.replace(/[^0-9-]/g, "");

    // Проверяем, что минус только в начале
    const hasMinus = cleanValue.includes("-");
    const numericPart = cleanValue.replace(/-/g, "");

    if (hasMinus && !cleanValue.startsWith("-")) {
      // Если минус не в начале, убираем его
      setValue("removedBoxes", numericPart, { shouldValidate: true });
      return;
    }

    if (cleanValue === "" || cleanValue === "-") {
      setValue("removedBoxes", "0", { shouldValidate: true });
      return;
    }

    if (numericPart === "0") {
      setValue("removedBoxes", hasMinus ? "-0" : "0", { shouldValidate: true });
      return;
    }

    // Убираем ведущие нули, но сохраняем знак
    const finalValue = hasMinus
      ? `-${numericPart.replace(/^0+/, "") || "0"}`
      : numericPart.replace(/^0+/, "") || "0";

    setValue("removedBoxes", finalValue, { shouldValidate: true });
  };

  const onSubmit = async (data: AskPosEditFormData) => {
    if (!user) {
      console.error("User not found");
      return;
    }

    try {
      const removedQuantNum = parseInt(data.removedQuant, 10);
      const removedBoxesNum = parseInt(data.removedBoxes, 10);

      // Вычисляем новые значения
      const newQuant = pos.quant - removedQuantNum;
      const newBoxes = pos.boxes - removedBoxesNum;

      // Проверяем, что новые значения не отрицательные
      if (newQuant < 0) {
        throw new Error("Не можна зняти більше товару, ніж є в наявності");
      }

      if (newBoxes < 0) {
        throw new Error("Не можна зняти більше коробок, ніж є в наявності");
      }

      onSuccess?.();

      // Оновлюємо позицію
      await updatePosMutation.mutateAsync({
        id: pos._id,
        data: {
          quant: newQuant,
          boxes: newBoxes,
          sklad: pos.sklad,
        },
      });

      // Додаємо дію в ask
      const actionText =
        removedQuantNum >= 0
          ? `Знято товару: ${removedQuantNum} шт., коробок: ${removedBoxesNum} шт. з палети ${pos.palletData?.title || "невідома паллета"}`
          : `Додано товару: ${Math.abs(removedQuantNum)} шт., коробок: ${Math.abs(removedBoxesNum)} шт. до палети ${pos.palletData?.title || "невідома паллета"}`;


          
          await updateAskActionsMutation.mutateAsync({
            id: askId,
            data: {
              action: actionText,
              userId: user._id,
            },
          });
          

    } catch (error) {
      console.error("Error updating pos:", error);
      // Ошибка будет обработана в компоненте через formState
    }
  };

  const isFormSubmitting =
    isSubmitting ||
    updatePosMutation.isPending ||
    updateAskActionsMutation.isPending;

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
