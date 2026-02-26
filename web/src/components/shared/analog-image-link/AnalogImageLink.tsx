import type { ReactNode } from "react";
import { Image } from "@/components/shared/image/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { Link } from "react-router-dom";

/** Минимальный набор полей аналога для отображения ссылки и картинки (без зависимости от modules/analogs). */
interface AnalogImageLinkAnalog {
  url: string;
  title?: string;
  nameukr?: string;
  artikul?: string;
  imageUrl?: string;
}

interface AnalogImageLinkProps {
  analog: AnalogImageLinkAnalog;
  to?: string;
  className?: string;
}

const linkClassName =
  "flex h-full w-full flex-col justify-start hover:underline";

export function AnalogImageLink({ analog, to, className }: AnalogImageLinkProps) {
  const { url, title, nameukr, imageUrl } = analog;
  const artikul = analog.artikul || undefined;

  let subtitle: string;
  if (nameukr != null) {
    subtitle = nameukr.slice(10);
  } else {
    subtitle = String(title ?? artikul ?? url).slice(0, 50) || url;
  }

  const titleText = artikul || title?.slice(0, 20) || "Посилання";
  const linkInner = (
    <>
      <span className="text-sm font-semibold">{titleText}</span>
      <span className="text-muted-foreground line-clamp-2 text-sm font-normal">
        {subtitle}
      </span>
    </>
  );

  let imageBlock: ReactNode;
  if (artikul) {
    imageBlock = <ArtDialogImage artikul={artikul} />;
  } else if (imageUrl) {
    imageBlock = (
      <Dialog>
        <DialogTrigger asChild>
          <Image
            src={imageUrl}
            alt={title ?? "Аналог"}
            className="aspect-square w-full max-w-[6rem] cursor-pointer rounded-lg object-cover shadow-md"
          />
        </DialogTrigger>
        <DialogContent className="flex min-h-40 justify-center rounded-xl border bg-white p-0 shadow-none">
          <Image
            src={imageUrl}
            alt={title ?? "Аналог"}
            className="max-h-[80vh] rounded-xl object-contain"
          />
        </DialogContent>
      </Dialog>
    );
  } else {
    imageBlock = (
      <div className="aspect-square w-full max-w-[6rem] rounded-lg bg-muted" />
    );
  }

  let linkBlock: ReactNode;
  if (to) {
    linkBlock = <Link to={to} className={linkClassName}>{linkInner}</Link>;
  } else {
    linkBlock = (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {linkInner}
      </a>
    );
  }

  return (
    <div className={cn("flex min-h-0 flex-1 items-start gap-3", className)}>
      {imageBlock}
      {linkBlock}
    </div>
  );
}
