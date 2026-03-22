import { useUpdateSkugrMutation } from "@/modules/skugrs/api/hooks/mutations/useUpdateSkugrMutation";
import type { SkugrPageDto, UpdateSkugrDto } from "@/modules/skugrs/api/types";
import { CreateSkugrFormView } from "@/modules/skugrs/components/forms/create-skugr-form/CreateSkugrFormView";
import {
  createSkugrFormSchema,
  type CreateSkugrFormData,
} from "@/modules/skugrs/components/forms/create-skugr-form/schema";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";

interface UpdateSkugrFormProps {
  skugr: SkugrPageDto;
  open: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdateSkugrForm({
  skugr,
  open,
  onSuccess,
  onCancel,
}: UpdateSkugrFormProps) {
  const form = useForm<CreateSkugrFormData>({
    resolver: zodResolver(createSkugrFormSchema) as Resolver<CreateSkugrFormData>,
    defaultValues: {
      konkName: skugr.konkName,
      prodName: skugr.prodName,
      title: skugr.title,
      url: skugr.url,
    },
    mode: "onChange",
  });

  const updateMutation = useUpdateSkugrMutation();
  const prodsQuery = useProdsQuery();
  const konksQuery = useKonksQuery();
  const prods = prodsQuery.data?.data ?? [];
  const konks = konksQuery.data?.data ?? [];

  useEffect(() => {
    if (!open) return;
    form.reset({
      konkName: skugr.konkName,
      prodName: skugr.prodName,
      title: skugr.title,
      url: skugr.url,
    });
  }, [
    open,
    skugr.konkName,
    skugr.prodName,
    skugr.title,
    skugr.url,
    skugr._id,
    form,
  ]);

  const onSubmit = async (data: CreateSkugrFormData) => {
    const title = data.title.trim();
    const url = data.url.trim();
    const payload: UpdateSkugrDto = {};

    if (data.konkName !== skugr.konkName) payload.konkName = data.konkName;
    if (data.prodName !== skugr.prodName) payload.prodName = data.prodName;
    if (title !== skugr.title) payload.title = title;
    if (url !== skugr.url) payload.url = url;

    if (Object.keys(payload).length === 0) {
      onSuccess?.();
      return;
    }

    try {
      await updateMutation.mutateAsync({ id: skugr._id, data: payload });
      onSuccess?.();
    } catch {
      // toast у мутації
    }
  };

  return (
    <CreateSkugrFormView
      form={form}
      isSubmitting={form.formState.isSubmitting || updateMutation.isPending}
      prods={prods}
      konks={konks}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitText="Зберегти"
    />
  );
}
