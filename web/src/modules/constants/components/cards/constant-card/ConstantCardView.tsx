import { CardActionsMenu } from "@/components/shared/actions/card-actions";
import type { CardAction } from "@/components/shared/actions/card-actions";
import { ListRowCard } from "@/components/shared/cards";
import { CardContent, CardTitle } from "@/components/ui/card";
import type { ConstantDto } from "@/modules/constants/api/types";
import { Link } from "react-router";

interface ConstantCardViewProps {
  constant: ConstantDto;
  actions: CardAction[];
}

export function ConstantCardView({ constant, actions }: ConstantCardViewProps) {
  return (
    <ListRowCard>
      <CardContent className="flex items-center gap-2 p-0">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <CardTitle className="p-0">
            <Link
              to={`/wh/constants/${constant._id}`}
              className="block truncate hover:underline"
            >
              {constant.title}
            </Link>
          </CardTitle>
          <span className="truncate text-xs text-muted-foreground">
            {constant.name}
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
