import { Image } from "@/components/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  getBigImageUrl,
  getSmallImageUrl,
} from "@/modules/arts/services/art-image-url";

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
          className="w-16 rounded-md object-cover cursor-pointer"
          loading="lazy"
        />
      </DialogTrigger>

      {/* Само модальное окно */}
      <DialogContent className="p-0 bg-transparent border shadow-none min-h-40 rounded-xl">
        <Image
          src={getBigImageUrl(artikul)}
          alt={artikul}
          className="object-contain rounded-xl"
        />
      </DialogContent>
    </Dialog>
  );
}
