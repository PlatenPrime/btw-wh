import { Image } from "@/components/shared/image/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { KonkDto } from "@/modules/konks/api/types";

const FALLBACK_IMAGE = "https://placehold.co/200x200?text=Лого&font=roboto";

interface KonkDetailsCardViewProps {
  konk: KonkDto;
}

export function KonkDetailsCardView({ konk }: KonkDetailsCardViewProps) {
  return (
    <Card className="p-2">
      <CardContent className="flex items-start gap-2 p-0">
        <div className="bg-muted aspect-square w-16 shrink-0 overflow-hidden rounded-lg border ">
          <Image
            src={konk.imageUrl}
            alt={konk.title}
            className="size-full object-contain"
            fallbackSrc={FALLBACK_IMAGE}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <CardTitle className="p-0">{konk.title}</CardTitle>
          <span className="text-muted-foreground truncate text-xs">
            {konk.name}
          </span>
          {konk.url && (
            <a
              href={konk.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm truncate"
            >
              {konk.url}
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
