import { AnalogImageLink } from "@/components/shared/analog-image-link/AnalogImageLink";
import { CardActionsMenu } from "@/components/shared/card-actions/CardActionsMenu";
import type { CardAction } from "@/components/shared/card-actions/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AnalogDto } from "@/modules/analogs/api/types";
import {
  getKonkTheme,
  KonkBanner,
} from "@/modules/analogs/components/common/konk-banner";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";

interface AnalogGridCardViewProps {
  analog: AnalogDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
  actions: CardAction[];
}

export function AnalogGridCardView({
  analog,
  konk,
  prod,
  actions,
}: AnalogGridCardViewProps) {
  const theme = getKonkTheme(analog.konkName);

  return (
    <Card
      className={cn(
        "flex flex-col gap-2 overflow-hidden p-0 transition-shadow",
        theme.shadow,
      )}
    >
      <KonkBanner
        konkName={analog.konkName}
        imageUrl={konk?.imageUrl}
        title={konk?.title}
      />

      <div className="flex flex-col items-center gap-2 px-2">
        <div className="flex min-w-0 items-start justify-center gap-2">
          <AnalogImageLink analog={analog} to={`/arts/analogs/${analog._id}`} />
          <div className="shrink-0">
            <CardActionsMenu
              actions={actions}
              orientation="horizontal"
              size="sm"
              align="end"
            />
          </div>
        </div>
      </div>

      <div className="text-muted-foreground flex justify-center pb-2 text-xs">
        <EntityLabel
          imageUrl={prod?.imageUrl}
          title={prod?.title}
          fallbackLabel={analog.prodName}
          imageSize="sm"
        />
      </div>
    </Card>
  );
}
