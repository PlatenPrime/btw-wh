import { ArtikulImageLink } from "@/components/shared/artikul-image-link/ArtikulImageLink";
import { ListRowCard } from "@/components/shared/cards";
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
    <ListRowCard
      className={cn(
        "h-full grid gap-2 p-2 text-sm",
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

      <div className="flex min-h-0 flex-row items-stretch gap-2">
        <div className="min-w-0 flex-1">
          <DefCardQuants defItem={defItem} />
        </div>
        <div className="grid shrink-0 place-items-center rounded-md">
          {defItem.existingAsk ? (
            <DefCardAskBid ask={defItem.existingAsk} />
          ) : (
            <DefAskButton artikul={artikul} existingAsk={defItem.existingAsk} />
          )}
        </div>
      </div>
    </ListRowCard>
  );
}
