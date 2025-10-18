import { useCreateRowMutation } from "@/modules/rows/api/hooks/mutations/useCreateRowMutation";
import type { CreateRowDto } from "@/modules/rows/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { rowSchema, type RowFormValues } from "@/modules/rows/components/forms/schema.ts";
import { CreateRowFormView } from "@/modules/rows/components/forms/create-row-form/CreateRowFormView.tsx";

interface CreateRowFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateRowForm({ onSuccess, onCancel }: CreateRowFormProps) {
  const form = useForm<RowFormValues>({
    resolver: zodResolver(rowSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
    },
  });

  const createMutation = useCreateRowMutation();
  const isSubmitting = createMutation.isPending;

  const onSubmit = async (data: RowFormValues) => {
    try {
      const createData: CreateRowDto = { title: data.title.trim() };
      await createMutation.mutateAsync(createData);
      onSuccess?.();
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Помилка створення ряду:", error);
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка створення ряду",
      });
    }
  };

  return (
    <CreateRowFormView
      form={form}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
