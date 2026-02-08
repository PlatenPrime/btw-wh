import { Button } from "@/components/ui";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import type { ExistingAsk } from "@/modules/defs/api/types/dto";

interface DefAskButtonProps {
  artikul: string;
  existingAsk: ExistingAsk | null;
}

const trigger = (
  <Button
    variant="outline"
    size="sm"
    className="text-violet-950 hover:bg-violet-500/10 dark:bg-violet-800/5 dark:text-violet-100 dark:hover:bg-violet-300/10 dark:hover:text-violet-400"
  >
    + запит
  </Button>
);

export function DefAskButton({ artikul }: DefAskButtonProps) {
  return (
    <div className="grid place-items-center rounded-md">
      <div className="relative">
        <CreateAskDialog preFilledArtikul={artikul} trigger={trigger} />
      </div>
    </div>
  );
}
