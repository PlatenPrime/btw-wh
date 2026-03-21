import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { UseFormReturn } from "react-hook-form";
import type { CreateSkugrFormData } from "./schema";

interface CreateSkugrFormViewProps {
  form: UseFormReturn<CreateSkugrFormData>;
  isSubmitting: boolean;
  prods: ProdDto[];
  konks: KonkDto[];
  onSubmit: (data: CreateSkugrFormData) => void;
  onCancel?: () => void;
}

export function CreateSkugrFormView({
  form,
  isSubmitting,
  prods,
  konks,
  onSubmit,
  onCancel,
}: CreateSkugrFormViewProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const watchedValues = watch();

  return (
    <Card className="w-full max-w-md border-0 bg-transparent shadow-none">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="skugr-konkName">Конкурент *</Label>
            <Select
              value={watchedValues.konkName || ""}
              onValueChange={(v) =>
                setValue("konkName", v, { shouldValidate: true })
              }
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="skugr-konkName"
                className={errors.konkName ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Оберіть конкурента" />
              </SelectTrigger>
              <SelectContent>
                {konks.map((k) => (
                  <SelectItem key={k._id} value={k.name}>
                    <EntityLabel
                      imageUrl={k.imageUrl}
                      title={k.title}
                      fallbackLabel={k.name}
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.konkName && (
              <p className="text-destructive text-xs">
                {errors.konkName.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="skugr-prodName">Виробник *</Label>
            <Select
              value={watchedValues.prodName || ""}
              onValueChange={(v) =>
                setValue("prodName", v, { shouldValidate: true })
              }
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="skugr-prodName"
                className={errors.prodName ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Оберіть виробника" />
              </SelectTrigger>
              <SelectContent>
                {prods.map((p) => (
                  <SelectItem key={p._id} value={p.name}>
                    <EntityLabel
                      imageUrl={p.imageUrl}
                      title={p.title}
                      fallbackLabel={p.name}
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.prodName && (
              <p className="text-destructive text-xs">
                {errors.prodName.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="skugr-title">Назва групи *</Label>
            <Input
              id="skugr-title"
              {...register("title")}
              disabled={isSubmitting}
              className={errors.title ? "border-destructive" : ""}
              placeholder="Наприклад, Категорія на сайті конкурента"
            />
            {errors.title && (
              <p className="text-destructive text-xs">{errors.title.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="skugr-url">URL сторінки групи *</Label>
            <Input
              id="skugr-url"
              type="url"
              {...register("url")}
              disabled={isSubmitting}
              className={errors.url ? "border-destructive" : ""}
              placeholder="https://..."
            />
            {errors.url && (
              <p className="text-destructive text-xs">{errors.url.message}</p>
            )}
          </div>

          <DialogActions
            onCancel={onCancel}
            onSubmit={handleSubmit(onSubmit)}
            cancelText="Скасувати"
            submitText="Створити"
            isSubmitting={isSubmitting}
            className="w-full"
          />
        </form>
      </CardContent>
    </Card>
  );
}
