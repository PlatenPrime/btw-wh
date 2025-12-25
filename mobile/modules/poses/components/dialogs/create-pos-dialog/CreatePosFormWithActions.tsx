import { FormDialog } from "@/components/shared/form-dialog";
import { CreatePosFormView } from "@/modules/poses/components/forms/create-pos-form/CreatePosFormView";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPosFormDefaultValues,
  createPosFormSchema,
  type CreatePosFormData,
} from "@/modules/poses/components/forms/create-pos-form/schema";
import { useCreatePosMutation } from "@/modules/poses/api/hooks/mutations/useCreatePosMutation";
import { useUpdatePosMutation } from "@/modules/poses/api/hooks/mutations/useUpdatePosMutation";
import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";
import type { IPallet } from "@/modules/pallets/api/types";
import type { IPos } from "@/modules/poses/api/types";
import { Button, HStack, Text } from "@/components/ui";
import { ActivityIndicator } from "react-native";
import { SemanticColors } from "@/constants/theme";

interface CreatePosFormWithActionsProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  pallet: IPallet;
}

export function CreatePosFormWithActions({
  visible,
  onClose,
  onSuccess,
  pallet,
}: CreatePosFormWithActionsProps) {
  const form = useForm<CreatePosFormData>({
    resolver: zodResolver(createPosFormSchema),
    defaultValues: createPosFormDefaultValues,
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const artikul = watch("artikul");

  const createPosMutation = useCreatePosMutation(pallet);

  const shouldSearchArt = artikul.length === 9;
  const artQuery = useOneArtQuery(shouldSearchArt ? artikul : undefined);
  const artData = artQuery.data?.data || undefined;
  const isArtLoading = artQuery.isPending;

  const existingPos = pallet.poses.find(
    (pos) => pos.artikul === artikul && pos.sklad === watch("sklad"),
  );

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

  const handleQuantChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue === "") {
      setValue("quant", 0, { shouldValidate: true });
      return;
    }
    const numValue = parseInt(numericValue, 10);
    setValue("quant", numValue, { shouldValidate: true });
  };

  const handleBoxesChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue === "") {
      setValue("boxes", 0, { shouldValidate: true });
      return;
    }
    const numValue = parseInt(numericValue, 10);
    setValue("boxes", numValue, { shouldValidate: true });
  };

  const handleArtikulChange = (value: string) => {
    setValue("artikul", value, { shouldValidate: true });
  };

  const onSubmit = async (data: CreatePosFormData) => {
    if (createPosMutation.isPending || updatePosMutation.isPending || isSubmitting) {
      return;
    }

    try {
      if (existingPos) {
        await updatePosMutation.mutateAsync({
          id: existingPos._id,
          data: {
            quant: existingPos.quant + data.quant,
            boxes: existingPos.boxes + data.boxes,
          },
        });
        onSuccess();
      } else {
        await createPosMutation.mutateAsync({
          palletId: pallet._id,
          rowId: pallet.row,
          artikul: data.artikul,
          nameukr: artData?.nameukr,
          quant: data.quant,
          boxes: data.boxes,
          sklad: data.sklad,
        });
        onSuccess();
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

  const isFormSubmitting = isSubmitting || createPosMutation.isPending || updatePosMutation.isPending;
  
  const watchedValues = watch();
  const isFormValid =
    artikul.trim().length === 9 &&
    /^\d{4}-\d{4}$/.test(artikul.trim()) &&
    typeof watchedValues.quant === "number" &&
    watchedValues.quant > 0 &&
    typeof watchedValues.boxes === "number" &&
    watchedValues.boxes > 0 &&
    watchedValues.sklad &&
    watchedValues.sklad.length > 0;

  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Створити нову позицію"
      footer={
        <HStack className="gap-2">
          <Button
            onPress={onClose}
            disabled={isFormSubmitting}
            variant="outline"
            className="flex-1"
          >
            <Text className="font-semibold">Скасувати</Text>
          </Button>
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isFormSubmitting || !isFormValid}
            className="flex-1"
          >
            {isFormSubmitting ? (
              <ActivityIndicator color={SemanticColors.white} />
            ) : (
              <Text className="text-white font-semibold">Створити</Text>
            )}
          </Button>
        </HStack>
      }
    >
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
        onCancel={onClose}
        hideActions={true}
      />
    </FormDialog>
  );
}

