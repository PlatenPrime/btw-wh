import type { PosListResponse } from "@/modules/poses/api/types";
import { PosInPalletCard } from "@/modules/poses/components/cards/pos-in-pallet-card/PosInPalletCard";

interface AllPosesContainerViewProps {
  data: PosListResponse;
}

export function AllPosesContainerView({ data }: AllPosesContainerViewProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Всі позиції</h2>
        <div className="text-muted-foreground text-sm">
          Всього: {data.total}
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.data.map((pos, index) => (
          <PosInPalletCard key={`${pos.artikul}-${index}`} pos={pos} />
        ))}
      </section>
    </div>
  );
}
