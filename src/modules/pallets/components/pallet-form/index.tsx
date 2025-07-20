import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useCreatePalletMutation,
  useUpdatePalletMutation,
} from "../../api/usePalletMutation";
import type { IPallet } from "../../types";

const schema = z.object({
  title: z.string().min(1, "Назва обовʼязкова"),
  sector: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface PalletFormProps {
  rowId: string;
  pallet?: IPallet;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function PalletForm({
  rowId,
  pallet,
  onSuccess,
  onCancel,
}: PalletFormProps) {
  const isEdit = !!pallet;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: pallet?.title || "",
      sector: pallet?.sector || "",
    },
  });

  const createMutation = useCreatePalletMutation(rowId);
  const updateMutation = useUpdatePalletMutation(rowId);

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEdit && pallet) {
        await updateMutation.mutateAsync({
          id: pallet._id,
          data: { ...values, row: rowId },
        });
      } else {
        await createMutation.mutateAsync({ ...values, row: rowId });
      }
      onSuccess?.();
    } catch (e) {
      // TODO: обработка ошибок
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">
          Назва паллети *
        </label>
        <Input {...form.register("title")} disabled={isLoading} />
        {form.formState.errors.title && (
          <div className="text-destructive mt-1 text-xs">
            {form.formState.errors.title.message}
          </div>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">
          Сектор (опціонально)
        </label>
        <Input {...form.register("sector")} disabled={isLoading} />
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Скасувати
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isEdit ? "Зберегти" : "Створити"}
        </Button>
      </div>
    </form>
  );
}
