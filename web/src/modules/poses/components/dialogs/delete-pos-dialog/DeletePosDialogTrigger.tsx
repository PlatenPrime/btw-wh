import { DialogTrigger } from "@/components/ui/dialog";

interface DeletePosDialogTriggerProps {
  trigger?: React.ReactNode;
}

export function DeletePosDialogTrigger({
  trigger,
}: DeletePosDialogTriggerProps) {
  if (!trigger) {
    return null;
  }
  return <DialogTrigger asChild>{trigger}</DialogTrigger>;
}

