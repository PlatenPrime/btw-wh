import { usePatchSkuSliceMutation } from "@/modules/skus/api/hooks/mutations/usePatchSkuSliceMutation";
import { useSkuSliceByDateQuery } from "@/modules/skus/api/hooks/queries/useSkuSliceByDateQuery";
import type { PatchSkuSliceBodyDto } from "@/modules/skus/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { PatchSkuSliceFormView } from "./PatchSkuSliceFormView";
import {
  DATE_API_FORMAT,
  DATE_PATTERN,
  patchSkuSliceFormSchema,
  type PatchSkuSliceFormData,
  type PatchSkuSliceFormInitialValues,
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
    periods: [{ dateFrom: "", dateTo: "" }],
    stock: Number.NaN,
    price: Number.NaN,
  };
}

function hasFinitePoint(
  values?: PatchSkuSliceFormInitialValues,
): values is PatchSkuSliceFormInitialValues & {
  stock: number;
  price: number;
} {
  return (
    values?.stock !== undefined &&
    Number.isFinite(values.stock) &&
    values?.price !== undefined &&
    Number.isFinite(values.price)
  );
}

function buildInitialFormData(
  initialValues?: PatchSkuSliceFormInitialValues,
): PatchSkuSliceFormData {
  const mode = initialValues?.mode ?? "date";
  const base = emptyValues(mode, initialValues?.date ?? todayDate());

  return {
    ...base,
    date: initialValues?.date ?? base.date,
    dateFrom: initialValues?.dateFrom ?? "",
    dateTo: initialValues?.dateTo ?? "",
    periods:
      initialValues?.periods && initialValues.periods.length > 0
        ? initialValues.periods.map((period) => ({
            dateFrom: period.dateFrom,
            dateTo: period.dateTo,
          }))
        : base.periods,
    stock: hasFinitePoint(initialValues) ? initialValues.stock : Number.NaN,
    price: hasFinitePoint(initialValues) ? initialValues.price : Number.NaN,
  };
}

function toDateRange(
  dateFrom: string,
  dateTo: string,
): DateRange | undefined {
  if (!dateFrom && !dateTo) return undefined;
  return {
    from: DATE_PATTERN.test(dateFrom)
      ? new Date(`${dateFrom}T00:00:00`)
      : undefined,
    to: DATE_PATTERN.test(dateTo)
      ? new Date(`${dateTo}T00:00:00`)
      : undefined,
  };
}

interface PatchSkuSliceFormProps {
  skuId: string;
  skuTitle: string;
  isActive: boolean;
  initialValues?: PatchSkuSliceFormInitialValues;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function PatchSkuSliceForm({
  skuId,
  skuTitle,
  isActive,
  initialValues,
  onSuccess,
  onCancel,
}: PatchSkuSliceFormProps) {
  const initialValuesRef = useRef(initialValues);
  initialValuesRef.current = initialValues;

  const form = useForm<PatchSkuSliceFormData>({
    resolver: zodResolver(patchSkuSliceFormSchema),
    defaultValues: buildInitialFormData(initialValues),
    mode: "onChange",
  });

  const mode = form.watch("mode");
  const date = form.watch("date");
  const dateFrom = form.watch("dateFrom");
  const dateTo = form.watch("dateTo");
  const periods = form.watch("periods");
  const isDateMode = mode === "date";
  const isDateValid = isDateMode && DATE_PATTERN.test(date);
  const [prefilledDate, setPrefilledDate] = useState<string | null>(null);
  const [skipPreviewPrefill, setSkipPreviewPrefill] = useState(() =>
    hasFinitePoint(initialValues),
  );
  const wasActiveRef = useRef(false);

  const previewQuery = useSkuSliceByDateQuery({
    skuId,
    date,
    enabled: isActive && isDateValid,
  });
  const patchMutation = usePatchSkuSliceMutation();

  useEffect(() => {
    if (isActive && !wasActiveRef.current) {
      const nextInitial = initialValuesRef.current;
      setPrefilledDate(null);
      setSkipPreviewPrefill(hasFinitePoint(nextInitial));
      form.reset(buildInitialFormData(nextInitial));
    }
    if (!isActive && wasActiveRef.current) {
      setPrefilledDate(null);
      setSkipPreviewPrefill(false);
      form.reset(emptyValues("date", todayDate()));
    }
    wasActiveRef.current = isActive;
  }, [isActive, form]);

  useEffect(() => {
    if (!isActive || !isDateMode) return;
    if (skipPreviewPrefill) {
      if (prefilledDate !== date) {
        setPrefilledDate(date);
      }
      return;
    }
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
    skipPreviewPrefill,
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
    !skipPreviewPrefill &&
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
        : data.mode === "period"
          ? {
              dateFrom: data.dateFrom,
              dateTo: data.dateTo,
              stock: data.stock,
              price: data.price,
            }
          : {
              periods: data.periods.map((period) => ({
                dateFrom: period.dateFrom,
                dateTo: period.dateTo,
              })),
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
    setSkipPreviewPrefill(false);
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
    setSkipPreviewPrefill(false);
    form.setValue("date", nextDate, { shouldValidate: true });
    form.setValue("stock", Number.NaN, { shouldValidate: true });
    form.setValue("price", Number.NaN, { shouldValidate: true });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    const nextFrom = range?.from ? format(range.from, DATE_API_FORMAT) : "";
    const nextTo = range?.to ? format(range.to, DATE_API_FORMAT) : "";
    form.setValue("dateFrom", nextFrom, { shouldValidate: true });
    form.setValue("dateTo", nextTo, { shouldValidate: true });
  };

  const handlePeriodRangeChange = (
    index: number,
    range: DateRange | undefined,
  ) => {
    const nextFrom = range?.from ? format(range.from, DATE_API_FORMAT) : "";
    const nextTo = range?.to ? format(range.to, DATE_API_FORMAT) : "";
    const nextPeriods = periods.map((period, periodIndex) =>
      periodIndex === index
        ? { dateFrom: nextFrom, dateTo: nextTo }
        : period,
    );
    form.setValue("periods", nextPeriods, { shouldValidate: true });
  };

  const handleAddPeriod = () => {
    form.setValue(
      "periods",
      [...periods, { dateFrom: "", dateTo: "" }],
      { shouldValidate: true },
    );
  };

  const handleRemovePeriod = (index: number) => {
    if (periods.length <= 1) {
      form.setValue("periods", [{ dateFrom: "", dateTo: "" }], {
        shouldValidate: true,
      });
      return;
    }
    form.setValue(
      "periods",
      periods.filter((_, periodIndex) => periodIndex !== index),
      { shouldValidate: true },
    );
  };

  const dateRange = toDateRange(dateFrom, dateTo);
  const periodRanges = periods.map((period) =>
    toDateRange(period.dateFrom, period.dateTo),
  );

  const currentPoint = isDateMode ? (previewQuery.data?.data ?? null) : null;
  const showMissingPointHint = isDateMode && isNotFound && !isPreviewLoading;

  return (
    <PatchSkuSliceFormView
      form={form}
      skuTitle={skuTitle}
      mode={mode}
      dateRange={dateRange}
      periodRanges={periodRanges}
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
      onPeriodRangeChange={handlePeriodRangeChange}
      onAddPeriod={handleAddPeriod}
      onRemovePeriod={handleRemovePeriod}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
