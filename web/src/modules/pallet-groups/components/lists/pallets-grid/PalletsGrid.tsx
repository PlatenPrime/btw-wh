import { ContentRevealStagger } from "@/components/shared/motion";
import { SurfaceSection } from "@/components/shared/layout";
import type { PalletShortDto } from "@/modules/pallet-groups/api/types";
import { PalletCard } from "@/modules/pallet-groups/components/cards/pallet-card/PalletCard";

interface PalletsGridProps {
  pallets: PalletShortDto[];
  onUnlink?: (pallet: PalletShortDto) => void;
}

export function PalletsGrid({ pallets, onUnlink }: PalletsGridProps) {
  if (!pallets.length) {
    return (
      <div className="text-muted-foreground p-4 text-center text-sm">
        У цій групі поки немає палет
      </div>
    );
  }

  return (
    <SurfaceSection className="p-2">
      <ContentRevealStagger className="grid grid-cols-1 gap-2">
        {pallets.map((pallet) => (
          <PalletCard key={pallet.id} pallet={pallet} onUnlink={onUnlink} />
        ))}
      </ContentRevealStagger>
    </SurfaceSection>
  );
}
