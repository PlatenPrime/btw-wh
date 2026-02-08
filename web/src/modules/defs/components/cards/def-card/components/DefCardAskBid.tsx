import type { ExistingAsk } from "@/modules/defs/api/types/dto";
import { formatDate } from "@/utils/formatDate";

interface DefCardAskBidProps {
  ask: ExistingAsk;
}

export function DefCardAskBid({ ask }: DefCardAskBidProps) {
  const formattedDate = formatDate(ask.createdAt);

  return (
    <div className="grid rounded-md border border-violet-200 bg-violet-100 p-2 text-xs text-violet-950 dark:border-violet-100/20 dark:bg-violet-800/5 dark:text-violet-100">
      <span>{formattedDate}</span>
      <span>{ask.askerName}</span>
    </div>
  );
}
