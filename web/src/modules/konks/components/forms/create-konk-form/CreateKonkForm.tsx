import { useCreateKonkMutation } from "@/modules/konks/api/hooks/mutations/useCreateKonkMutation";
import {
  createKonkDefaultValues,
  createKonkSchema,
  type CreateKonkFormValues,
} from "@/modules/konks/components/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateKonkFormView } from "./CreateKonkFormView";

interface CreateKonkFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateKonkForm({ onSuccess, onCancel }: CreateKonkFormProps) {
  const form = useForm<CreateKonkFormValues>({
    resolver: zodResolver(createKonkSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: createKonkDefaultValues,
  });

  const mutation = useCreateKonkMutation();
  const imageUrl = form.watch("imageUrl");

  const onSubmit = async (data: CreateKonkFormValues) => {
    try {
      await mutation.mutateAsync(data);
      onSuccess?.();
      form.reset(createKonkDefaultValues);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Помилка створення конкурента",
      });
    }
  };

  return (
    <CreateKonkFormView
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
      imagePreviewUrl={imageUrl || undefined}
    />
  );
}
