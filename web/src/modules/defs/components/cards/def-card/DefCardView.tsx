import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { ArtNameukr } from "@/modules/arts/components/elements/art-nameukr/ArtNameukr";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import type { DeficitItem } from "@/modules/defs/api/types/dto";

interface DefCardViewProps {
  artikul: string;
  defItem: DeficitItem;
}

export function DefCardView({ artikul, defItem }: DefCardViewProps) {
  return (
    <Card
      className={cn(
        "bg-background shadow-muted-foreground h-full p-2 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-2xl  dark:ring-gray-700",
        "text-sm",
      )}
    >
      {/* Image and name */}
      <div className="flex items-center justify-between gap-2  text-sm">
        <ArtDialogImage artikul={artikul} />
        <ArtNameukr nameukr={defItem.nameukr || artikul} />
        <div className="grid place-items-center">
          <CreateAskDialog preFilledArtikul={artikul} />
        </div>
      </div>

      {/* Stock info */}
      <div className="space-y-1 px-2 pb-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">На складі:</span>
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
          <span className="text-muted-foreground">Сайт:</span>
          <span className="font-medium">{defItem.sharikQuant}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Дефіцит:</span>
          <span className="font-medium text-red-600 dark:text-red-400">
            {defItem.difQuant}
          </span>
        </div>
      </div>
    </Card>
  );
}
