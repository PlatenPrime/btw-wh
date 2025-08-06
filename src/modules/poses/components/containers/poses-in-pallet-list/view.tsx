import { Card, CardContent } from "@/components/ui/card";

import type { IPos } from "@/modules/poses/api";
import { PosInPalletCard } from "@/modules/poses/components/cards/pos-in-pallet-card";

interface PosesInPalletListViewProps {
  poses: IPos[];
}

export function PosesInPalletListView({ poses }: PosesInPalletListViewProps) {
  return (
    <Card>
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
