import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useCreatePosMutation,
  useUpdatePosMutation,
} from "../../api/usePosMutation";
import type { IPos } from "../../types";

const schema = z.object({
  artikul: z.string().min(1, "Артикул обовʼязковий"),
  quant: z.coerce.number().min(1, "Кількість > 0"),
  boxes: z.coerce.number().min(1, "Коробок > 0"),
  date: z.string().optional(),
  sklad: z.string().optional(),
  limit: z.coerce.number().min(1, "Ліміт > 0"),
  comment: z.string().min(1, "Коментар обовʼязковий"),
});

type FormValues = z.infer<typeof schema>;

interface PosFormProps {
  palletId: string;
  rowId: string;
  pos?: IPos;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function PosForm({
  palletId,
  rowId,
  pos,
  onSuccess,
  onCancel,
}: PosFormProps) {
  const isEdit = !!pos;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      artikul: pos?.artikul || "",
      quant: pos?.quant || 1,
      boxes: pos?.boxes || 1,
      date: pos?.date || "",
      sklad: pos?.sklad || "",
      limit: pos?.limit || 1,
      comment: pos?.comment || "",
    },
  });

  const createMutation = useCreatePosMutation(palletId);
  const updateMutation = useUpdatePosMutation(palletId);

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEdit && pos) {
        await updateMutation.mutateAsync({
          id: pos._id,
          data: { ...values, pallet: palletId, row: rowId },
        });
      } else {
        await createMutation.mutateAsync({
          ...values,
          pallet: palletId,
          row: rowId,
        });
      }
      onSuccess?.();
    } catch (e) {
      // TODO: обработка ошибок
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Артикул *</label>
        <Input {...form.register("artikul")} disabled={isLoading} />
        {form.formState.errors.artikul && (
          <div className="text-destructive mt-1 text-xs">
            {form.formState.errors.artikul.message}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Кількість *</label>
          <Input
            type="number"
            {...form.register("quant")}
            disabled={isLoading}
            min={1}
          />
          {form.formState.errors.quant && (
            <div className="text-destructive mt-1 text-xs">
              {form.formState.errors.quant.message}
            </div>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Коробок *</label>
          <Input
            type="number"
            {...form.register("boxes")}
            disabled={isLoading}
            min={1}
          />
          {form.formState.errors.boxes && (
            <div className="text-destructive mt-1 text-xs">
              {form.formState.errors.boxes.message}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Ліміт *</label>
          <Input
            type="number"
            {...form.register("limit")}
            disabled={isLoading}
            min={1}
          />
          {form.formState.errors.limit && (
            <div className="text-destructive mt-1 text-xs">
              {form.formState.errors.limit.message}
            </div>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Дата</label>
          <Input type="date" {...form.register("date")} disabled={isLoading} />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Склад</label>
        <Input {...form.register("sklad")} disabled={isLoading} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Коментар *</label>
        <Input {...form.register("comment")} disabled={isLoading} />
        {form.formState.errors.comment && (
          <div className="text-destructive mt-1 text-xs">
            {form.formState.errors.comment.message}
          </div>
        )}
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
