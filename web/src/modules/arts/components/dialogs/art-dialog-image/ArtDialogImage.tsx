import { SharikImage } from "@/components/shared/media/sharik-image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ArtImageProps {
  artikul?: string;
  imageClassName?: string;
}

/**
 * Показывает маленькую картинку-превью; при клике открывает
 * диалог с полноразмерным изображением.
 */
export function ArtDialogImage({ artikul, imageClassName }: ArtImageProps) {
  if (!artikul) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SharikImage
          artikul={artikul}
          size="prev"
          alt={artikul}
          className={cn(
            "size-10 cursor-pointer rounded-md object-cover",
            imageClassName,
          )}
          loading="lazy"
        />
      </DialogTrigger>

      <DialogContent className="flex min-h-40 justify-center rounded-xl border border-card-border bg-surface-3 p-0 shadow-elevation-4">
        <SharikImage
          artikul={artikul}
          size="big"
          alt={artikul}
          className="rounded-xl object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
