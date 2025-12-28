import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAskMutation } from "@/modules/asks/api/hooks/mutations/useCreateAskMutation";
import type { CreateAskRequest } from "@/modules/asks/api/services/mutations/createAsk";
import {
  createAskFormSchema,
  createAskFormDefaultValues,
  type CreateAskFormData,
} from "@/modules/asks/components/forms/create-ask-form/schema";
import { CreateAskFormView } from "./CreateAskFormView";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";

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
  const form = useForm<CreateAskFormData>({
    resolver: zodResolver(createAskFormSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      ...createAskFormDefaultValues,
      artikul: preFilledArtikul || createAskFormDefaultValues.artikul,
    },
  });

  const {
    watch,
    setValue,
    formState: { isSubmitting },
  } = form;
  const artikul = watch("artikul");

  const createMutation = useCreateAskMutation();
  const isFormSubmitting = createMutation.isPending || isSubmitting;
  const { user } = useAuth();

  // Поиск артикула при вводе 9 символов
  const shouldSearchArt = artikul.length === 9;
  const artQuery = useOneArtQuery(shouldSearchArt ? artikul : undefined);
  const artData = artQuery.data?.data || undefined;
  const isArtLoading = artQuery.isPending;

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
        nameukr: artData?.nameukr,
        quant: data.quant && data.quant.trim() ? Number(data.quant) : undefined,
        com: data.com && data.com.trim() ? data.com.trim() : undefined,
        sklad: data.sklad,
        askerId: user._id,
      };

      await createMutation.mutateAsync(createData);
      onSuccess?.();
      form.reset();
    } catch (error) {
      console.error("Помилка створення запиту:", error);
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка створення запиту",
      });
    }
  };

  return (
    <CreateAskFormView
      form={form}
      artikul={artikul}
      onArtikulChange={handleArtikulChange}
      isSubmitting={isFormSubmitting}
      isArtLoading={isArtLoading}
      artData={artData}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

