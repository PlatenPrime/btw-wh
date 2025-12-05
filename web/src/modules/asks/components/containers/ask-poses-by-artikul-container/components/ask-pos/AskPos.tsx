import { Card, CardContent } from "@/components/ui/card";
import { AskPosEditDialog } from "@/modules/asks/components/dialogs/ask-pos-edit-dialog/AskPosEditDialog";
import type { PosResponse } from "@/modules/poses/api/types";
import { SkladListPos } from "@/modules/poses/components/shared/sklad-list-pos/SkladListPos";
import { useState } from "react";

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
    <Card key={pos.data!._id} className="p-0">
      <CardContent className="p-0">
        <SkladListPos pos={pos} onClick={handleClick} />
        <AskPosEditDialog
          pos={pos}
          askId={askId}
          open={open}
          setOpen={setOpen}
          onSuccess={handleSuccess}
          initialRemovedQuant={initialRemovedQuant}
        />
      </CardContent>
    </Card>
  );
}
