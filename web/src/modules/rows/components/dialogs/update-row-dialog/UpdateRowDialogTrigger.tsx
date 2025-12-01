import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

interface UpdateRowDialogTriggerProps {
  trigger?: React.ReactNode;
}

const defaultTrigger = <Button variant="outline">Редагувати</Button>;

export function UpdateRowDialogTrigger({
  trigger,
}: UpdateRowDialogTriggerProps) {
  return <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>;
}

