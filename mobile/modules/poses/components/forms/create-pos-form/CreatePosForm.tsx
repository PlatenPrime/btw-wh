import type { IPallet } from "@/modules/pallets/api/types";

import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";
import { useCreatePosMutation } from "@/modules/poses/api/hooks/mutations/useCreatePosMutation";
import { useUpdatePosByIdMutation } from "@/modules/poses/api/hooks/mutations/useUpdatePosByIdMutation";
import { CreatePosFormView } from "@/modules/poses/components/forms/create-pos-form/CreatePosFormView";
import {
  createPosFormDefaultValues,
  createPosFormSchema,
  type CreatePosFormData,
} from "@/modules/poses/components/forms/create-pos-form/schema";
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
    reset,
    formState: { isSubmitting },
  } = form;
  const artikul = watch("artikul");

  const createPosMutation = useCreatePosMutation(pallet);
  const updatePosMutation = useUpdatePosByIdMutation();

  // Поиск артикула при вводе 9 символов
  const shouldSearchArt = artikul.length === 9;
  const artQuery = useOneArtQuery(shouldSearchArt ? artikul : undefined);
  const artData = artQuery.data?.data;
  const isArtLoading = artQuery.isPending;

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
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/95c9df87-1dd6-4841-9332-e064e1013b10',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'CreatePosForm.tsx:85',message:'onSubmit called',data:{artikul:data.artikul,quant:data.quant,boxes:data.boxes,sklad:data.sklad,hasExistingPos:!!existingPos},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    // Защита от двойной отправки
    if (
      createPosMutation.isPending ||
      updatePosMutation.isPending ||
      isSubmitting
    ) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/95c9df87-1dd6-4841-9332-e064e1013b10',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'CreatePosForm.tsx:92',message:'onSubmit blocked by pending',data:{createPending:createPosMutation.isPending,updatePending:updatePosMutation.isPending,isSubmitting},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
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
        reset(createPosFormDefaultValues);
        onSuccess?.();
      } else {
        // Создаем новую позицию
        await createPosMutation.mutateAsync({
          palletId: pallet._id,
          rowId: pallet.row,
          artikul: data.artikul,
          nameukr: artData?.nameukr,
          quant: data.quant,
          boxes: data.boxes,
          sklad: data.sklad,
        });
        reset(createPosFormDefaultValues);
        onSuccess?.();
      }
    } catch (error) {
      console.error("Error creating/updating pos:", error);
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Помилка створення/оновлення позиції",
      });
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
      artData={artData}
      existingPos={existingPos}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

