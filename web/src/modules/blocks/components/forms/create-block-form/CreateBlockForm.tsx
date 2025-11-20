import { useCreateBlockMutation } from "@/modules/blocks/api/hooks/mutations/useCreateBlockMutation";
import type { CreateBlockFormValues } from "@/modules/blocks/components/forms/create-block-form/schema";
import {
  createBlockDefaultValues,
  createBlockSchema,
} from "@/modules/blocks/components/forms/create-block-form/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateBlockFormView } from "@/modules/blocks/components/forms/create-block-form/CreateBlockFormView";

interface CreateBlockFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateBlockForm({ onSuccess, onCancel }: CreateBlockFormProps) {
  const form = useForm<CreateBlockFormValues>({
    resolver: zodResolver(createBlockSchema),
    defaultValues: createBlockDefaultValues,
    mode: "onSubmit",
  });

  const createBlockMutation = useCreateBlockMutation();

  const handleSubmit = async (data: CreateBlockFormValues) => {
    try {
      await createBlockMutation.mutateAsync(data);
      onSuccess?.();
      form.reset(createBlockDefaultValues);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Не вдалося створити блок. Спробуйте ще раз.",
      });
    }
  };

  return (
    <CreateBlockFormView
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={createBlockMutation.isPending}
    />
  );
}

