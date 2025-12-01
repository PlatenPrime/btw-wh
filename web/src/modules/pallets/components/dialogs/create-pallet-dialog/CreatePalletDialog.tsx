import { Dialog } from "@/components/ui/dialog";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { CreatePalletDialogTrigger } from "./CreatePalletDialogTrigger";
import { CreatePalletDialogView } from "./CreatePalletDialogView";
import { useCreatePalletDialog } from "./useCreatePalletDialog";

interface CreatePalletDialogProps {
  row: RowDto;
  showTrigger?: boolean;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreatePalletDialog({
  row,
  showTrigger = true,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: CreatePalletDialogProps) {
  const { form, isSubmitting, onSubmit, handleOpenChange } =
    useCreatePalletDialog({
      row,
      onOpenChange,
      onSuccess,
    });

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={handleOpenChange}>
      {showTrigger && <CreatePalletDialogTrigger />}
      <CreatePalletDialogView
        form={form}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
