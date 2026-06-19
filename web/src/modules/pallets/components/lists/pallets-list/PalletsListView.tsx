import { ContentRevealStagger } from "@/components/shared/motion";
import { SurfaceSection } from "@/components/shared/layout";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletInRowCard } from "@/modules/pallets/components/cards/pallet-in-row-card/PalletInRowCard.tsx";

interface PalletsListViewProps {
  pallets: PalletShortDto[];
  rowId: string;
}

export function PalletsListView({ pallets, rowId }: PalletsListViewProps) {
  return (
    <SurfaceSection>
      <ContentRevealStagger className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pallets.map((pallet) => (
          <PalletInRowCard key={pallet._id} pallet={pallet} rowId={rowId} />
        ))}
      </ContentRevealStagger>
    </SurfaceSection>
  );
}
