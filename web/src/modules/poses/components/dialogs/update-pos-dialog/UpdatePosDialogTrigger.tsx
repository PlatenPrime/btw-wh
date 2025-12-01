import { DialogTrigger } from "@/components/ui/dialog";

interface UpdatePosDialogTriggerProps {
  trigger?: React.ReactNode;
}

export function UpdatePosDialogTrigger({
  trigger,
}: UpdatePosDialogTriggerProps) {
  if (!trigger) {
    return null;
  }
  return <DialogTrigger asChild>{trigger}</DialogTrigger>;
}

