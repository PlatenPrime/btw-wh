import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";
import { useCreateAskMutation } from "@/modules/asks/api/hooks/mutations/useCreateAskMutation";
import type { CreateAskRequest } from "@/modules/asks/api/services/mutations/createAsk";
import {
  createAskFormDefaultValues,
  createAskFormSchema,
  type CreateAskFormData,
} from "@/modules/asks/components/forms/create-ask-form/schema";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
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

  // Поиск артикула при вводе 9 символов или если артикул предзаполнен
  const shouldSearchArt = artikul.length === 9;
  const artQuery = useOneArtQuery(shouldSearchArt ? artikul : undefined);
  const artData = artQuery.data?.data || undefined;
  const isArtLoading = artQuery.isPending;

  // Сбрасываем данные артикула при изменении длины (когда пользователь редактирует)
  const [previousArtikulLength, setPreviousArtikulLength] = useState(
    artikul.length
  );
  const [currentArtData, setCurrentArtData] = useState(artData);

  // Обновляем текущие данные артикула только если артикул изменился
  useEffect(() => {
    if (artikul.length === 9 && artData) {
      setCurrentArtData(artData);
    } else if (artikul.length !== 9) {
      setCurrentArtData(undefined);
    }

    // Если длина изменилась и стала меньше 9, сбрасываем данные
    if (artikul.length < previousArtikulLength && artikul.length < 9) {
      setCurrentArtData(undefined);
    }

    setPreviousArtikulLength(artikul.length);
  }, [artikul.length, artData, previousArtikulLength]);

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
        artikul: data.artikul.trim(),
        nameukr: currentArtData?.nameukr,
        quant: data.quant && data.quant.trim() ? Number(data.quant) : undefined,
        com: data.com && data.com.trim() ? data.com.trim() : undefined,
        sklad: data.sklad,
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
