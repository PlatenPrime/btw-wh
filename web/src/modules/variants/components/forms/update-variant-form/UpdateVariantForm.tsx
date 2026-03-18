import { useUpdateVariantMutation } from "@/modules/variants/api/hooks/mutations/useUpdateVariantMutation";
import type {
  UpdateVariantDto,
  VariantDto,
} from "@/modules/variants/api/types";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UpdateVariantFormView } from "./UpdateVariantFormView";
import {
  updateVariantFormSchema,
  type UpdateVariantFormData,
} from "./schema";

interface UpdateVariantFormProps {
  variant: VariantDto;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdateVariantForm({
  variant,
  onSuccess,
  onCancel,
}: UpdateVariantFormProps) {
  const form = useForm<UpdateVariantFormData>({
    resolver: zodResolver(updateVariantFormSchema),
    defaultValues: {
      konkName: variant.konkName,
      prodName: variant.prodName,
      title: variant.title,
      url: variant.url,
      imageUrl: variant.imageUrl,
    },
    mode: "onChange",
  });

  const updateMutation = useUpdateVariantMutation();
  const prodsQuery = useProdsQuery();
  const konksQuery = useKonksQuery();

  const prods = prodsQuery.data?.data ?? [];
  const konks = konksQuery.data?.data ?? [];

  useEffect(() => {
    form.reset({
      konkName: variant.konkName,
      prodName: variant.prodName,
      title: variant.title,
      url: variant.url,
      imageUrl: variant.imageUrl,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant._id]);

  const onSubmit = async (data: UpdateVariantFormData) => {
    const payload: UpdateVariantDto = {};

    if (data.konkName != null && data.konkName !== variant.konkName) payload.konkName = data.konkName;
    if (data.prodName != null && data.prodName !== variant.prodName) payload.prodName = data.prodName;
    if (data.title != null && data.title !== variant.title) payload.title = data.title;
    if (data.url != null && data.url !== variant.url) payload.url = data.url;
    if (data.imageUrl != null && data.imageUrl !== variant.imageUrl) {
      payload.imageUrl = data.imageUrl;
    }

    if (Object.keys(payload).length === 0) {
      onSuccess?.();
      return;
    }

    try {
      await updateMutation.mutateAsync({ id: variant._id, data: payload });
      onSuccess?.();
    } catch {
      // toast in mutation
    }
  };

  return (
    <UpdateVariantFormView
      form={form}
      konks={konks}
      prods={prods}
      isSubmitting={form.formState.isSubmitting || updateMutation.isPending}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

