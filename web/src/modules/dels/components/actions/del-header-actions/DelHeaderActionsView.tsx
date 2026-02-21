import { UpdateAllDelArtikulsConfirmDialog } from "@/modules/dels/components/dialogs/update-all-del-artikuls-confirm-dialog/UpdateAllDelArtikulsConfirmDialog";
import { RunChainDelConfirmDialog } from "@/modules/dels/components/dialogs/run-chain-del-confirm-dialog/RunChainDelConfirmDialog";

interface DelHeaderActionsViewProps {
  updateAllConfirmOpen: boolean;
  onUpdateAllConfirmOpenChange: (open: boolean) => void;
  onUpdateAllConfirm: () => void;
  onUpdateAllCancel: () => void;
  updateAllIsPending: boolean;
  runChainConfirmOpen: boolean;
  onRunChainConfirmOpenChange: (open: boolean) => void;
  onRunChainConfirm: () => void;
  onRunChainCancel: () => void;
  runChainIsPending: boolean;
}

export function DelHeaderActionsView({
  updateAllConfirmOpen,
  onUpdateAllConfirmOpenChange,
  onUpdateAllConfirm,
  onUpdateAllCancel,
  updateAllIsPending,
  runChainConfirmOpen,
  onRunChainConfirmOpenChange,
  onRunChainConfirm,
  onRunChainCancel,
  runChainIsPending,
}: DelHeaderActionsViewProps) {
  return (
    <>
      <UpdateAllDelArtikulsConfirmDialog
        open={updateAllConfirmOpen}
        onOpenChange={onUpdateAllConfirmOpenChange}
        onConfirm={onUpdateAllConfirm}
        onCancel={onUpdateAllCancel}
        isPending={updateAllIsPending}
      />
      <RunChainDelConfirmDialog
        open={runChainConfirmOpen}
        onOpenChange={onRunChainConfirmOpenChange}
        onConfirm={onRunChainConfirm}
        onCancel={onRunChainCancel}
        isPending={runChainIsPending}
      />
    </>
  );
}
