import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";

export function AskImageStatus({
  statusText,
  artikul,
}: {
  statusText: string;
  artikul: string;
}) {
  return (
    <div className="flex flex-shrink-0 flex-col items-center gap-2">
      <ArtDialogImage artikul={artikul} />
      <div className="flex-shrink-0">
        <span className="text-xs">{statusText}</span>
      </div>
    </div>
  );
}
