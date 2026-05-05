import { Dialog } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { SelectSkugrsDialogView } from "./SelectSkugrsDialogView";
import { useSelectSkugrsDialog } from "./useSelectSkugrsDialog";

interface SelectSkugrsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  konkName: string;
  /** Для GET /skugrs: при режимі prod=all передавати порожній рядок — усі групи конкурента */
  prodNameForList: string;
  value: string[];
  onConfirm: (ids: string[]) => void;
}

export function SelectSkugrsDialog({
  open: controlledOpen,
  onOpenChange,
  konkName,
  prodNameForList,
  value,
  onConfirm,
}: SelectSkugrsDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>([]);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (next: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  useEffect(() => {
    if (open) {
      setDraft([...value]);
    }
  }, [open, value]);

  const { handleApply, handleReset, handleCancel } = useSelectSkugrsDialog({
    draft,
    setDraft,
    onConfirm,
    onOpenChange: handleOpenChange,
  });

  const listEnabled = Boolean(konkName);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <SelectSkugrsDialogView
        konkName={konkName}
        prodNameForList={prodNameForList}
        draft={draft}
        onDraftChange={setDraft}
        listEnabled={listEnabled}
        dialogOpen={open}
        onApply={handleApply}
        onReset={handleReset}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
