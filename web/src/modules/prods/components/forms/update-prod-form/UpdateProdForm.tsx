import { useUpdateProdMutation } from "@/modules/prods/api/hooks/mutations/useUpdateProdMutation";
import type { ProdDto } from "@/modules/prods/api/types";
import {
  updateProdDefaultValues,
  updateProdSchema,
  type UpdateProdFormValues,
} from "@/modules/prods/components/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UpdateProdFormView } from "./UpdateProdFormView";

interface UpdateProdFormProps {
  prod: ProdDto;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdateProdForm({
  prod,
  onSuccess,
  onCancel,
}: UpdateProdFormProps) {
  const form = useForm<UpdateProdFormValues>({
    resolver: zodResolver(updateProdSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: updateProdDefaultValues,
  });

  const mutation = useUpdateProdMutation();
  const imageUrl = form.watch("imageUrl") ?? prod.imageUrl;

  useEffect(() => {
    form.reset({
      name: prod.name,
      title: prod.title,
      imageUrl: prod.imageUrl,
    });
  }, [prod, form]);

  const onSubmit = async (data: UpdateProdFormValues) => {
    try {
      await mutation.mutateAsync({ id: prod._id, data });
      onSuccess?.();
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка оновлення виробника",
      });
    }
  };

  return (
    <UpdateProdFormView
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
      imagePreviewUrl={imageUrl || undefined}
    />
  );
}
