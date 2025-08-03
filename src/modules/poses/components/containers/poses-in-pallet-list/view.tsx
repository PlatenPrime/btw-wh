import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PosInPalletCard } from "@/modules/poses/components/cards/pos-in-pallet-card";
import type { IPos } from "@/modules/poses/api";

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
            <PosInPalletCard key={`${pos.artikul}-${index}`} pos={pos} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
