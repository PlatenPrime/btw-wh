import { Card, CardContent } from "@/components/ui/card";
import type { PosResponse } from "@/modules/poses/api/types";
import { AskPosEditDialog } from "@/modules/asks/components/dialogs/ask-pos-edit-dialog/AskPosEditDialog";

interface AskPosLinkProps {
  pos: PosResponse;
  askId: string;
}

export function AskPosLink({ pos, askId }: AskPosLinkProps) {
  return (
    <Card key={pos._id} className="p-0">
      <CardContent className="p-0">
        <AskPosEditDialog
          pos={pos}
          askId={askId}
          trigger={
            <div className="hover:bg-muted/25 cursor-pointer block rounded-md px-2 py-1 transition-colors">
              <div className="grid grid-cols-3">
                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-medium">
                    {pos.palletData?.title || "Невідома палета"}
                  </h4>
                </div>

                <span className="flex items-center justify-center gap-1">
                  {pos.boxes || 0}
                </span>
                <span className="flex items-center justify-end gap-1">
                  {pos.quant || 0}
                </span>
              </div>
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}
