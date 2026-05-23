import type { CardAction } from "@/components/shared/card-actions";
import { CardActionsMenu } from "@/components/shared/card-actions";
import { ListRowCard } from "@/components/shared/cards";
import { CardContent, CardTitle } from "@/components/ui/card";
import type { ProdDto } from "@/modules/prods/api/types/dto";
import { Link } from "react-router";

interface ProdCardViewProps {
  prod: ProdDto;
  actions: CardAction[];
}

export function ProdCardView({ prod, actions }: ProdCardViewProps) {
  return (
    <ListRowCard>
      <CardContent className="flex items-center gap-2 p-0">
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
    </ListRowCard>
  );
}
