import { DetailPanelCard } from "@/components/shared/cards";
import { Image } from "@/components/shared/media/image/Image";
import { CardContent, CardTitle } from "@/components/ui/card";
import type { KonkDto } from "@/modules/konks/api/types";

const FALLBACK_IMAGE = "https://placehold.co/200x200?text=Лого&font=roboto";

interface KonkDetailsCardViewProps {
  konk: KonkDto;
}

export function KonkDetailsCardView({ konk }: KonkDetailsCardViewProps) {
  return (
    <DetailPanelCard className="group overflow-hidden">
      <CardContent className="grid grid-cols-[auto_1fr] items-start gap-3 p-0">
        <div className="aspect-square w-16 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/70 ring-1 ring-border/60 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-elevation-2">
          <Image
            src={konk.imageUrl}
            alt={konk.title}
            className="size-full object-contain p-1"
            fallbackSrc={FALLBACK_IMAGE}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <CardTitle className="line-clamp-2 p-0 text-base leading-tight tracking-tight">
            {konk.title}
          </CardTitle>
          <span className="truncate text-sm font-medium text-muted-foreground">
            {konk.name}
          </span>
          {konk.url && (
            <a
              href={konk.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex max-w-full items-center truncate text-sm text-primary/90 transition-colors duration-200 hover:text-primary hover:underline"
            >
              {konk.url}
            </a>
          )}
        </div>
      </CardContent>
    </DetailPanelCard>
  );
}
