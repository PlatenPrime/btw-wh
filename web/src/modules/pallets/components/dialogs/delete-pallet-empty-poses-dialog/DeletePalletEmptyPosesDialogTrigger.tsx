import { ClearZeroTrigger } from "@/components/shared/triggers/clear-zero-trigger/ClearZeroTrigger";
import { DialogTrigger } from "@/components/ui/dialog";

interface DeletePalletEmptyPosesDialogTriggerProps {
  trigger?: React.ReactNode;
}

export function DeletePalletEmptyPosesDialogTrigger({
  trigger,
}: DeletePalletEmptyPosesDialogTriggerProps) {
  return (
    <DialogTrigger asChild>{trigger || <ClearZeroTrigger />}</DialogTrigger>
  );
}

