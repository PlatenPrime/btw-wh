import { Dialog } from "@/components/ui/dialog";
import { CreateAskDialogTrigger } from "./CreateAskDialogTrigger";
import { CreateAskDialogView } from "./CreateAskDialogView";
import { useCreateAskDialog } from "./useCreateAskDialog";

interface CreateAskDialogProps {
  onSuccess?: () => void;
  preFilledArtikul?: string;
  trigger?: React.ReactNode;
  showTrigger?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateAskDialog({
  onSuccess,
  preFilledArtikul,
  trigger,
  showTrigger = true,
  open: controlledOpen,
  onOpenChange,
}: CreateAskDialogProps) {
  const { handleSuccess, handleCancel } = useCreateAskDialog({
    onOpenChange,
    onSuccess,
  });

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      {showTrigger && <CreateAskDialogTrigger trigger={trigger} />}
      <CreateAskDialogView
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        preFilledArtikul={preFilledArtikul}
      />
    </Dialog>
  );
}
