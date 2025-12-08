import { cn } from "@/lib/utils";
import type {
    AskPullStatusMessage
} from "@/modules/asks/utils/get-ask-pull-status-message/getAskPullStatusMessage";
import { CheckCircle2, Circle, PackageX } from "lucide-react";

interface AskPullStatusMessageProps {
    statusMessage: AskPullStatusMessage;
}

export function AskPullStatusMessage({
    statusMessage,
}: AskPullStatusMessageProps) {
    return (
         <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-4",
                    statusMessage.variant === "success" &&
                      "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20",
                    statusMessage.variant === "warning" &&
                      "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20",
                  )
                }
                >
                  {statusMessage.variant === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 " /> : statusMessage.variant === "warning" ? <PackageX className="h-5 w-5 shrink-0 text-yellow-600" /> : <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />}
                  <div className="flex-1">
                    <p className="">{statusMessage.message}</p>
            
                  </div>
                </div>
    )
}