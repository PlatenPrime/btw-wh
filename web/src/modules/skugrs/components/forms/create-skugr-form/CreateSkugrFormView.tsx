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
import { Switch } from "@/components/ui/switch";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

type BaseSkugrFormData = FieldValues & {
  konkName: string;
  prodName: string;
  title: string;
  url: string;
};

interface CreateSkugrFormViewProps<TFormData extends BaseSkugrFormData> {
  form: UseFormReturn<TFormData>;
  isSubmitting: boolean;
  prods: ProdDto[];
  konks: KonkDto[];
  onSubmit: (data: TFormData) => void;
  onCancel?: () => void;
  submitText?: string;
  isSliced: boolean;
  onIsSlicedChange: (checked: boolean) => void;
}

export function CreateSkugrFormView<TFormData extends BaseSkugrFormData>({
  form,
  isSubmitting,
  prods,
  konks,
  onSubmit,
  onCancel,
  submitText = "Створити",
  isSliced,
  onIsSlicedChange,
}: CreateSkugrFormViewProps<TFormData>) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const watchedValues = watch();
  const konkNameError = errors.konkName?.message as string | undefined;
  const prodNameError = errors.prodName?.message as string | undefined;
  const titleError = errors.title?.message as string | undefined;
  const urlError = errors.url?.message as string | undefined;

  return (
    <Card className="w-full max-w-md border-0 bg-transparent shadow-none">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="skugr-konkName">Конкурент *</Label>
            <Select
              value={watchedValues.konkName || ""}
              onValueChange={(v) =>
                setValue(
                  "konkName" as Path<TFormData>,
                  v as PathValue<TFormData, Path<TFormData>>,
                  { shouldValidate: true },
                )
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
                      imageSize="xs"
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {konkNameError && <p className="text-destructive text-xs">{konkNameError}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="skugr-prodName">Виробник *</Label>
            <Select
              value={watchedValues.prodName || ""}
              onValueChange={(v) =>
                setValue(
                  "prodName" as Path<TFormData>,
                  v as PathValue<TFormData, Path<TFormData>>,
                  { shouldValidate: true },
                )
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
                      imageSize="xs"
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {prodNameError && <p className="text-destructive text-xs">{prodNameError}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="skugr-title">Назва групи *</Label>
            <Input
              id="skugr-title"
              {...register("title" as Path<TFormData>)}
              disabled={isSubmitting}
              className={errors.title ? "border-destructive" : ""}
              placeholder="Наприклад, Категорія на сайті конкурента"
            />
            {titleError && <p className="text-destructive text-xs">{titleError}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="skugr-url">URL сторінки групи *</Label>
            <Input
              id="skugr-url"
              type="url"
              {...register("url" as Path<TFormData>)}
              disabled={isSubmitting}
              className={errors.url ? "border-destructive" : ""}
              placeholder="https://..."
            />
            {urlError && <p className="text-destructive text-xs">{urlError}</p>}
          </div>

          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="skugr-is-sliced">Зрізи</Label>
            <Switch
              id="skugr-is-sliced"
              checked={isSliced}
              onCheckedChange={onIsSlicedChange}
              disabled={isSubmitting}
            />
          </div>

          <DialogActions
            onCancel={onCancel}
            onSubmit={handleSubmit(onSubmit)}
            cancelText="Скасувати"
            submitText={submitText}
            isSubmitting={isSubmitting}
            className="w-full"
          />
        </form>
      </CardContent>
    </Card>
  );
}
