import { DeleteTrigger } from "@/components/shared/triggers/delete-trigger/DeleteTrigger";
import { DialogTrigger } from "@/components/ui/dialog";

interface DeletePalletDialogTriggerProps {
  trigger?: React.ReactNode;
}

export function DeletePalletDialogTrigger({
  trigger,
}: DeletePalletDialogTriggerProps) {
  return (
    <DialogTrigger asChild>{trigger || <DeleteTrigger />}</DialogTrigger>
  );
}

