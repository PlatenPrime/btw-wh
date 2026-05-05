import { useCallback, type Dispatch, type SetStateAction } from "react";

interface UseSelectSkugrsDialogParams {
  draft: string[];
  setDraft: Dispatch<SetStateAction<string[]>>;
  onConfirm: (ids: string[]) => void;
  onOpenChange: (open: boolean) => void;
}

export function useSelectSkugrsDialog({
  draft,
  setDraft,
  onConfirm,
  onOpenChange,
}: UseSelectSkugrsDialogParams) {
  const handleApply = useCallback(() => {
    onConfirm(draft);
    onOpenChange(false);
  }, [draft, onConfirm, onOpenChange]);

  const handleReset = useCallback(() => {
    setDraft([]);
  }, [setDraft]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return { handleApply, handleReset, handleCancel };
}
