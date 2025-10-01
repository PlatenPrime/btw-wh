import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import type { ExistingAsk } from "@/modules/defs/api/types/dto";
import { Info } from "lucide-react";

interface DefAskButtonProps {
  artikul: string;
  existingAsk: ExistingAsk | null;
}

export function DefAskButton({ artikul, existingAsk }: DefAskButtonProps) {
  const hasExistingAsk = existingAsk !== null;

  return (
    <div className="grid place-items-center">
      <div className="relative">
        <CreateAskDialog preFilledArtikul={artikul} />

        {/* Status indicator */}
        {hasExistingAsk && (
          <div className="absolute -top-1 -right-1">
            <div className="border-background flex h-3 w-3 items-center justify-center rounded-full border-2 bg-amber-500">
              <Info className="h-2 w-2 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
