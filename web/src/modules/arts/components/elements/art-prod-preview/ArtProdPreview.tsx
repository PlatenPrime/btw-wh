import { EntityLabel } from "@/modules/analogs/components/entity-label";
import { cn } from "@/lib/utils";
import type { ArtDto } from "@/modules/arts/api/types/dto";

type ArtProdFields = Pick<ArtDto, "prod" | "prodName">;

interface ArtProdPreviewProps {
  art: ArtProdFields;
  imageSize?: "xs" | "sm" | "md";
  className?: string;
  fallbackKeyClassName?: string;
}

export function ArtProdPreview({
  art,
  imageSize = "sm",
  className = "text-xs",
  fallbackKeyClassName = "text-muted-foreground text-xs",
}: ArtProdPreviewProps) {
  if (art.prod) {
    return (
      <EntityLabel
        imageUrl={art.prod.imageUrl}
        title={art.prod.title}
        fallbackLabel={art.prodName ?? art.prod.name}
        imageSize={imageSize}
        className={className}
      />
    );
  }
  if (art.prodName) {
    return (
      <p className={cn(fallbackKeyClassName, className)}>
        Виробник (ключ): {art.prodName}
      </p>
    );
  }
  return null;
}
