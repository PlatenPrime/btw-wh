import { DeleteTrigger } from "@/components/shared/triggers/delete-trigger/DeleteTrigger";
import { DialogTrigger } from "@/components/ui/dialog";

interface DeleteRowDialogTriggerProps {
  trigger?: React.ReactNode;
}

export function DeleteRowDialogTrigger({
  trigger,
}: DeleteRowDialogTriggerProps) {
  return (
    <DialogTrigger asChild>{trigger || <DeleteTrigger />}</DialogTrigger>
  );
}

