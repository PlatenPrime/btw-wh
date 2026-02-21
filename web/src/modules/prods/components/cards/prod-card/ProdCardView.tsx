import { CardActionsMenu } from "@/components/shared/card-actions";
import type { CardAction } from "@/components/shared/card-actions";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Image } from "@/components/shared/image/image";
import type { ProdDto } from "@/modules/prods/api/types";
import { Link } from "react-router";

const FALLBACK_IMAGE = "https://placehold.co/80x80?text=Лого&font=roboto";

interface ProdCardViewProps {
  prod: ProdDto;
  actions: CardAction[];
}

export function ProdCardView({ prod, actions }: ProdCardViewProps) {
  return (
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <CardContent className="flex items-center gap-2 p-0">
        <div className="size-12 shrink-0 overflow-hidden rounded border bg-muted">
          <Image
            src={prod.imageUrl}
            alt={prod.title}
            className="size-full object-contain"
            fallbackSrc={FALLBACK_IMAGE}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <CardTitle className="p-0">
            <Link
              to={`/wh/prods/${prod._id}`}
              className="block truncate hover:underline"
            >
              {prod.title}
            </Link>
          </CardTitle>
          <span className="text-muted-foreground truncate text-xs">
            {prod.name}
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
    </Card>
  );
}
