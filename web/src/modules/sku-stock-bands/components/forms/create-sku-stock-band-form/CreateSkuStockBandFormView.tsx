import { DialogActions } from "@/components/shared/dialogs";
import { KonkEntitySelect } from "@/components/shared/controls";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { typography } from "@/lib/typography";
import type { KonkDto } from "@/modules/konks/api/types";
import type { CreateSkuStockBandFormValues } from "@/modules/sku-stock-bands/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

interface CreateSkuStockBandFormViewProps {
  form: UseFormReturn<CreateSkuStockBandFormValues>;
  konks: KonkDto[];
  onSubmit: (data: CreateSkuStockBandFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function CreateSkuStockBandFormView({
  form,
  konks,
  onSubmit,
  onCancel,
  isLoading = false,
}: CreateSkuStockBandFormViewProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label>Конкурент</Label>
        <Controller
          control={control}
          name="konkName"
          render={({ field }) => (
            <KonkEntitySelect
              value={field.value}
              onValueChange={field.onChange}
              konks={konks}
              className="w-full"
            />
          )}
        />
        {errors.konkName ? (
          <p className={typography.formError}>{errors.konkName.message}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="stockMin">Мін. смуги</Label>
          <Input
            id="stockMin"
            type="number"
            min={0}
            step={1}
            disabled={isLoading}
            {...register("stockMin")}
          />
          {errors.stockMin ? (
            <p className={typography.formError}>{errors.stockMin.message}</p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="stockMax">Макс. смуги</Label>
          <Input
            id="stockMax"
            type="number"
            min={0}
            step={1}
            disabled={isLoading}
            {...register("stockMax")}
          />
          {errors.stockMax ? (
            <p className={typography.formError}>{errors.stockMax.message}</p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="normalMax">Норма (макс.)</Label>
          <Input
            id="normalMax"
            type="number"
            min={0}
            step={1}
            disabled={isLoading}
            {...register("normalMax")}
          />
          {errors.normalMax ? (
            <p className={typography.formError}>{errors.normalMax.message}</p>
          ) : null}
        </div>
      </div>

      {errors.root ? (
        <p className={typography.formError}>{errors.root.message}</p>
      ) : null}

      <DialogActions
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isLoading}
        submitText="Створити"
        className="justify-end"
      />
    </form>
  );
}
