import { Image } from "@/components/image/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getBigImageUrl, getSmallImageUrl } from "@/lib/art-image-url";

interface ArtImageProps {
  artikul?: string;
}

/**
 * Показывает маленькую картинку-превью; при клике открывает
 * диалог с полноразмерным изображением.
 */
export function ArtDialogImage({ artikul }: ArtImageProps) {
  // если нет артикула — ничего не рендерим, избегаем «битых» ссылок
  if (!artikul) return null;

  return (
    <Dialog>
      {/* Оборачиваем preview-картинку в DialogTrigger, чтобы клик открывал диалог */}
      <DialogTrigger asChild>
        <Image
          src={getSmallImageUrl(artikul)}
          alt={artikul}
          className="w-20 cursor-pointer rounded-md object-cover"
          loading="lazy"
        />
      </DialogTrigger>

      {/* Само модальное окно */}
      <DialogContent className="min-h-40 rounded-xl border bg-white flex justify-center p-0 shadow-none">
        <Image
          src={getBigImageUrl(artikul)}
          alt={artikul}
          className="rounded-xl object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
