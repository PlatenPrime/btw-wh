import  { cn } from "@/lib/utils";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";

export function AskImageStatus({
  statusText,
  artikul,
}: {
  statusText: string;
  artikul: string;
}) {
  const statusConfig = {
    new: {
      style: "border border-yellow-500/80 bg-yellow-500/10 text-yellow-900 dark:text-yellow-200",
      text: "новий",
    },

    completed: {
      style: "border border-emerald-500/50 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
      text: "завершено",
    },
    solved: {
      style: "border border-emerald-500/50 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
      text: "завершено",
    },
    rejected: {
      style: "border border-rose-500/50 bg-rose-500/10 text-rose-900 dark:text-rose-200",
      text: "відмовлено",
    },
    fail: {
      style: "border border-rose-500/50 bg-rose-500/10 text-rose-900 dark:text-rose-200",
      text: "відмовлено",
    },
  };

  return (
    <div className="flex flex-shrink-0 flex-col items-center gap-2">
      <ArtDialogImage artikul={artikul} />
      <div className={cn(statusConfig[statusText as keyof typeof statusConfig].style, "flex w-full justify-center items-center px-1  rounded-md")}>
        <span className="text-xs font-semibold w-18 text-center ">{statusConfig[statusText as keyof typeof statusConfig].text}</span>
      </div>
    </div>
  );
}
