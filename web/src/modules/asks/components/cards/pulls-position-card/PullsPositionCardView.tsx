import { ArtikulImageLink } from "@/components/shared/media/artikul-image-link/ArtikulImageLink";
import { IconWell } from "@/components/shared/elements";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { IPositionForPullsPage } from "@/modules/asks/api/types/dto";
import { AskPosEditDialog } from "@/modules/asks/components/dialogs/ask-pos-edit-dialog/AskPosEditDialog";
import type { PosResponse } from "@/modules/poses/api/types";
import { ArrowDownToLine, Circle, MapPin, Package } from "lucide-react";

interface PullsPositionCardViewProps {
  position: IPositionForPullsPage;
  posResponse: PosResponse;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

export function PullsPositionCardView({
  position,
  posResponse,
  open,
  setOpen,
  onSuccess,
}: PullsPositionCardViewProps) {
  const zoneLabel = position.artZone ?? "—";

  return (
    <Card className="p-0">
      <CardContent className="flex flex-col gap-2 p-2">
        <div className="flex items-center justify-between gap-2">
          <h4 className={cn("min-w-0 flex-1", typography.listTitleEmphasized)}>
            {position.palletTitle}
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            className="shrink-0"
          >
            Зняти товар
          </Button>
        </div>

        <ArtikulImageLink
          artikul={position.artikul}
          nameukr={position.nameukr}
          target="_self"
          link={`/arts/${position.artikul}`}
        />

        <div
          className={cn(
            "text-foreground flex items-center gap-1.5",
            typography.body,
          )}
        >
          <IconWell icon={MapPin} tone="warning" size="sm" />
          <span className="min-w-0 truncate">{zoneLabel}</span>
        </div>

        <div
          className={cn(
            "text-foreground flex flex-wrap items-center gap-3",
            typography.body,
          )}
        >
          <span
            className="inline-flex items-center gap-1"
            title="Є на палеті"
            aria-label={`Є на палеті: ${position.quant}`}
          >
            <IconWell icon={Package} tone="info" size="sm" />
            {position.quant}
          </span>
          {position.plannedQuant !== null ? (
            <span
              className="inline-flex items-center gap-1"
              title="Зняти"
              aria-label={`Зняти: ${position.plannedQuant}`}
            >
              <IconWell icon={ArrowDownToLine} tone="success" size="sm" />
              {position.plannedQuant}
            </span>
          ) : null}
          {position.askRemainingQuantity !== null ? (
            <span
              className="inline-flex items-center gap-1"
              title="Залишок по заявці"
              aria-label={`Залишок по заявці: ${position.askRemainingQuantity}`}
            >
              <IconWell icon={Circle} tone="warning" size="sm" />
              {position.askRemainingQuantity}
            </span>
          ) : null}
        </div>

        <AskPosEditDialog
          pos={posResponse}
          askId={position.askId}
          open={open}
          setOpen={setOpen}
          onSuccess={onSuccess}
          initialRemovedQuant={position.plannedQuant ?? undefined}
        />
      </CardContent>
    </Card>
  );
}
