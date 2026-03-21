import { useCreateSkugrMutation } from "@/modules/skugrs/api/hooks/mutations/useCreateSkugrMutation";
import {
  createSkugrFormDefaultValues,
  createSkugrFormSchema,
  type CreateSkugrFormData,
} from "@/modules/skugrs/components/forms/create-skugr-form/schema";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { CreateSkugrFormView } from "./CreateSkugrFormView";

interface CreateSkugrFormProps {
  onSuccess?: (id: string) => void;
  onCancel?: () => void;
}

export function CreateSkugrForm({ onSuccess, onCancel }: CreateSkugrFormProps) {
  const form = useForm<CreateSkugrFormData>({
    resolver: zodResolver(createSkugrFormSchema) as Resolver<CreateSkugrFormData>,
    defaultValues: createSkugrFormDefaultValues,
    mode: "onChange",
  });

  const createMutation = useCreateSkugrMutation();
  const prodsQuery = useProdsQuery();
  const konksQuery = useKonksQuery();
  const prods = prodsQuery.data?.data ?? [];
  const konks = konksQuery.data?.data ?? [];

  const onSubmit = async (data: CreateSkugrFormData) => {
    try {
      const res = await createMutation.mutateAsync({
        konkName: data.konkName,
        prodName: data.prodName,
        title: data.title.trim(),
        url: data.url.trim(),
        skus: [],
      });
      form.reset(createSkugrFormDefaultValues);
      onSuccess?.(res.data._id);
    } catch {
      // toast у мутації
    }
  };

  return (
    <CreateSkugrFormView
      form={form}
      isSubmitting={form.formState.isSubmitting || createMutation.isPending}
      prods={prods}
      konks={konks}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
