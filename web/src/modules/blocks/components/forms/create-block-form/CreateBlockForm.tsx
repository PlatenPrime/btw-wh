import { useCreateBlockMutation } from "@/modules/blocks/api/hooks/mutations/useCreateBlockMutation";
import {
  createBlockDefaultValues,
  createBlockSchema,
  type CreateBlockFormValues,
} from "@/modules/blocks/components/forms/create-block-form/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateBlockFormView } from "./CreateBlockFormView";

interface CreateBlockFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateBlockForm({ onSuccess, onCancel }: CreateBlockFormProps) {
  const form = useForm<CreateBlockFormValues>({
    resolver: zodResolver(createBlockSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: createBlockDefaultValues,
  });

  const mutation = useCreateBlockMutation();

  const onSubmit = async (data: CreateBlockFormValues) => {
    try {
      await mutation.mutateAsync(data);
      onSuccess?.();
      form.reset();
    } catch (error) {
      console.error("Помилка створення блоку:", error);
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка створення блоку",
      });
    }
  };

  return (
    <CreateBlockFormView
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
    />
  );
}

