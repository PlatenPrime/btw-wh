import { MoveTrigger } from "@/components/shared/triggers/move-trigger/MoveTrigger";
import { DialogTrigger } from "@/components/ui/dialog";

interface MovePalletPosesDialogTriggerProps {
  trigger?: React.ReactNode;
}

export function MovePalletPosesDialogTrigger({
  trigger,
}: MovePalletPosesDialogTriggerProps) {
  return <DialogTrigger asChild>{trigger || <MoveTrigger />}</DialogTrigger>;
}

