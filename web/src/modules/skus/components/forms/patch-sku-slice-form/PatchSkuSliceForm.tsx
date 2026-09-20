import { usePatchSkuSliceMutation } from "@/modules/skus/api/hooks/mutations/usePatchSkuSliceMutation";
import { useSkuSliceByDateQuery } from "@/modules/skus/api/hooks/queries/useSkuSliceByDateQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PatchSkuSliceFormView } from "./PatchSkuSliceFormView";
import {
  patchSkuSliceFormSchema,
  type PatchSkuSliceFormData,
} from "./schema";

const DATE_API_FORMAT = "yyyy-MM-dd";
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function todayDate(): string {
  return format(new Date(), DATE_API_FORMAT);
}

function emptyValues(date: string): PatchSkuSliceFormData {
  return {
    date,
    stock: Number.NaN,
    price: Number.NaN,
  };
}

interface PatchSkuSliceFormProps {
  skuId: string;
  skuTitle: string;
  isActive: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function PatchSkuSliceForm({
  skuId,
  skuTitle,
  isActive,
  onSuccess,
  onCancel,
}: PatchSkuSliceFormProps) {
  const form = useForm<PatchSkuSliceFormData>({
    resolver: zodResolver(patchSkuSliceFormSchema),
    defaultValues: emptyValues(todayDate()),
    mode: "onChange",
  });

  const date = form.watch("date");
  const isDateValid = DATE_PATTERN.test(date);
  const [prefilledDate, setPrefilledDate] = useState<string | null>(null);

  const previewQuery = useSkuSliceByDateQuery({
    skuId,
    date,
    enabled: isActive && isDateValid,
  });
  const patchMutation = usePatchSkuSliceMutation();

  useEffect(() => {
    if (isActive) return;
    setPrefilledDate(null);
    form.reset(emptyValues(todayDate()));
  }, [isActive, form]);

  useEffect(() => {
    if (!isActive) return;
    const point = previewQuery.data?.data;
    if (!point) return;
    if (prefilledDate === date) return;
    form.setValue("stock", point.stock, { shouldValidate: true });
    form.setValue("price", point.price, { shouldValidate: true });
    setPrefilledDate(date);
  }, [isActive, date, prefilledDate, previewQuery.data, form]);

  const isNotFound =
    axios.isAxiosError(previewQuery.error) &&
    previewQuery.error.response?.status === 404;

  const previewErrorMessage =
    previewQuery.isError && !isNotFound
      ? "Не вдалося завантажити точку. Спробуйте пізніше"
      : null;

  const hasPreview = Boolean(previewQuery.data?.data) && !previewQuery.isError;
  const isPreviewLoading =
    isDateValid &&
    !isNotFound &&
    !previewErrorMessage &&
    (previewQuery.isPending || (hasPreview && prefilledDate !== date));
  const isSubmitting = patchMutation.isPending || form.formState.isSubmitting;
  const isSubmitDisabled =
    isSubmitting ||
    isPreviewLoading ||
    !hasPreview ||
    isNotFound ||
    Boolean(previewErrorMessage) ||
    !form.formState.isValid;

  const onSubmit = async (data: PatchSkuSliceFormData) => {
    if (isSubmitDisabled || patchMutation.isPending) return;
    try {
      await patchMutation.mutateAsync({
        skuId,
        body: {
          date: data.date,
          stock: data.stock,
          price: data.price,
        },
      });
      onSuccess?.();
    } catch {
      // toast in mutation
    }
  };

  const handleDateChange = (nextDate: string) => {
    setPrefilledDate(null);
    form.reset(emptyValues(nextDate));
  };

  const currentPoint = previewQuery.data?.data ?? null;

  return (
    <PatchSkuSliceFormView
      form={form}
      skuTitle={skuTitle}
      isPreviewLoading={isPreviewLoading}
      isNotFound={isNotFound}
      previewErrorMessage={previewErrorMessage}
      currentStock={currentPoint?.stock ?? null}
      currentPrice={currentPoint?.price ?? null}
      isSubmitting={isSubmitting}
      isSubmitDisabled={isSubmitDisabled}
      onDateChange={handleDateChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
