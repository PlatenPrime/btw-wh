import { Image } from "@/components/shared/image/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { DelDto } from "@/modules/dels/api/types";

const FALLBACK_IMAGE = "https://placehold.co/200x200?text=Лого&font=roboto";

interface DelHeaderCardProps {
  del: DelDto;
}

export function DelHeaderCard({ del }: DelHeaderCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {del.prod && (
            <div className="flex items-start gap-2">
              <div className="bg-muted aspect-square w-16 shrink-0 overflow-hidden rounded-lg border">
                <Image
                  src={del.prod.imageUrl}
                  alt={del.prod.title}
                  className="size-full object-contain"
                  fallbackSrc={FALLBACK_IMAGE}
                />
              </div>
            </div>
          )}
          <CardTitle>{del.title}</CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}
