import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { ArtNameukr } from "@/modules/arts/components/elements/art-nameukr/ArtNameukr";
import type { DeficitItem } from "@/modules/defs/api/types/dto";
import { DefAskButton } from "@/modules/defs/components/elements/def-ask-button/DefAskButton";
import { Link } from "react-router";
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
    ? "shadow-red-300/30 dark:shadow-red-600/40 hover:shadow-red-400/40 dark:hover:shadow-red-500/50"
    : "shadow-amber-300/30 dark:shadow-amber-500/40 hover:shadow-amber-400/40 dark:hover:shadow-amber-400/50";

const backgroundClasses =
  defItem.status === "critical"
    ? "bg-red-500/10 dark:bg-red-400/15 backdrop-blur-md border border-red-500/20"
    : "bg-yellow-500/10 dark:bg-yellow-400/15 backdrop-blur-md border border-yellow-500/20";

  return (
    <Card
      className={cn(
        "bg-background h-full flex-col justify-between p-2 shadow-none  transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-2xl",
        "gap-2 text-sm",
        shadowClasses,
        backgroundClasses,
      )}
    >
      {/* Image and name */}
      <div className="flex items-center justify-between gap-2 text-sm">
        <ArtDialogImage artikul={artikul} />
        <Link
          to={`/arts/${artikul}`}
          target="_blank"
          className="hover:underline"
        >
          <ArtNameukr nameukr={defItem.nameukr || artikul} />
        </Link>
        <div className="flex items-center gap-1">
          {/* Статус индикатор */}
          <DefCardIndicator defItem={defItem} />
          <DefAskButton artikul={artikul} existingAsk={defItem.existingAsk} />
        </div>
      </div>

      <DefCardQuants defItem={defItem} />
      <DefCardAskBid ask={defItem.existingAsk} />
    </Card>
  );
}
