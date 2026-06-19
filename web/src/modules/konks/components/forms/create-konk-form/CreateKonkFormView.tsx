import { DialogActions } from "@/components/shared/dialogs";
import { Image } from "@/components/shared/media/image/Image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { CreateKonkFormValues } from "@/modules/konks/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";
import { typography } from "@/lib/typography";

const PREVIEW_PLACEHOLDER = "https://placehold.co/200x200?text=Лого&font=roboto";

interface CreateKonkFormViewProps {
  form: UseFormReturn<CreateKonkFormValues>;
  onSubmit: (data: CreateKonkFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  imagePreviewUrl?: string;
}

export function CreateKonkFormView({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
  imagePreviewUrl,
}: CreateKonkFormViewProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr,auto]">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Ключ (одним словом)</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="competitor-slug"
              disabled={isLoading}
            />
            {errors.name && (
              <p className={typography.formError}>{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Назва</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Повна назва конкурента"
              disabled={isLoading}
            />
            {errors.title && (
              <p className={typography.formError}>{errors.title.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="url">URL сайту</Label>
            <Input
              id="url"
              {...register("url")}
              placeholder="https://..."
              type="url"
              disabled={isLoading}
            />
            {errors.url && (
              <p className={typography.formError}>{errors.url.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageUrl">URL зображення</Label>
            <Input
              id="imageUrl"
              {...register("imageUrl")}
              placeholder="https://..."
              type="url"
              disabled={isLoading}
            />
            {errors.imageUrl && (
              <p className={typography.formError}>{errors.imageUrl.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className={typography.formHint}>Превʼю</Label>
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
        <p className={typography.formError}>{errors.root.message}</p>
      )}

      <DialogActions
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isLoading}
        submitText="Створити"
      />
    </form>
  );
}
