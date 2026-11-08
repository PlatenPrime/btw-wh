import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useCreateSkuStockBandMutation } from "@/modules/sku-stock-bands/api/hooks/mutations/useCreateSkuStockBandMutation";
import {
  createSkuStockBandDefaultValues,
  createSkuStockBandSchema,
  type CreateSkuStockBandFormValues,
} from "@/modules/sku-stock-bands/components/forms/schema";
import { CreateSkuStockBandFormView } from "@/modules/sku-stock-bands/components/forms/create-sku-stock-band-form/CreateSkuStockBandFormView";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CreateSkuStockBandFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateSkuStockBandForm({
  onSuccess,
  onCancel,
}: CreateSkuStockBandFormProps) {
  const form = useForm<CreateSkuStockBandFormValues>({
    resolver: zodResolver(createSkuStockBandSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: createSkuStockBandDefaultValues,
  });

  const konksQuery = useKonksQuery();
  const mutation = useCreateSkuStockBandMutation();

  const onSubmit = async (data: CreateSkuStockBandFormValues) => {
    try {
      await mutation.mutateAsync({
        konkName: data.konkName.trim().toLowerCase(),
        stockMin: data.stockMin,
        stockMax: data.stockMax,
        normalMax: data.normalMax,
      });
      onSuccess?.();
      form.reset(createSkuStockBandDefaultValues);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Помилка створення діапазону",
      });
    }
  };

  return (
    <CreateSkuStockBandFormView
      form={form}
      konks={konksQuery.data?.data ?? []}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
    />
  );
}
