import { Dialog } from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";
import { MovePalletPosesDialogTrigger } from "./MovePalletPosesDialogTrigger";
import { MovePalletPosesDialogView } from "./MovePalletPosesDialogView";
import { useMovePalletPosesDialog } from "./useMovePalletPosesDialog";

interface MovePalletPosesDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function MovePalletPosesDialog({
  pallet,
  trigger,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: MovePalletPosesDialogProps) {
  const {
    isMoving,
    isSourceEmpty,
    mutationError,
    handleSubmit,
    handleOpenChange,
  } = useMovePalletPosesDialog({
    pallet,
    onOpenChange,
    onSuccess,
  });

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={handleOpenChange}>
      {trigger !== undefined && (
        <MovePalletPosesDialogTrigger trigger={trigger} />
      )}
      <MovePalletPosesDialogView
        pallet={pallet}
        isSourceEmpty={isSourceEmpty}
        mutationError={mutationError}
        isMoving={isMoving}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
