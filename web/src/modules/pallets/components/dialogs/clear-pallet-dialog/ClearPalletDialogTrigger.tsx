import { ClearTrigger } from "@/components/shared/triggers/clear-trigger/ClearTrigger";
import { DialogTrigger } from "@/components/ui/dialog";

interface ClearPalletDialogTriggerProps {
  trigger?: React.ReactNode;
}

export function ClearPalletDialogTrigger({
  trigger,
}: ClearPalletDialogTriggerProps) {
  return (
    <DialogTrigger asChild>{trigger || <ClearTrigger />}</DialogTrigger>
  );
}

