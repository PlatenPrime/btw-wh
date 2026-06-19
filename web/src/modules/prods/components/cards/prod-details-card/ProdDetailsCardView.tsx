import { Image } from "@/components/shared/media/image/Image";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { DetailPanelCard } from "@/components/shared/cards";
import { CardContent, CardTitle } from "@/components/ui/card";
import type { ProdDto } from "@/modules/prods/api/types";

const FALLBACK_IMAGE = "https://placehold.co/200x200?text=Лого&font=roboto";

interface ProdDetailsCardViewProps {
  prod: ProdDto;
}

export function ProdDetailsCardView({ prod }: ProdDetailsCardViewProps) {
  return (
    <DetailPanelCard className="p-2">
      <CardContent className="flex items-start gap-2 p-0">
        <div className="bg-muted aspect-square w-16 shrink-0 overflow-hidden rounded-lg border ">
          <Image
            src={prod.imageUrl}
            alt={prod.title}
            className="size-full object-contain"
            fallbackSrc={FALLBACK_IMAGE}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <CardTitle className={cn("p-0", typography.detailTitle)}>{prod.title}</CardTitle>
          <span className={typography.listSubtitle}>{prod.name}</span>
        </div>
      </CardContent>
    </DetailPanelCard>
  );
}
