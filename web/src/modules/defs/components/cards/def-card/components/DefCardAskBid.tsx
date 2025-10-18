import type { ExistingAsk } from "@/modules/defs/api/types";
import { formatDate } from "@/utils/formatDate";
import {  FileQuestion, Clock } from "lucide-react";

interface DefCardAskBidProps {
  ask: ExistingAsk | null;
}

export function DefCardAskBid({ ask }: DefCardAskBidProps) {
  if (!ask)
    return (
      <div className="rounded-md  p-2 ">
        <div className="space-y-1 text-xs text-violet-800 dark:text-violet-200">
          <div className="flex items-center gap-1">
            <FileQuestion className="h-3 w-3" />
            <span>Запита немає</span>
          </div>
        </div>
      </div>
    );

  const formattedDate = formatDate(ask.createdAt);

  return (
    <div className="rounded-md  bg-violet-500 p-2  dark:bg-violet-100">
      <div className="flex items-center gap-2 text-xs text-violet-50 dark:text-violet-950">
        <div className="flex items-center gap-1">
          <FileQuestion className="h-3 w-3" />
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
