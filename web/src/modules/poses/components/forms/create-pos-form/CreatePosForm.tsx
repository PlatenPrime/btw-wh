import type { IPallet } from "@/modules/pallets/api/types";

import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";
import { useCreatePosMutation } from "@/modules/poses/api/hooks/mutations/useCreatePosMutation";
import { useUpdatePosByIdMutation } from "@/modules/poses/api/hooks/mutations/useUpdatePosByIdMutation";
import { CreatePosFormView } from "@/modules/poses/components/forms/create-pos-form/CreatePosFormView.tsx";
import {
  createPosFormDefaultValues,
  createPosFormSchema,
  type CreatePosFormData,
} from "@/modules/poses/components/forms/create-pos-form/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CreatePosFormProps {
  pallet: IPallet;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreatePosForm({
  pallet,
  onSuccess,
  onCancel,
}: CreatePosFormProps) {
  const form = useForm<CreatePosFormData>({
    resolver: zodResolver(createPosFormSchema),
    defaultValues: createPosFormDefaultValues,
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    formState: { isSubmitting },
  } = form;
  const artikul = watch("artikul");

  const createPosMutation = useCreatePosMutation(pallet);
  const updatePosMutation = useUpdatePosByIdMutation();

  // Поиск артикула при вводе 9 символов
  const shouldSearchArt = artikul.length === 9;
  const { data: artData, isPending: isArtLoading } = useOneArtQuery(
    shouldSearchArt ? artikul : undefined,
  );

  // Поиск существующей позиции с таким же артикулом
  const existingPos = pallet.poses.find(
    (pos) => pos.artikul === artikul && pos.sklad === watch("sklad"),
  );

  // Обработчики для числовых полей без ведущих нулей
  const handleQuantChange = (value: string) => {
    // Убираем все нецифровые символы
    const numericValue = value.replace(/\D/g, "");

    // Если поле пустое, устанавливаем 0
    if (numericValue === "") {
      setValue("quant", 0, { shouldValidate: true });
      return;
    }

    // Конвертируем в число и устанавливаем
    const numValue = parseInt(numericValue, 10);
    setValue("quant", numValue, { shouldValidate: true });
  };

  const handleBoxesChange = (value: string) => {
    // Убираем все нецифровые символы
    const numericValue = value.replace(/\D/g, "");

    // Если поле пустое, устанавливаем 0
    if (numericValue === "") {
      setValue("boxes", 0, { shouldValidate: true });
      return;
    }

    // Конвертируем в число и устанавливаем
    const numValue = parseInt(numericValue, 10);
    setValue("boxes", numValue, { shouldValidate: true });
  };

  const onSubmit = async (data: CreatePosFormData) => {
    // Защита от двойной отправки
    if (
      createPosMutation.isPending ||
      updatePosMutation.isPending ||
      isSubmitting
    ) {
      return;
    }

    try {
      if (existingPos) {
        // Обновляем существующую позицию
        await updatePosMutation.mutateAsync({
          id: existingPos._id,
          data: {
            quant: existingPos.quant + data.quant,
            boxes: existingPos.boxes + data.boxes,
          },
        });
        onSuccess?.();
      } else {
        // Создаем новую позицию
        await createPosMutation.mutateAsync({
          palletId: pallet._id,
          rowId: pallet.row,
          artikul: data.artikul,
          nameukr: artData?.data?.nameukr,
          quant: data.quant,
          boxes: data.boxes,
          sklad: data.sklad,
        });
        onSuccess?.();
      }
    } catch (error) {
      console.error("Error creating/updating pos:", error);
      // Ошибка будет обработана в компоненте через formState
    }
  };

  // Обработка изменения артикула
  const handleArtikulChange = (value: string) => {
    setValue("artikul", value, { shouldValidate: true });
  };

  const isFormSubmitting =
    isSubmitting || createPosMutation.isPending || updatePosMutation.isPending;

  return (
    <CreatePosFormView
      form={form}
      artikul={artikul}
      onArtikulChange={handleArtikulChange}
      onQuantChange={handleQuantChange}
      onBoxesChange={handleBoxesChange}
      isSubmitting={isFormSubmitting}
      isArtLoading={isArtLoading}
      artData={artData?.data || undefined}
      existingPos={existingPos}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
