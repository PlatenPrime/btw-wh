import { Image } from "@/components/shared/image/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const URL_DIALOG_IMAGE_FALLBACK =
  "https://placehold.co/400x400?text=Image&font=roboto";

interface UrlDialogImageProps {
  imageUrl: string;
  alt: string;
  /** Классы для области превью (размеры, скругление). */
  previewClassName?: string;
  fallbackSrc?: string;
}

/**
 * Превью по URL; по клику — диалог с изображением в крупном размере.
 * При пустом `imageUrl` после trim ничего не рендерит.
 */
export function UrlDialogImage({
  imageUrl,
  alt,
  previewClassName,
  fallbackSrc = URL_DIALOG_IMAGE_FALLBACK,
}: UrlDialogImageProps) {
  const src = imageUrl.trim();
  if (!src) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "m-0 block cursor-pointer overflow-hidden border-0 bg-transparent p-0 text-left",
            previewClassName,
          )}
        >
          <Image
            src={src}
            alt={alt}
            fallbackSrc={fallbackSrc}
            className="size-full object-cover"
            loading="lazy"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] min-h-40 max-w-[95vw] justify-center rounded-xl border bg-white p-0 shadow-none">
        <Image
          src={src}
          alt={alt}
          fallbackSrc={fallbackSrc}
          className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
