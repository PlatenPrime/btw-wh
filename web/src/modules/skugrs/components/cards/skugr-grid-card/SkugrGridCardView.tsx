import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  getKonkTheme,
  KonkBanner,
} from "@/modules/analogs/components/common/konk-banner";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import type { SkugrDto } from "@/modules/skugrs/api/types";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { ExternalLink, Package } from "lucide-react";
import { Link } from "react-router";

interface SkugrGridCardViewProps {
  skugr: SkugrDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
}

export function SkugrGridCardView({ skugr, konk, prod }: SkugrGridCardViewProps) {
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
      <CardHeader className="grid gap-2 px-3 pt-3">
        <CardTitle className="line-clamp-2 text-base leading-tight">
          <Link
            to={`/sku/skugrs/${skugr._id}`}
            className="hover:text-primary underline-offset-4 hover:underline"
          >
            {skugr.title}
          </Link>
        </CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          {prod && (
            <EntityLabel
              imageUrl={prod.imageUrl}
              title={prod.title}
              fallbackLabel={skugr.prodName}
              imageSize="sm"
            />
          )}
          {!prod && (
            <span className="text-muted-foreground text-sm">{skugr.prodName}</span>
          )}
          <Badge variant="secondary" className="gap-1">
            <Package className="size-3.5" aria-hidden />
            {skuCount} SKU
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 px-3">
        <p className="text-muted-foreground line-clamp-2 text-xs break-all">
          {skugr.url}
        </p>
      </CardContent>
      <CardFooter className="mt-auto flex flex-wrap gap-2 border-t px-3 py-3">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/sku/skugrs/${skugr._id}`}>Відкрити</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href={skugr.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1 size-4" />
            Сайт
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
