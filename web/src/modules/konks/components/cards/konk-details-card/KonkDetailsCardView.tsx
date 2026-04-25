import { Image } from "@/components/shared/image/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { KonkDto } from "@/modules/konks/api/types";

const FALLBACK_IMAGE = "https://placehold.co/200x200?text=Лого&font=roboto";

interface KonkDetailsCardViewProps {
  konk: KonkDto;
}

export function KonkDetailsCardView({ konk }: KonkDetailsCardViewProps) {
  return (
    <Card className="group border-border/70 bg-card/95 overflow-hidden p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <CardContent className="grid grid-cols-[auto_1fr] items-start gap-3 p-0">
        <div className="bg-muted/70 ring-border/60 aspect-square w-16 shrink-0 overflow-hidden rounded-xl border border-transparent ring-1 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-md">
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
          <span className="text-muted-foreground truncate text-sm font-medium">
            {konk.name}
          </span>
          {konk.url && (
            <a
              href={konk.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/90 hover:text-primary inline-flex max-w-full items-center truncate text-sm transition-colors duration-200 hover:underline"
            >
              {konk.url}
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
