import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";
import { useCreateAskMutation } from "@/modules/asks/api/hooks/mutations/useCreateAskMutation";
import type { CreateAskRequest } from "@/modules/asks/api/services/mutations/createAsk";
import {
  createAskFormDefaultValues,
  createAskFormSchema,
  type CreateAskFormData,
} from "@/modules/asks/components/forms/create-ask-form/schema";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import {
  artikulDigits,
  formatArtikulInput,
  isCompleteArtikul,
} from "@/utils/artikul-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateAskFormView } from "./CreateAskFormView";

interface CreateAskFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  preFilledArtikul?: string;
}

export function CreateAskForm({
  onSuccess,
  onCancel,
  preFilledArtikul,
}: CreateAskFormProps) {
  const { user } = useAuth();

  const form = useForm<CreateAskFormData>({
    resolver: zodResolver(createAskFormSchema),
    mode: "onChange",
    defaultValues: {
      ...createAskFormDefaultValues,
      artikul: preFilledArtikul || createAskFormDefaultValues.artikul,
    },
  });

  const {
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = form;
  const artikul = watch("artikul");

  // Синхронизируем preFilledArtikul при изменении
  useEffect(() => {
    if (preFilledArtikul && preFilledArtikul !== artikul) {
      setValue("artikul", preFilledArtikul, { shouldValidate: true });
    }
  }, [preFilledArtikul, setValue, artikul]);

  const createMutation = useCreateAskMutation();

  // Поиск при полных 8 цифрах (с дефисом или без mid-edit)
  const shouldSearchArt = isCompleteArtikul(artikul);
  const searchArtikul = shouldSearchArt
    ? formatArtikulInput(artikul)
    : undefined;
  const artQuery = useOneArtQuery(searchArtikul);
  const artData = artQuery.data?.data || undefined;
  const isArtLoading = artQuery.isPending;

  const artikulDigitCount = artikulDigits(artikul).length;
  const [previousArtikulDigitCount, setPreviousArtikulDigitCount] = useState(
    artikulDigitCount,
  );
  const [currentArtData, setCurrentArtData] = useState(artData);

  useEffect(() => {
    if (shouldSearchArt && artData) {
      setCurrentArtData(artData);
    } else if (!shouldSearchArt) {
      setCurrentArtData(undefined);
    }

    if (
      artikulDigitCount < previousArtikulDigitCount &&
      artikulDigitCount < 8
    ) {
      setCurrentArtData(undefined);
    }

    setPreviousArtikulDigitCount(artikulDigitCount);
  }, [
    artikulDigitCount,
    artData,
    previousArtikulDigitCount,
    shouldSearchArt,
  ]);

  // Обработка изменения артикула
  const handleArtikulChange = (value: string) => {
    setValue("artikul", value, { shouldValidate: true });
  };

  const onSubmit = async (data: CreateAskFormData) => {
    if (!user?._id) {
      form.setError("root", {
        message: "Користувач не знайдений. Будь ласка, увійдіть в систему.",
      });
      return;
    }

    try {
      const createData: CreateAskRequest = {
        artikul: formatArtikulInput(data.artikul.trim()),
        nameukr: currentArtData?.nameukr,
        quant: data.quant && data.quant.trim() ? Number(data.quant) : undefined,
        com: data.com && data.com.trim() ? data.com.trim() : undefined,
        sklad: data.sklad,
        zone: currentArtData?.zone,
        askerId: user._id,
      };

      await createMutation.mutateAsync(createData);
      onSuccess?.();
      reset({
        ...createAskFormDefaultValues,
        artikul: preFilledArtikul || createAskFormDefaultValues.artikul,
      });
    } catch (error) {
      console.error("Помилка створення запиту:", error);
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка створення запиту",
      });
    }
  };

  const isFormSubmitting = isSubmitting || createMutation.isPending;

  return (
    <CreateAskFormView
      form={form}
      artikul={artikul}
      onArtikulChange={handleArtikulChange}
      isSubmitting={isFormSubmitting}
      isArtLoading={isArtLoading}
      artData={currentArtData}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
