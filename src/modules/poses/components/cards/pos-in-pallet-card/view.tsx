import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image";

import type { IPos } from "@/modules/poses/api";

interface PosInPalletCardProps {
  pos: IPos;
}

export function PosInPalletCardView({ pos }: PosInPalletCardProps) {
  return (
    <Card className="p-3">
      <CardHeader className="flex items-center justify-start p-0 pb-2">
        <ArtDialogImage artikul={pos.artikul} />
        <CardTitle className="grid w-full gap-2">
          <span className="text-center font-semibold">{pos.artikul}</span>
          <span className="text-muted-foreground text-center text-sm font-normal">
            {pos.nameukr || "Назва українською"}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-2 p-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Кількість</span>
          <span className="font-semibold">{pos.quant || 0}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Коробки</span>
          <span className="font-semibold">{pos.boxes || 0}</span>
        </div>

        {pos.sklad && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Склад</span>
            <span className="text-muted-foreground text-sm">{pos.sklad}</span>
          </div>
        )}

        {pos.comment && (
          <div className="pt-2">
            <p className="text-muted-foreground text-xs">{pos.comment}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
