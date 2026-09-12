import { AnalogImageLink } from "@/components/shared/media/analog-image-link/AnalogImageLink";
import { CardActionsMenu } from "@/components/shared/actions/card-actions";
import type { CardAction } from "@/components/shared/actions/card-actions";
import { GridTileCard } from "@/components/shared/cards";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";
import type { AnalogDto } from "@/modules/analogs/api/types";
import { KonkBanner } from "@/components/shared/domain/konk-banner";
import { EntityLabel } from "@/components/shared/entities/entity-label";
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
  return (
    <GridTileCard className="flex flex-col gap-2 overflow-hidden p-0">
      <KonkBanner
        konkName={analog.konkName}
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

      <div className="flex flex-col items-center gap-2 px-2">
        <AnalogImageLink analog={analog} to={`/analogs/${analog._id}`} />
      </div>

      <div className={cn("flex justify-center pb-2", typography.gridSubtitle)}>
        <EntityLabel
          imageUrl={prod?.imageUrl}
          title={prod?.title}
          fallbackLabel={analog.prodName}
          imageSize="sm"
        />
      </div>
    </GridTileCard>
  );
}
