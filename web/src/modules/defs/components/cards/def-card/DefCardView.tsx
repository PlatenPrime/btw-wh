import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { ArtNameukr } from "@/modules/arts/components/elements/art-nameukr/ArtNameukr";
import type { DeficitItem } from "@/modules/defs/api/types/dto";
import { DefAskButton } from "@/modules/defs/components/elements/def-ask-button/DefAskButton";
import { DefCardAskBid } from "./components/DefCardAskBid";
import { DefCardQuants } from "./components/DefCardQuants";
import { DefCardIndicator } from "./components/DefCardIndicator";

interface DefCardViewProps {
  artikul: string;
  defItem: DeficitItem;
}

export function DefCardView({ artikul, defItem }: DefCardViewProps) {
  // Цветовые тени и рамка в зависимости от статуса
  const shadowClasses =
    defItem.status === "critical"
      ? "shadow-red-200 dark:shadow-red-900/50 hover:shadow-red-300 dark:hover:shadow-red-800/50"
      : "shadow-yellow-200 dark:shadow-yellow-900/50 hover:shadow-yellow-300 dark:hover:shadow-yellow-800/50";

  const borderClasses =
    defItem.status === "critical"
      ? "ring-red-300 dark:ring-red-700"
      : "ring-yellow-300 dark:ring-yellow-700";

  return (
    <Card
      className={cn(
        "bg-background h-full flex-col justify-between p-2 shadow-none ring-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-2xl",
        "gap-2 text-sm",
        shadowClasses,
        borderClasses,
      )}
    >
      {/* Image and name */}
      <div className="flex items-center justify-between gap-2 text-sm">
        <ArtDialogImage artikul={artikul} />
        <ArtNameukr nameukr={defItem.nameukr || artikul} />
        <div className="flex items-center gap-1">
          {/* Статус индикатор */}
          <DefCardIndicator defItem={defItem} />
          <DefAskButton artikul={artikul} existingAsk={defItem.existingAsk} />
        </div>
      </div>

      <DefCardAskBid ask={defItem.existingAsk} />
      <DefCardQuants defItem={defItem} />
    </Card>
  );
}
