import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  SegmentDto,
  ZoneWithSegmentDto,
} from "@/modules/blocks/api/types";

interface RemoveZoneFromSegmentDialogViewProps {
  segment: SegmentDto;
  zone: ZoneWithSegmentDto;
  isRemoving: boolean;
  isZoneLinked: boolean;
  onRemove: () => Promise<void>;
  onCancel: () => void;
}

export function RemoveZoneFromSegmentDialogView({
  segment,
  zone,
  isRemoving,
  isZoneLinked,
  onRemove,
  onCancel,
}: RemoveZoneFromSegmentDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[420px]">
      <DialogHeader>
        <DialogTitle>Видалити зону з сегмента?</DialogTitle>
        <DialogDescription>
          {zone.title ? (
            <>
              Зона <span className="font-semibold">{zone.title}</span> буде
              відв'язана від сегмента.
            </>
          ) : (
            "Обрана зона буде відв'язана від сегмента."
          )}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-2 text-sm">
        <div className="grid gap-1">
          <span className="text-muted-foreground">Сегмент:</span>
          <span>
            #{segment.order} / блок {segment.blockData.title}
          </span>
        </div>
        <div className="grid gap-1">
          <span className="text-muted-foreground">Штрих-код зони:</span>
          <span>{zone.bar}</span>
        </div>
      </div>
      <DialogActions
        onCancel={onCancel}
        onSubmit={onRemove}
        isSubmitting={isRemoving}
        isDisabled={!isZoneLinked}
        submitText="Відв'язати"
        variant="destructive"
        className="justify-end"
      />
    </DialogContent>
  );
}
