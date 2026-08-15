import { CardActionsMenu } from "@/components/shared/actions/card-actions";
import type { CardAction } from "@/components/shared/actions/card-actions";
import { ListRowCard } from "@/components/shared/cards";
import { IconWell } from "@/components/shared/elements";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Image } from "@/components/shared/media/image/Image";
import { cn } from "@/lib/utils";
import { iconSize, typography } from "@/lib/typography";
import type { DelListItemDto } from "@/modules/dels/api/types";
import { Package } from "lucide-react";
import { Link } from "react-router";

const FALLBACK_IMAGE = "https://placehold.co/80x80?text=Лого&font=roboto";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

interface DelCardViewProps {
  del: DelListItemDto;
  actions: CardAction[];
}

export function DelCardView({ del, actions }: DelCardViewProps) {
  return (
    <ListRowCard>
      <CardContent className="flex items-center gap-2 p-0">
        <div className={cn("overflow-hidden rounded-lg border border-border/60 bg-muted ring-1 ring-border/40", iconSize.avatarList)}>
          <Image
            src={del.prod?.imageUrl ?? FALLBACK_IMAGE}
            alt={del.prod?.title ?? "Логотип"}
            className="size-full object-contain"
            fallbackSrc={FALLBACK_IMAGE}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <CardTitle size="sm" className="p-0">
            <Link
              to={`/wh/dels/${del._id}`}
              className={cn("block hover:underline", typography.listTitleCompact)}
            >
              {del.title}
            </Link>
          </CardTitle>
          <div className="flex items-center gap-2">
            <IconWell icon={Package} tone="muted" size="sm" />
            <span className={typography.listSubtitle}>{formatDate(del.createdAt)}</span>
          </div>
        </div>
        <CardActionsMenu
          actions={actions}
          orientation="vertical"
          size="sm"
          align="end"
        />
      </CardContent>
    </ListRowCard>
  );
}
