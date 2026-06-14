import { Image } from "@/components/shared/media/image/Image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getBigImageUrl, getSmallImageUrl } from "@/constants/art-image-url";
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
  // если нет артикула — ничего не рендерим, избегаем «битых» ссылок
  if (!artikul) return null;

  return (
    <Dialog>
      {/* Оборачиваем preview-картинку в DialogTrigger, чтобы клик открывал диалог */}
      <DialogTrigger asChild>
        <Image
          src={getSmallImageUrl(artikul)}
          alt={artikul}
          className={cn(
            "size-10 cursor-pointer rounded-md object-cover",
            imageClassName,
          )}
          loading="lazy"
        />
      </DialogTrigger>

      {/* Само модальное окно */}
      <DialogContent className="flex min-h-40 justify-center rounded-xl border border-card-border bg-surface-3 p-0 shadow-elevation-4">
        <Image
          src={getBigImageUrl(artikul)}
          alt={artikul}
          className="rounded-xl object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
