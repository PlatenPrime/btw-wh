import { Image } from "@/components/shared/image/image";
import { cn } from "@/lib/utils";
import { ArtImage } from "@/modules/arts/components/elements/art-image/ArtImage";

interface AnalogImageLinkProps {
  url: string;
  title?: string;
  nameukr?: string;
  artikul?: string;
  imageUrl?: string;
  className?: string;
}

export function AnalogImageLink({
  url,
  title,
  nameukr,
  artikul,
  imageUrl,
  className,
}: AnalogImageLinkProps) {
  const label = nameukr ?? title ?? artikul ?? url;
  const hasArtikul = Boolean(artikul && artikul.length > 0);

  return (
    <div className={cn("flex min-h-0 flex-1 items-start gap-3", className)}>
      {hasArtikul ? (
        <ArtImage artikul={artikul!} />
      ) : imageUrl ? (
        <Image
          src={imageUrl}
          alt={title ?? "Аналог"}
          className="aspect-square w-full max-w-[6rem] rounded-lg object-cover shadow-md"
        />
      ) : (
        <div className="aspect-square w-full max-w-[6rem] rounded-lg bg-muted" />
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full w-full flex-col justify-between hover:underline"
      >
        <span className="text-sm font-semibold">
          {artikul ? artikul : (title ? title.slice(0, 20) : "Посилання")}
        </span>
        <span className="text-muted-foreground text-sm font-normal line-clamp-2">
          {label ? String(label).slice(0, 50) : url}
        </span>
      </a>
    </div>
  );
}
