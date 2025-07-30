import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image";

import type { IPos } from "@/modules/poses/types";

interface PosesInPalletListViewProps {
  poses: IPos[];
}

export function PosesInPalletListView({ poses }: PosesInPalletListViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Позиції на палеті</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {poses.map((pos, index) => (
            <div
              key={`${pos.artikul}-${index}`}
              className="space-y-2 rounded-md border p-3"
            >
              <ArtDialogImage artikul={pos.artikul} />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Артикул</span>
                <span>{pos.artikul}</span>
              </div>
              {pos.nameukr && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Назва</span>
                  <span className="text-muted-foreground text-sm">
                    {pos.nameukr}
                  </span>
                </div>
              )}
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
                  <span className="text-muted-foreground text-sm">
                    {pos.sklad}
                  </span>
                </div>
              )}
              {pos.comment && (
                <div className="pt-2">
                  <p className="text-muted-foreground text-xs">{pos.comment}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
