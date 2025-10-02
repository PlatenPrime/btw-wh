import type { ExistingAsk } from "@/modules/defs/api/types/dto";
import { formatDate } from "@/utils/formatDate";
import { Clock, Info, User } from "lucide-react";

interface DefCardAskBidProps {
  ask: ExistingAsk | null;
}

export function DefCardAskBid({ ask }: DefCardAskBidProps) {

 if (!ask) return null;


  const formattedDate = formatDate(ask.createdAt);

  return (
    <div className="rounded-md border border-violet-300 bg-violet-50 p-2 dark:border-violet-800 dark:bg-violet-950/20">
      <div className="flex items-center gap-1">
        <Info className="h-3 w-3 text-violet-600 dark:text-violet-400" />
        <span className="text-xs font-medium text-violet-800 dark:text-violet-200">
          Заявка створена
        </span>
      </div>
      <div className="space-y-1 text-xs text-violet-800 dark:text-violet-200">
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          <span>{ask.askerName}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
