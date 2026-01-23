import { ArtikulImageLink } from "@/components/shared/artikul-image-link/ArtikulImageLink";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DeficitItem } from "@/modules/defs/api/types/dto";
import { DefAskButton } from "@/modules/defs/components/elements/def-ask-button/DefAskButton";
import { DefCardAskBid } from "./components/DefCardAskBid";
import { DefCardIndicator } from "./components/DefCardIndicator";
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

  return (
    <Card
      className={cn(
        "bg-background h-full grid p-2 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-md dark:ring-gray-700",
        "gap-2 text-sm",
        shadowClasses,
      )}
    >
      <div className="flex items-center justify-between gap-2 text-sm">
        <ArtikulImageLink
          artikul={artikul}
          nameukr={defItem.nameukr}
          bage={<DefCardIndicator defItem={defItem} />}
        />
      </div>

      <DefCardQuants defItem={defItem} />
      {defItem.existingAsk ? (
        <DefCardAskBid ask={defItem.existingAsk} />
      ) : (
        <DefAskButton artikul={artikul} existingAsk={defItem.existingAsk} />
      )}
    </Card>
  );
}
