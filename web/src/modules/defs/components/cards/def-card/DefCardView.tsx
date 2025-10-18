import ArtikulImageLink from "@/components/shared/artikul-image-link/ArtikulImageLink";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DeficitItem } from "@/modules/defs/api/types";
import { DefAskButton } from "@/modules/defs/components/elements/def-ask-button/DefAskButton";
import { DefCardAskBid } from "./components/DefCardAskBid";
import { DefCardQuants } from "./components/DefCardQuants";

interface DefCardViewProps {
  artikul: string;
  defItem: DeficitItem;
}

export function DefCardView({ artikul, defItem }: DefCardViewProps) {
  const shadowClasses =
    defItem.status === "critical"
      ? "shadow-rose-300/30 dark:shadow-rose-600/40 hover:shadow-rose-400/40 dark:hover:shadow-rose-500/50"
      : "shadow-amber-300/30 dark:shadow-amber-500/40 hover:shadow-amber-400/40 dark:hover:shadow-amber-400/50";

  const backgroundClasses =
    defItem.status === "critical"
      ? "bg-rose-500/10 dark:bg-rose-400/5 backdrop-blur-md border border-rose-500/20"
      : "bg-yellow-500/10 dark:bg-yellow-400/5 backdrop-blur-md border border-yellow-500/20";

  return (
    <Card
      className={cn(
        "bg-background h-full flex-col justify-between p-2 shadow-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-md",
        "gap-2 text-sm",
        shadowClasses,
        backgroundClasses,
      )}
    >
      {/* Image and name */}
      <div className="flex items-center justify-between gap-2 text-sm">
        <ArtikulImageLink artikul={artikul} nameukr={defItem.nameukr} />
        <div className="flex items-center gap-1">
          {/* Статус индикатор */}

          <DefAskButton artikul={artikul} existingAsk={defItem.existingAsk} />
        </div>
      </div>

      <DefCardQuants defItem={defItem} />
      <DefCardAskBid ask={defItem.existingAsk} />
    </Card>
  );
}
