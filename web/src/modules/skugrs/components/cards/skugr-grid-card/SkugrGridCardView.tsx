import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
}

export function SkugrGridCardView({
  skugr,
  konk,
  prod,
}: SkugrGridCardViewProps) {
  const theme = getKonkTheme(skugr.konkName);
  const skuCount = skugr.skus?.length ?? 0;

  return (
    <Card
      className={cn(
        "flex h-full flex-col overflow-hidden p-0 transition-shadow",
        theme.shadow,
      )}
    >
      <KonkBanner
        konkName={skugr.konkName}
        imageUrl={konk?.imageUrl}
        title={konk?.title}
      />
      <CardHeader className="grid gap-2 p-2">
        <CardTitle className="line-clamp-2 text-center text-base leading-tight">
          <Link
            to={`/sku/skugrs/${skugr._id}`}
            className="hover:text-primary underline-offset-4 hover:underline"
          >
            {skugr.title}
          </Link>
        </CardTitle>
        <CardContent className="flex items-center justify-center gap-1 text-sm">
          <Notebook className="size-3.5" aria-hidden />
          {skuCount}
        </CardContent>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {prod && (
            <EntityLabel
              imageUrl={prod.imageUrl}
              title={prod.title}
              fallbackLabel={skugr.prodName}
              imageSize="md"
              className="text-xs"
            />
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
