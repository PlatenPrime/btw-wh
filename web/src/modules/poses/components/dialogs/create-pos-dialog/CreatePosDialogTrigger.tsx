import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

interface CreatePosDialogTriggerProps {
  trigger?: React.ReactNode;
}

const defaultTrigger = (
  <Button variant="outline" size="sm">
    Додати позицію
  </Button>
);

export function CreatePosDialogTrigger({
  trigger,
}: CreatePosDialogTriggerProps) {
  return <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>;
}

