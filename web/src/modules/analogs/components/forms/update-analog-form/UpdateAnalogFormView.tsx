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
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtImage } from "@/modules/arts/components/elements/art-image/ArtImage";
import { useFormContext } from "react-hook-form";
import type { UpdateAnalogFormData } from "./schema";

interface UpdateAnalogFormViewProps {
  form: ReturnType<typeof useFormContext<UpdateAnalogFormData>>;
  artikul: string;
  onArtikulChange: (value: string) => void;
  isSubmitting: boolean;
  isArtLoading: boolean;
  artData?: ArtDto;
  prods: { _id: string; name: string }[];
  konks: { _id: string; name: string }[];
  onSubmit: (data: UpdateAnalogFormData) => void;
  onCancel?: () => void;
}

export function UpdateAnalogFormView({
  form,
  artikul,
  onArtikulChange,
  isSubmitting,
  isArtLoading,
  artData,
  prods,
  konks,
  onSubmit,
  onCancel,
}: UpdateAnalogFormViewProps) {
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
            <Label htmlFor="konkName">Конкурент</Label>
            <Select
              value={watchedValues.konkName ?? ""}
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
                    {k.name}
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
            <Label htmlFor="prodName">Виробник</Label>
            <Select
              value={watchedValues.prodName ?? ""}
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
                    {p.name}
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
            <Label htmlFor="url">Посилання</Label>
            <Input
              id="url"
              type="url"
              {...register("url")}
              placeholder="https://..."
              disabled={isSubmitting}
              className={errors.url ? "border-destructive" : ""}
            />
            {errors.url && (
              <p className="text-destructive text-xs">{errors.url.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="artikul">Артикул</Label>
            <Input
              id="artikul"
              type="text"
              {...register("artikul")}
              onChange={(e) => onArtikulChange(e.target.value)}
              placeholder="1111-1111"
              disabled={isSubmitting}
              maxLength={9}
              className={errors.artikul ? "border-destructive" : ""}
            />
            {isArtLoading && (
              <p className="text-muted-foreground text-xs">Пошук артикула...</p>
            )}
          </div>

          {artData && (
            <div className="bg-muted/50 rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <ArtImage artikul={artikul} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{artData.nameukr}</p>
                  <p className="text-muted-foreground text-xs">{artikul}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="title">Назва</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Назва товару у конкурента"
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
            <Label htmlFor="imageUrl">Посилання на зображення</Label>
            <Input
              id="imageUrl"
              type="url"
              {...register("imageUrl")}
              placeholder="https://..."
              disabled={isSubmitting}
              className={errors.imageUrl ? "border-destructive" : ""}
            />
            {errors.imageUrl && (
              <p className="text-destructive text-xs">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          <DialogActions
            onCancel={onCancel}
            onSubmit={handleSubmit(onSubmit)}
            cancelText="Скасувати"
            submitText="Оновити"
            isSubmitting={isSubmitting}
            className="w-full"
          />
        </form>
      </CardContent>
    </Card>
  );
}
