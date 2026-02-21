import { CardActionsMenu } from "@/components/shared/card-actions";
import type { CardAction } from "@/components/shared/card-actions";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Image } from "@/components/shared/image/image";
import type { DelListItemDto } from "@/modules/dels/api/types";
import { Link } from "react-router";
import { Package } from "lucide-react";

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
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <CardContent className="flex items-center gap-2 p-0">
        <div className="size-12 shrink-0 overflow-hidden rounded border bg-muted">
          <Image
            src={del.prod?.imageUrl ?? FALLBACK_IMAGE}
            alt={del.prod?.title ?? "Логотип"}
            className="size-full object-contain"
            fallbackSrc={FALLBACK_IMAGE}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <CardTitle className="p-0">
            <Link
              to={`/wh/dels/${del._id}`}
              className="block truncate hover:underline"
            >
              {del.title}
            </Link>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Package className="text-muted-foreground size-3.5 shrink-0" aria-hidden />
            <span className="text-muted-foreground truncate text-xs">
              {formatDate(del.createdAt)}
            </span>
          </div>
        </div>
        <CardActionsMenu
          actions={actions}
          orientation="vertical"
          size="sm"
          align="end"
        />
      </CardContent>
    </Card>
  );
}
