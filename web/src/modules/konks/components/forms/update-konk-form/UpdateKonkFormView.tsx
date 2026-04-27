import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Image } from "@/components/shared/image/image";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { X } from "lucide-react";
import type { UpdateKonkFormValues } from "@/modules/konks/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";

const PREVIEW_PLACEHOLDER = "https://placehold.co/200x200?text=Лого&font=roboto";

interface UpdateKonkFormViewProps {
  form: UseFormReturn<UpdateKonkFormValues>;
  onSubmit: (data: UpdateKonkFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  imagePreviewUrl?: string;
}

export function UpdateKonkFormView({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
  imagePreviewUrl,
}: UpdateKonkFormViewProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const recountDays = watch("recountDays") ?? [];

  const selectedCalendarDays = recountDays.map((day) => new Date(`${day}T00:00:00`));

  const handleCalendarSelect = (days: Date[] | undefined) => {
    const normalizedDays = Array.from(
      new Set((days ?? []).map((day) => format(day, "yyyy-MM-dd")))
    ).sort((left, right) => left.localeCompare(right));

    setValue("recountDays", normalizedDays, { shouldDirty: true });
  };

  const handleRemoveRecountDay = (dayToRemove: string) => {
    setValue(
      "recountDays",
      recountDays.filter((day) => day !== dayToRemove),
      { shouldDirty: true }
    );
  };

  const handleClearRecountDays = () => {
    setValue("recountDays", [], { shouldDirty: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr,auto]">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="update-name">Ключ (одним словом)</Label>
            <Input
              id="update-name"
              {...register("name")}
              placeholder="competitor-slug"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="update-title">Назва</Label>
            <Input
              id="update-title"
              {...register("title")}
              placeholder="Повна назва конкурента"
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-destructive text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="update-url">URL сайту</Label>
            <Input
              id="update-url"
              {...register("url")}
              placeholder="https://..."
              type="url"
              disabled={isLoading}
            />
            {errors.url && (
              <p className="text-destructive text-sm">{errors.url.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="update-imageUrl">URL зображення</Label>
            <Input
              id="update-imageUrl"
              {...register("imageUrl")}
              placeholder="https://..."
              type="url"
              disabled={isLoading}
            />
            {errors.imageUrl && (
              <p className="text-destructive text-sm">{errors.imageUrl.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-2">
              <Label>Дні переобліку</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearRecountDays}
                disabled={isLoading || recountDays.length === 0}
              >
                Очистити всі
              </Button>
            </div>
            <Calendar
              mode="multiple"
              selected={selectedCalendarDays}
              onSelect={handleCalendarSelect}
              disabled={isLoading}
              numberOfMonths={1}
            />
            <div className="flex flex-wrap gap-2">
              {recountDays.length > 0 ? (
                recountDays.map((day) => (
                  <div
                    key={day}
                    className="bg-muted inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs"
                  >
                    <span>{day}</span>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="size-4"
                      onClick={() => handleRemoveRecountDay(day)}
                      disabled={isLoading}
                    >
                      <X className="size-3" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  Дні переобліку не вибрані
                </p>
              )}
            </div>
            {errors.recountDays && (
              <p className="text-destructive text-sm">
                {errors.recountDays.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground text-xs">Превʼю</Label>
          <div className="mx-auto aspect-square w-32 shrink-0 overflow-hidden rounded-lg border bg-muted">
            {imagePreviewUrl ? (
              <Image
                src={imagePreviewUrl}
                alt="Превʼю логотипу"
                className="size-full object-contain"
                fallbackSrc={PREVIEW_PLACEHOLDER}
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <Skeleton className="size-full" />
              </div>
            )}
          </div>
        </div>
      </div>

      {errors.root && (
        <p className="text-destructive text-sm">{errors.root.message}</p>
      )}

      <DialogActions
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isLoading}
        submitText="Зберегти"
      />
    </form>
  );
}
