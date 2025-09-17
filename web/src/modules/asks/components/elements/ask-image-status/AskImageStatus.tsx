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
      style: "bg-yellow-500/80",
      text: "новий",
    },

    completed: {
      style: "bg-emerald-500/50",
      text: "завершено",
    },
    solved: {
      style: "bg-emerald-500/50",
      text: "завершено",
    },
    rejected: {
      style: "bg-rose-500/50",
      text: "відмовлено",
    },
    fail: {
      style: "bg-rose-500/50",
      text: "відмовлено",
    },
  };

  return (
    <div className="flex flex-shrink-0 flex-col items-center gap-2">
      <ArtDialogImage artikul={artikul} />
      <div className={cn(statusConfig[statusText as keyof typeof statusConfig].style, "flex w-full justify-center items-center px-1  rounded-md")}>
        <span className="text-xs font-semibold">{statusConfig[statusText as keyof typeof statusConfig].text}</span>
      </div>
    </div>
  );
}
