import { useUpdateRowMutation } from "@/modules/rows/api/hooks/mutations/useUpdateRowMutation";
import type { RowDto, UpdateRowDto } from "@/modules/rows/api/types/dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { rowSchema, type RowFormValues } from "../schema";
import { UpdateRowFormView } from "./UpdateRowFormView";

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
  const form = useForm<RowFormValues>({
    resolver: zodResolver(rowSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: row.title,
    },
  });

  const updateMutation = useUpdateRowMutation();
  const isSubmitting = updateMutation.isPending;

  const onSubmit = async (data: RowFormValues) => {
    try {
      const updateData: UpdateRowDto = { title: data.title.trim() };
      await updateMutation.mutateAsync({ rowId: row._id, data: updateData });
      onSuccess();
    } catch (error) {
      console.error("Помилка збереження ряду:", error);
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка збереження ряду",
      });
    }
  };

  return (
    <UpdateRowFormView
      form={form}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
