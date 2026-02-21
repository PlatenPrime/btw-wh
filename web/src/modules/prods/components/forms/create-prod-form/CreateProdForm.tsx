import { useCreateProdMutation } from "@/modules/prods/api/hooks/mutations/useCreateProdMutation";
import {
  createProdDefaultValues,
  createProdSchema,
  type CreateProdFormValues,
} from "@/modules/prods/components/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateProdFormView } from "./CreateProdFormView";

interface CreateProdFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateProdForm({ onSuccess, onCancel }: CreateProdFormProps) {
  const form = useForm<CreateProdFormValues>({
    resolver: zodResolver(createProdSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: createProdDefaultValues,
  });

  const mutation = useCreateProdMutation();
  const imageUrl = form.watch("imageUrl");

  const onSubmit = async (data: CreateProdFormValues) => {
    try {
      await mutation.mutateAsync(data);
      onSuccess?.();
      form.reset(createProdDefaultValues);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка створення виробника",
      });
    }
  };

  return (
    <CreateProdFormView
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
      imagePreviewUrl={imageUrl || undefined}
    />
  );
}
