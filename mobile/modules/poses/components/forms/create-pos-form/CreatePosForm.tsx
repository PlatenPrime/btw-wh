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
import {
  formatArtikulInput,
  isCompleteArtikul,
} from "@/utils/artikul-input";
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

  const shouldSearchArt = isCompleteArtikul(artikul);
  const searchArtikul = shouldSearchArt
    ? formatArtikulInput(artikul)
    : undefined;
  const artQuery = useOneArtQuery(searchArtikul);
  const artData = artQuery.data?.data;
  const isArtLoading = artQuery.isPending;

  const existingPos = pallet.poses.find(
    (pos) =>
      pos.artikul === formatArtikulInput(artikul) &&
      pos.sklad === watch("sklad"),
  );

  const handleQuantChange = (value: string) => {
    if (value === "" || value === "-") {
      setValue("quant", 0, { shouldValidate: true });
      return;
    }
    const numValue = Number.parseInt(value, 10);
    if (!Number.isNaN(numValue)) {
      setValue("quant", numValue, { shouldValidate: true });
    }
  };

  const handleBoxesChange = (value: string) => {
    if (value === "" || value === "-") {
      setValue("boxes", 0, { shouldValidate: true });
      return;
    }
    const numValue = Number.parseInt(value, 10);
    if (!Number.isNaN(numValue)) {
      setValue("boxes", numValue, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: CreatePosFormData) => {
    if (
      createPosMutation.isPending ||
      updatePosMutation.isPending ||
      isSubmitting
    ) {
      return;
    }

    const formattedArtikul = formatArtikulInput(data.artikul);

    try {
      if (existingPos) {
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
        await createPosMutation.mutateAsync({
          palletId: pallet._id,
          rowId: pallet.row,
          artikul: formattedArtikul,
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
      artData={artData ?? undefined}
      existingPos={existingPos}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
