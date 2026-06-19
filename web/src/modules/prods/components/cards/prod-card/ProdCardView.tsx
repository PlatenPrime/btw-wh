import type { CardAction } from "@/components/shared/actions/card-actions";
import { CardActionsMenu } from "@/components/shared/actions/card-actions";
import { ListRowCard } from "@/components/shared/cards";
import { Image } from "@/components/shared/media/image/Image";
import { CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { iconSize, typography } from "@/lib/typography";
import type { ProdDto } from "@/modules/prods/api/types/dto";
import { Link } from "react-router";

const FALLBACK_IMAGE = "https://placehold.co/80x80?text=Лого&font=roboto";

interface ProdCardViewProps {
  prod: ProdDto;
  actions: CardAction[];
}

export function ProdCardView({ prod, actions }: ProdCardViewProps) {
  return (
    <ListRowCard>
      <CardContent className="flex items-center gap-2 p-0">
        <div className={cn("overflow-hidden rounded-lg border border-border/60 bg-muted ring-1 ring-border/40", iconSize.avatarList)}>
          <Image
            src={prod.imageUrl}
            alt={prod.title}
            className="size-full object-contain"
            fallbackSrc={FALLBACK_IMAGE}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <CardTitle size="sm" className="p-0">
            <Link
              to={`/wh/prods/${prod._id}`}
              className={cn("block hover:underline", typography.listTitleCompact)}
            >
              {prod.title}
            </Link>
          </CardTitle>
          <span className={typography.listSubtitle}>{prod.name}</span>
        </div>
        {actions.length > 0 && (
          <CardActionsMenu
            actions={actions}
            orientation="vertical"
            size="sm"
            align="end"
          />
        )}
      </CardContent>
    </ListRowCard>
  );
}
