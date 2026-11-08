import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useUpdateSkuStockBandMutation } from "@/modules/sku-stock-bands/api/hooks/mutations/useUpdateSkuStockBandMutation";
import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import {
  updateSkuStockBandSchema,
  type UpdateSkuStockBandFormValues,
} from "@/modules/sku-stock-bands/components/forms/schema";
import { UpdateSkuStockBandFormView } from "@/modules/sku-stock-bands/components/forms/update-sku-stock-band-form/UpdateSkuStockBandFormView";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UpdateSkuStockBandFormProps {
  band: SkuStockBandDto;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdateSkuStockBandForm({
  band,
  onSuccess,
  onCancel,
}: UpdateSkuStockBandFormProps) {
  const form = useForm<UpdateSkuStockBandFormValues>({
    resolver: zodResolver(updateSkuStockBandSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      konkName: band.konk.name,
      stockMin: band.stockMin,
      stockMax: band.stockMax,
      normalMax: band.normalMax,
    },
  });

  const konksQuery = useKonksQuery();
  const mutation = useUpdateSkuStockBandMutation();

  useEffect(() => {
    form.reset({
      konkName: band.konk.name,
      stockMin: band.stockMin,
      stockMax: band.stockMax,
      normalMax: band.normalMax,
    });
  }, [band, form]);

  const onSubmit = async (data: UpdateSkuStockBandFormValues) => {
    try {
      await mutation.mutateAsync({
        id: band._id,
        data: {
          konkName: data.konkName.trim().toLowerCase(),
          stockMin: data.stockMin,
          stockMax: data.stockMax,
          normalMax: data.normalMax,
        },
      });
      onSuccess?.();
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Помилка оновлення діапазону",
      });
    }
  };

  return (
    <UpdateSkuStockBandFormView
      form={form}
      konks={konksQuery.data?.data ?? []}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
    />
  );
}
