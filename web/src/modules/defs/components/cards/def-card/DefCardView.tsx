import { Badge } from "@/components/ui/badge";
import { Card, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import type { DeficitItem } from "@/modules/defs/api/types/dto";

interface DefCardViewProps {
  artikul: string;
  defItem: DeficitItem;

}

export function DefCardView({ artikul, defItem }: DefCardViewProps) {
  const isCritical = defItem.difQuant <= 0;
  const isNearLimit = defItem.limit && defItem.quant <= defItem.limit;

  const getStatusBadge = () => {
    if (isCritical) {
      return (
        <Badge variant="destructive" className="text-xs">
          Критический
        </Badge>
      );
    }
    if (isNearLimit) {
      return (
        <Badge
          variant="outline"
          className="border-yellow-600 text-xs text-yellow-600"
        >
          Ограничен
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="text-xs">
        Дефицит
      </Badge>
    );
  };

  return (
    <Card
      className={cn(
        "bg-background shadow-muted-foreground h-full p-0 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:shadow-2xl md:hover:-translate-y-1 md:hover:scale-105 dark:ring-gray-700",
        isCritical && "ring-red-200 dark:ring-red-700",
      )}
    >
      <div className="flex h-full flex-col gap-2">
        {/* Header with status badge */}
        <div className="flex items-start justify-between gap-2 p-2">
          <span className="text-muted-foreground font-mono text-xs">
            {artikul}
          </span>
          {getStatusBadge()}
        </div>

        {/* Image and name */}
        <div className="flex flex-1 flex-col items-center gap-2 px-2">
          <ArtDialogImage artikul={artikul} />
          <CardDescription className="text-center text-xs">
            {defItem.nameukr || artikul}
          </CardDescription>
        </div>

        {/* Stock info */}
        <div className="space-y-1 px-2 pb-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">На складе:</span>
            <span
              className={cn(
                "font-medium",
                defItem.quant === 0 && "text-red-600 dark:text-red-400",
              )}
            >
              {defItem.quant}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Нужно:</span>
            <span className="font-medium">{defItem.sharikQuant}</span>
          </div>
          {defItem.limit && (
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Лимит:</span>
              <span className="font-medium">{defItem.limit}</span>
            </div>
          )}
        </div>

        {/* Create ask button */}
        <div className="p-2 pt-0">
          <CreateAskDialog preFilledArtikul={artikul} />
        </div>
      </div>
    </Card>
  );
}
