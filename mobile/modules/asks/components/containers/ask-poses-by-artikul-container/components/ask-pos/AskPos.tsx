import { useState } from "react";
import type { PosResponse } from "@/modules/poses/api/types";
import { SkladListPos } from "@/modules/poses/components/shared/sklad-list-pos/SkladListPos";
import { AskPosEditDialog } from "@/modules/asks/components/dialogs/ask-pos-edit-dialog/AskPosEditDialog";

interface AskPosProps {
  pos: PosResponse;
  askId: string;
  initialRemovedQuant?: number;
}

export function AskPos({ pos, askId, initialRemovedQuant }: AskPosProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <>
      <SkladListPos pos={pos} onClick={handleClick} />
      <AskPosEditDialog
        pos={pos}
        askId={askId}
        open={open}
        setOpen={setOpen}
        onSuccess={handleSuccess}
        initialRemovedQuant={initialRemovedQuant}
      />
    </>
  );
}

