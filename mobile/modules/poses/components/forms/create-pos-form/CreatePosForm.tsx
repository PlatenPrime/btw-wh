import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IPallet } from "@/modules/pallets/api/types";
import type { IPos } from "@/modules/poses/api/types";
import { useCreatePosMutation } from "@/modules/poses/api/hooks/mutations/useCreatePosMutation";
import { useUpdatePosMutation } from "@/modules/poses/api/hooks/mutations/useUpdatePosMutation";
import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";
import {
  createPosFormDefaultValues,
  createPosFormSchema,
  type CreatePosFormData,
} from "./schema";
import { CreatePosFormView } from "./CreatePosFormView";

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

  // Поиск артикула при вводе 9 символов
  const shouldSearchArt = artikul.length === 9;
  const artQuery = useOneArtQuery(shouldSearchArt ? artikul : undefined);
  const artData = artQuery.data?.data || undefined;
  const isArtLoading = artQuery.isPending;

  // Поиск существующей позиции с таким же артикулом
  const existingPos = pallet.poses.find(
    (pos) => pos.artikul === artikul && pos.sklad === watch("sklad"),
  );

  // Используем useUpdatePosMutation только если есть existingPos
  // Создаем минимальный IPos для хука, если existingPos отсутствует
  const posForMutation: IPos = existingPos || ({
    _id: "",
    pallet: pallet._id,
    row: pallet.row,
    palletData: { _id: pallet._id, title: pallet.title },
    rowData: { _id: pallet.rowData._id, title: pallet.rowData.title },
    palletTitle: pallet.title,
    rowTitle: pallet.rowData.title,
    artikul: "",
    quant: 0,
    boxes: 0,
    sklad: watch("sklad"),
    comment: "",
  } as IPos);

  const updatePosMutation = useUpdatePosMutation(posForMutation);

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
          nameukr: artData?.nameukr,
          quant: data.quant,
          boxes: data.boxes,
          sklad: data.sklad,
        });
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
      hideActions={true}
    />
  );
}

