import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Image } from "@/components/shared/image/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { CreateProdFormValues } from "@/modules/prods/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";

const PREVIEW_PLACEHOLDER = "https://placehold.co/200x200?text=Лого&font=roboto";

interface CreateProdFormViewProps {
  form: UseFormReturn<CreateProdFormValues>;
  onSubmit: (data: CreateProdFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  imagePreviewUrl?: string;
}

export function CreateProdFormView({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
  imagePreviewUrl,
}: CreateProdFormViewProps) {
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
            <Label htmlFor="name">Ключ</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder=""
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Назва</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Повна назва виробника"
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-destructive text-sm">{errors.title.message}</p>
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
              <p className="text-destructive text-sm">{errors.imageUrl.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground text-xs">Превʼю</Label>
          <div className="aspect-square w-32 shrink-0 overflow-hidden rounded-lg border bg-muted mx-auto">
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
        submitText="Створити"
      />
    </form>
  );
}
