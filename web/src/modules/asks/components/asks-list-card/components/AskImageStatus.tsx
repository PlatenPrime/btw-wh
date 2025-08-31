import { Badge, type BadgeProps } from "@/components/ui/badge";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";

export function AskImageStatus({
  statusVariant,
  statusText,
  artikul,
}: {
  statusVariant: BadgeProps["variant"];
  statusText: string;
  artikul: string;
}) {
  return (
    <div className="flex flex-shrink-0 flex-col items-center gap-2">
      <ArtDialogImage artikul={artikul} />
      <div className="flex-shrink-0">
        <Badge variant={statusVariant} className="text-xs">
          {statusText}
        </Badge>
      </div>
    </div>
  );
}
