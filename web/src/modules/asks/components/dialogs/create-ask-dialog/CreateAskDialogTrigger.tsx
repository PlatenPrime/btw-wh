import AskTrigger from "@/components/shared/triggers/ask-trigger/AskTrigger";
import { DialogTrigger } from "@/components/ui/dialog";

interface CreateAskDialogTriggerProps {
  trigger?: React.ReactNode;
}

export function CreateAskDialogTrigger({
  trigger,
}: CreateAskDialogTriggerProps) {
  return <DialogTrigger asChild>{trigger ?? <AskTrigger />}</DialogTrigger>;
}

