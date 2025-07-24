import { useCreateRowMutation } from "@/modules/rows/api/hooks/useCreateRowMutation";
import type { CreateRowDto } from "@/modules/rows/api/types/dto";
import { useState } from "react";
import { CreateRowFormView } from "./view";

interface CreateRowFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateRowForm({ onSuccess, onCancel }: CreateRowFormProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createMutation = useCreateRowMutation();
  const isSubmitting = createMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setError(null);
    try {
      const createData: CreateRowDto = { title: title.trim() };
      await createMutation.mutateAsync(createData);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка створення ряду:", error);
      setError(
        error instanceof Error ? error.message : "Помилка створення ряду:",
      );
    }
  };

  return (
    <CreateRowFormView
      title={title}
      setTitle={setTitle}
      error={error}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
