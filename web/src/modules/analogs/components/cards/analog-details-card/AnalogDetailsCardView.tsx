import { ArtikulImageLink } from "@/components/shared/artikul-image-link/ArtikulImageLink";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { EnrichedAnalogDto } from "@/modules/analogs/api/types";
import { KonkBanner } from "@/modules/analogs/components/common/konk-banner";
import {
  AnalogStockContainer,
  AnalogStockSkeleton,
} from "@/modules/analogs/components/containers/analog-stock-container";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import { AnalogStockFetcher } from "@/modules/analogs/components/fetchers/analog-stock-fetcher";
import { ExternalLink } from "lucide-react";

interface AnalogDetailsCardViewProps {
  analog: EnrichedAnalogDto;
}

export function AnalogDetailsCardView({ analog }: AnalogDetailsCardViewProps) {
  return (
    <Card className="gap-0 overflow-hidden p-0 shadow-md">
      <KonkBanner
        konkName={analog.konkName}
        imageUrl={analog.konk?.imageUrl}
        title={analog.konk?.title}
      />
      <CardHeader className="flex flex-col gap-6 p-6 pb-4 md:flex-row md:items-start">
        <div className="w-full">
          <ArtikulImageLink
            artikul={analog.artikul || ""}
            nameukr={analog.nameukr}
            target="_blank"
          />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="grid gap-4 p-6">
        <a
          href={analog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary inline-flex items-center gap-1.5 text-sm hover:underline"
        >
          <ExternalLink className="size-4 shrink-0" />
          Відкрити на сайті конкурента
        </a>

        <AnalogStockFetcher
          analogId={analog._id}
          ContainerComponent={AnalogStockContainer}
          SkeletonComponent={AnalogStockSkeleton}
        />
      </CardContent>

      <>
        <Separator />
        <CardFooter className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-1 border-t-0 p-6 pt-4">
          <div className="grid gap-1.5">
            <EntityLabel
              imageUrl={analog.prod?.imageUrl}
              title={analog.prod?.title}
              fallbackLabel={analog.prodName}
              imageSize="sm"
            />
          </div>
        </CardFooter>
      </>
    </Card>
  );
}
