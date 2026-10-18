import { ChangePalletGroupDialogView } from "@/modules/pallets/components/dialogs/change-pallet-group-dialog/ChangePalletGroupDialogView";

interface ChangePalletGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  palletId: string;
  palletTitle: string;
  currentGroupId?: string;
  onSuccess?: () => void;
}

export function ChangePalletGroupDialog({
  open,
  onOpenChange,
  palletId,
  palletTitle,
  currentGroupId,
  onSuccess,
}: ChangePalletGroupDialogProps) {
  const handleSuccess = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <ChangePalletGroupDialogView
      open={open}
      onOpenChange={onOpenChange}
      palletId={palletId}
      palletTitle={palletTitle}
      currentGroupId={currentGroupId}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
