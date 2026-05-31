import { cn } from "@/lib/utils";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/** Минимальный набор полей аналога для отображения ссылки и картинки (без зависимости от modules/analogs). */
interface AnalogImageLinkAnalog {
  url: string;
  nameukr?: string;
  artikul?: string;
}

interface AnalogImageLinkProps {
  analog: AnalogImageLinkAnalog;
  to?: string;
  className?: string;
}

const linkClassName =
  "flex h-full w-full flex-col justify-start hover:underline";

export function AnalogImageLink({
  analog,
  to,
  className,
}: AnalogImageLinkProps) {
  const { url, nameukr } = analog;
  const artikul = analog.artikul || undefined;

  let subtitle: string;
  if (nameukr != null) {
    subtitle = nameukr.slice(10);
  } else {
    subtitle = String(artikul ?? url).slice(0, 50) || url;
  }

  const titleText = artikul || "Посилання";
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
  } else {
    imageBlock = (
      <div className="bg-muted aspect-square w-full max-w-[6rem] rounded-lg" />
    );
  }

  let linkBlock: ReactNode;
  if (to) {
    linkBlock = (
      <Link to={to} className={linkClassName}>
        {linkInner}
      </Link>
    );
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
