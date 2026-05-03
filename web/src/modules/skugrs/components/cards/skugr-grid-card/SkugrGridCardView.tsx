import { CardActionsMenu } from "@/components/shared/card-actions/CardActionsMenu";
import type { CardAction } from "@/components/shared/card-actions/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  getKonkTheme,
  KonkBanner,
} from "@/modules/analogs/components/common/konk-banner";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkugrDto } from "@/modules/skugrs/api/types";
import { Notebook } from "lucide-react";
import { Link } from "react-router";

interface SkugrGridCardViewProps {
  skugr: SkugrDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
  actions: CardAction[];
}

export function SkugrGridCardView({
  skugr,
  konk,
  prod,
  actions,
}: SkugrGridCardViewProps) {
  const theme = getKonkTheme(skugr.konkName);
  const skuCount = skugr.skus?.length ?? 0;

  return (
    <Card
      className={cn(
        "flex h-full flex-col gap-0 overflow-hidden p-0 transition-shadow",
        theme.shadow,
      )}
    >
      <KonkBanner
        konkName={skugr.konkName}
        imageUrl={konk?.imageUrl}
        title={konk?.title}
        actionSlot={
          <CardActionsMenu
            actions={actions}
            orientation="horizontal"
            size="sm"
            align="end"
          />
        }
      />
      <CardHeader className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-2 p-2">
        <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-2">
          <CardTitle className="mb-0 min-w-0 text-base leading-tight font-semibold">
            <Link
              to={`/sku/skugrs/${skugr._id}`}
              className="hover:text-primary block wrap-break-word underline-offset-4 hover:underline"
            >
              {skugr.title}
            </Link>
          </CardTitle>
          <span className="text-muted-foreground flex shrink-0 items-center gap-1 self-start text-sm tabular-nums">
            <Notebook className="size-3.5 shrink-0" aria-hidden />
            {skuCount}
          </span>
        </div>
      </CardHeader>
      {prod ? (
        <div className="border-border/80 text-muted-foreground flex shrink-0 items-center justify-center border-t px-2 py-1.5 text-xs">
          <EntityLabel
            imageUrl={prod.imageUrl}
            title={prod.title}
            fallbackLabel={skugr.prodName}
            imageSize="sm"
          />
        </div>
      ) : null}
    </Card>
  );
}
