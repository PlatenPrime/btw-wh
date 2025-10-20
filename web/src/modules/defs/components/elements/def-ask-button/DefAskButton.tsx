import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import type { ExistingAsk } from "@/modules/defs/api/types/dto";

interface DefAskButtonProps {
  artikul: string;
  existingAsk: ExistingAsk | null;
}

export function DefAskButton({ artikul }: DefAskButtonProps) {
  return (
    <div className="grid place-items-center">
      <div className="relative">
        <CreateAskDialog preFilledArtikul={artikul} />
      </div>
    </div>
  );
}
