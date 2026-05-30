import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SkugrMultiSelectControl } from "@/modules/skugrs/components/controls/skugr-multi-select-control";

interface SelectSkugrsDialogViewProps {
  konkName: string;
  prodNameForList: string;
  draft: string[];
  onDraftChange: (ids: string[]) => void;
  listEnabled: boolean;
  /** Не запитувати список, поки діалог закритий */
  dialogOpen: boolean;
  onApply: () => void;
  onReset: () => void;
  onCancel: () => void;
}

export function SelectSkugrsDialogView({
  konkName,
  prodNameForList,
  draft,
  onDraftChange,
  listEnabled,
  dialogOpen,
  onApply,
  onReset,
  onCancel,
}: SelectSkugrsDialogViewProps) {
  return (
    <DialogContent className="flex max-h-[min(90vh,720px)] flex-col gap-4 sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Товарні групи</DialogTitle>
      </DialogHeader>
      <p className="text-muted-foreground text-sm">
        Оберіть одну або кілька груп для звуження звіту. Без виробника або в
        режимі «Всі виробники» показані всі групи конкурента.
      </p>
      <SkugrMultiSelectControl
        konkName={konkName}
        prodName={prodNameForList}
        value={draft}
        onChange={onDraftChange}
        enabled={listEnabled && dialogOpen}
      />
      <div className="flex flex-wrap justify-end gap-2 border-t pt-2">
        <Button type="button" variant="outline" onClick={onReset}>
          Очистити
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Скасувати
        </Button>
        <Button type="button" onClick={onApply}>
          Застосувати
        </Button>
      </div>
    </DialogContent>
  );
}
