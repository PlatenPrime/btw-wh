import { CardActionsMenu } from "@/components/shared/card-actions/CardActionsMenu";
import type { CardAction } from "@/components/shared/card-actions/types";
import { AnalogImageLink } from "@/components/shared/analog-image-link/AnalogImageLink";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import type { AnalogDto } from "@/modules/analogs/api/types";
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
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <div className="flex min-w-0 items-start gap-2">
        <CardHeader className="min-w-0 flex-1 p-0">
          <CardContent className="grid gap-2 p-0">
            <AnalogImageLink
              analog={analog}
              to={`/arts/analogs/${analog._id}`}
            />
          </CardContent>
        </CardHeader>
        <div className="shrink-0">
          <CardActionsMenu
            actions={actions}
            orientation="horizontal"
            size="sm"
            align="end"
          />
        </div>
      </div>
      <div className="text-muted-foreground grid gap-2 pt-2 text-xs">
        <EntityLabel
          imageUrl={konk?.imageUrl}
          title={konk?.title}
          fallbackLabel={analog.konkName}
        />
        <EntityLabel
          imageUrl={prod?.imageUrl}
          title={prod?.title}
          fallbackLabel={analog.prodName}
        />
      </div>
    </Card>
  );
}
