import { usePatchSkuSliceMutation } from "@/modules/skus/api/hooks/mutations/usePatchSkuSliceMutation";
import { useSkuSliceByDateQuery } from "@/modules/skus/api/hooks/queries/useSkuSliceByDateQuery";
import type { PatchSkuSliceBodyDto } from "@/modules/skus/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { PatchSkuSliceFormView } from "./PatchSkuSliceFormView";
import {
  DATE_API_FORMAT,
  DATE_PATTERN,
  patchSkuSliceFormSchema,
  type PatchSkuSliceFormData,
  type PatchSkuSliceFormMode,
} from "./schema";

function todayDate(): string {
  return format(new Date(), DATE_API_FORMAT);
}

function emptyValues(
  mode: PatchSkuSliceFormMode,
  date: string,
): PatchSkuSliceFormData {
  return {
    mode,
    date,
    dateFrom: "",
    dateTo: "",
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
    defaultValues: emptyValues("date", todayDate()),
    mode: "onChange",
  });

  const mode = form.watch("mode");
  const date = form.watch("date");
  const dateFrom = form.watch("dateFrom");
  const dateTo = form.watch("dateTo");
  const isDateMode = mode === "date";
  const isDateValid = isDateMode && DATE_PATTERN.test(date);
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
    form.reset(emptyValues("date", todayDate()));
  }, [isActive, form]);

  useEffect(() => {
    if (!isActive || !isDateMode) return;
    const point = previewQuery.data?.data;
    if (!point) return;
    if (prefilledDate === date) return;
    form.setValue("stock", point.stock, { shouldValidate: true });
    form.setValue("price", point.price, { shouldValidate: true });
    setPrefilledDate(date);
  }, [
    isActive,
    isDateMode,
    date,
    prefilledDate,
    previewQuery.data,
    form,
  ]);

  const isNotFound =
    isDateMode &&
    axios.isAxiosError(previewQuery.error) &&
    previewQuery.error.response?.status === 404;

  const previewErrorMessage =
    isDateMode && previewQuery.isError && !isNotFound
      ? "Не вдалося завантажити точку. Спробуйте пізніше"
      : null;

  const hasPreview =
    isDateMode && Boolean(previewQuery.data?.data) && !previewQuery.isError;
  const isPreviewLoading =
    isDateMode &&
    isDateValid &&
    !isNotFound &&
    !previewErrorMessage &&
    (previewQuery.isPending || (hasPreview && prefilledDate !== date));

  const isSubmitting = patchMutation.isPending || form.formState.isSubmitting;
  const isSubmitDisabled =
    isSubmitting ||
    Boolean(previewErrorMessage) ||
    (isDateMode && isPreviewLoading) ||
    !form.formState.isValid;

  const onSubmit = async (data: PatchSkuSliceFormData) => {
    if (isSubmitDisabled || patchMutation.isPending) return;

    const body: PatchSkuSliceBodyDto =
      data.mode === "date"
        ? {
            date: data.date,
            stock: data.stock,
            price: data.price,
          }
        : {
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            stock: data.stock,
            price: data.price,
          };

    try {
      await patchMutation.mutateAsync({ skuId, body });
      onSuccess?.();
    } catch {
      // toast in mutation
    }
  };

  const handleModeChange = (nextMode: PatchSkuSliceFormMode) => {
    if (nextMode === mode) return;
    setPrefilledDate(null);
    const stock = form.getValues("stock");
    const price = form.getValues("price");
    form.reset({
      ...emptyValues(nextMode, todayDate()),
      stock: Number.isFinite(stock) ? stock : Number.NaN,
      price: Number.isFinite(price) ? price : Number.NaN,
    });
  };

  const handleDateChange = (nextDate: string) => {
    setPrefilledDate(null);
    form.setValue("date", nextDate, { shouldValidate: true });
    form.setValue("stock", Number.NaN, { shouldValidate: true });
    form.setValue("price", Number.NaN, { shouldValidate: true });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    const nextFrom = range?.from
      ? format(range.from, DATE_API_FORMAT)
      : "";
    const nextTo = range?.to ? format(range.to, DATE_API_FORMAT) : "";
    form.setValue("dateFrom", nextFrom, { shouldValidate: true });
    form.setValue("dateTo", nextTo, { shouldValidate: true });
  };

  const dateRange: DateRange | undefined =
    dateFrom || dateTo
      ? {
          from: DATE_PATTERN.test(dateFrom)
            ? new Date(`${dateFrom}T00:00:00`)
            : undefined,
          to: DATE_PATTERN.test(dateTo)
            ? new Date(`${dateTo}T00:00:00`)
            : undefined,
        }
      : undefined;

  const currentPoint = isDateMode ? (previewQuery.data?.data ?? null) : null;
  const showMissingPointHint = isDateMode && isNotFound && !isPreviewLoading;

  return (
    <PatchSkuSliceFormView
      form={form}
      skuTitle={skuTitle}
      mode={mode}
      dateRange={dateRange}
      isPreviewLoading={isPreviewLoading}
      showMissingPointHint={showMissingPointHint}
      previewErrorMessage={previewErrorMessage}
      currentStock={currentPoint?.stock ?? null}
      currentPrice={currentPoint?.price ?? null}
      isSubmitting={isSubmitting}
      isSubmitDisabled={isSubmitDisabled}
      onModeChange={handleModeChange}
      onDateChange={handleDateChange}
      onDateRangeChange={handleDateRangeChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
