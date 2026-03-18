import { useCreateVariantMutation } from "@/modules/variants/api/hooks/mutations/useCreateVariantMutation";
import type { CreateVariantDto } from "@/modules/variants/api/types";
import type { CreateVariantFormData } from "./schema";
import {
  createVariantFormDefaultValues,
  createVariantFormSchema,
} from "./schema";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { CreateVariantFormView } from "./CreateVariantFormView";

interface CreateVariantFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateVariantForm({ onSuccess, onCancel }: CreateVariantFormProps) {
  const form = useForm<CreateVariantFormData>({
    resolver: zodResolver(createVariantFormSchema) as Resolver<CreateVariantFormData>,
    defaultValues: createVariantFormDefaultValues,
    mode: "onChange",
  });

  const createMutation = useCreateVariantMutation();
  const prodsQuery = useProdsQuery();
  const konksQuery = useKonksQuery();

  const prods = prodsQuery.data?.data ?? [];
  const konks = konksQuery.data?.data ?? [];

  const onSubmit = async (data: CreateVariantFormData) => {
    try {
      const payload: CreateVariantDto = {
        konkName: data.konkName,
        prodName: data.prodName,
        title: data.title.trim(),
        url: data.url,
        imageUrl: data.imageUrl,
      };

      await createMutation.mutateAsync(payload);
      form.reset(createVariantFormDefaultValues);
      onSuccess?.();
    } catch {
      // toast handled in mutation
    }
  };

  return (
    <CreateVariantFormView
      form={form}
      konks={konks}
      prods={prods}
      isSubmitting={form.formState.isSubmitting || createMutation.isPending}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

