import { useUpdateRowMutation } from "@/modules/rows/api/hooks/useUpdateRowMutation";
import type { RowDto, UpdateRowDto } from "@/modules/rows/api/types/dto";
import { useState } from "react";
import { UpdateRowFormView } from "./view";

interface UpdateRowFormProps {
  row: RowDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateRowForm({
  row,
  onSuccess,
  onCancel,
}: UpdateRowFormProps) {
  const [title, setTitle] = useState(row.title);
  const [error, setError] = useState<string | null>(null);

  const updateMutation = useUpdateRowMutation();
  const isSubmitting = updateMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setError(null);
    try {
      const updateData: UpdateRowDto = { title: title.trim() };
      await updateMutation.mutateAsync({ rowId: row._id, data: updateData });
      onSuccess();
    } catch (error) {
      console.error("Помилка збереження ряду:", error);
      setError(
        error instanceof Error ? error.message : "Помилка збереження ряду:",
      );
    }
  };

  return (
    <UpdateRowFormView
      title={title}
      setTitle={setTitle}
      error={error}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
