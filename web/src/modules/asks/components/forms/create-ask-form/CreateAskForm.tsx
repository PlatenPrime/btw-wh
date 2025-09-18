import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";
import { useCreateAskMutation } from "@/modules/asks/api/hooks/mutations/useCreateAskMutation";
import { CreateAskFormView } from "@/modules/asks/components/forms/create-ask-form/CreateAskFormView.tsx";
import {
  createAskFormDefaultValues,
  createAskFormSchema,
  type CreateAskFormData,
} from "@/modules/asks/components/forms/create-ask-form/schema.ts";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface CreateAskFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  preFilledArtikul?: string; // Предзаполненный артикул для страницы артикула
}

export function CreateAskForm({
  onSuccess,
  onCancel,
  preFilledArtikul,
}: CreateAskFormProps) {
  const { user } = useAuth();

  const form = useForm<CreateAskFormData>({
    resolver: zodResolver(createAskFormSchema),
    defaultValues: {
      ...createAskFormDefaultValues,
      artikul: preFilledArtikul || createAskFormDefaultValues.artikul,
    },
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    formState: { isSubmitting },
  } = form;
  const artikul = watch("artikul");

  const createAskMutation = useCreateAskMutation();

  // Поиск артикула при вводе 9 символов или если артикул предзаполнен
  const shouldSearchArt = artikul.length === 9;
  const { data: artData, isPending: isArtLoading } = useOneArtQuery(
    shouldSearchArt ? artikul : undefined,
  );

  // Сбрасываем данные артикула при изменении длины (когда пользователь редактирует)
  const [previousArtikulLength, setPreviousArtikulLength] = useState(0);
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

  // Обработчики для числовых полей
  const handleQuantChange = (value: string) => {
    // Убираем все нецифровые символы
    const numericValue = value.replace(/\D/g, "");

    // Если поле пустое, устанавливаем undefined
    if (numericValue === "") {
      setValue("quant", undefined, { shouldValidate: true });
      return;
    }

    // Конвертируем в число и устанавливаем
    const numValue = parseInt(numericValue, 10);
    setValue("quant", numValue, { shouldValidate: true });
  };

  const onSubmit = async (data: CreateAskFormData) => {
    if (!user) {
      console.error("User not found");
      return;
    }


    try {
      await createAskMutation.mutateAsync({
        artikul: data.artikul,
        nameukr: currentArtData?.nameukr,
        quant: data.quant,
        com: data.com,
        askerId: user._id,
      });
      onSuccess?.();
    } catch (error) {
      console.error("Error creating ask:", error);
      // Ошибка будет обработана в компоненте через formState
    }
  };

  // Обработка изменения артикула
  const handleArtikulChange = (value: string) => {
    setValue("artikul", value, { shouldValidate: true });
  };

  const isFormSubmitting = isSubmitting || createAskMutation.isPending;

  return (
    <CreateAskFormView
      form={form}
      artikul={artikul}
      onArtikulChange={handleArtikulChange}
      onQuantChange={handleQuantChange}
      isSubmitting={isFormSubmitting}
      isArtLoading={isArtLoading}
      artData={currentArtData}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isArtikulPreFilled={!!preFilledArtikul}
    />
  );
}
