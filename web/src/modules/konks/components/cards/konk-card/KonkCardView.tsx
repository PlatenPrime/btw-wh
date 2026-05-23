import { CardActionsMenu } from "@/components/shared/card-actions";
import type { CardAction } from "@/components/shared/card-actions";
import { ListRowCard } from "@/components/shared/cards";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Image } from "@/components/shared/image/image";
import type { KonkDto } from "@/modules/konks/api/types";
import { Link } from "react-router";

const FALLBACK_IMAGE = "https://placehold.co/80x80?text=Лого&font=roboto";

interface KonkCardViewProps {
  konk: KonkDto;
  actions: CardAction[];
}

export function KonkCardView({ konk, actions }: KonkCardViewProps) {
  return (
    <ListRowCard>
      <CardContent className="flex items-center gap-2 p-0">
        <div className="size-12 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-muted ring-1 ring-border/40">
          <Image
            src={konk.imageUrl}
            alt={konk.title}
            className="size-full object-contain"
            fallbackSrc={FALLBACK_IMAGE}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <CardTitle className="p-0">
            <Link
              to={`/sku/konks/${konk._id}`}
              className="block truncate hover:underline"
            >
              {konk.title}
            </Link>
          </CardTitle>
          <span className="truncate text-xs text-muted-foreground">
            {konk.name}
          </span>
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
