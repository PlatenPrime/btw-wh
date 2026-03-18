import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Image } from "@/components/shared/image/image";
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
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import type { UseFormReturn } from "react-hook-form";
import { type CreateVariantFormData } from "./schema";

interface CreateVariantFormViewProps {
  form: UseFormReturn<CreateVariantFormData>;
  konks: KonkDto[];
  prods: ProdDto[];
  isSubmitting: boolean;
  onSubmit: (data: CreateVariantFormData) => void;
  onCancel?: () => void;
}

export function CreateVariantFormView({
  form,
  konks,
  prods,
  isSubmitting,
  onSubmit,
  onCancel,
}: CreateVariantFormViewProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const watchedValues = watch();
  const imageUrl = watchedValues.imageUrl?.trim() ?? "";

  return (
    <Card className="w-full max-w-md border-0 bg-transparent shadow-none">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="konkName">Конкурент *</Label>
            <Select
              value={watchedValues.konkName || ""}
              onValueChange={(v) =>
                setValue("konkName", v, { shouldValidate: true })
              }
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="konkName"
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
            <Label htmlFor="prodName">Виробник *</Label>
            <Select
              value={watchedValues.prodName || ""}
              onValueChange={(v) =>
                setValue("prodName", v, { shouldValidate: true })
              }
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="prodName"
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
            <Label htmlFor="title">Назва варіанта *</Label>
            <Input
              id="title"
              type="text"
              {...register("title")}
              placeholder="Напр.: Вариант 1"
              disabled={isSubmitting}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-destructive text-xs">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="url">Посилання *</Label>
            <Input
              id="url"
              type="url"
              {...register("url")}
              placeholder="https://..."
              disabled={isSubmitting}
              className={errors.url ? "border-destructive" : ""}
            />
            {errors.url && (
              <p className="text-destructive text-xs">
                {errors.url.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Зображення *</Label>
            <Input
              id="imageUrl"
              type="url"
              {...register("imageUrl")}
              placeholder="https://... (img url)"
              disabled={isSubmitting}
              className={errors.imageUrl ? "border-destructive" : ""}
            />
            {errors.imageUrl && (
              <p className="text-destructive text-xs">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          {imageUrl && (
            <div className="bg-muted/50 rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <Image
                  src={imageUrl}
                  alt="preview"
                  className="size-12 shrink-0 rounded object-cover border"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Попередній перегляд</p>
                  <p className="text-muted-foreground text-xs line-clamp-1">
                    {imageUrl}
                  </p>
                </div>
              </div>
            </div>
          )}

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

