import { cn } from "@/lib/utils";
import type { AskPullStatusMessage } from "@/modules/asks/utils/get-ask-pull-status-message/getAskPullStatusMessage";
import { CheckCircle2, Circle, PackageX } from "lucide-react";

interface AskPullStatusMessageProps {
  statusMessage: AskPullStatusMessage;
}

export function AskPullStatusMessage({
  statusMessage,
}: AskPullStatusMessageProps) {
  const statusMessageVariants = {
    success: {
      border:
        "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20",
      icon: <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />,
    },
    warning: {
      border:
        "border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/20",
      icon: <PackageX className="h-5 w-5 shrink-0 text-rose-600" />,
    },

    default: {
      border:
        "border-muted-foreground bg-muted-foreground/10 dark:border-muted-foreground/20 dark:bg-muted-foreground/10",
      icon: <Circle className="text-muted-foreground h-5 w-5 shrink-0" />,
    },
  };

  const statusMessageVariant =
    statusMessageVariants[
      statusMessage.variant as keyof typeof statusMessageVariants
    ];

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-4",
        statusMessageVariant.border,
      )}
    >
      {statusMessageVariant.icon}
      <div className="flex-1">
        <p className="text-sm">{statusMessage.message}</p>
      </div>
    </div>
  );
}
