import { Wrapper } from "@/components/shared/wrappers/Wrapper";
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
    <Wrapper className="grid grid-cols-1 gap-2 p-2">
      {pallets.map((pallet) => (
        <PalletCard key={pallet.id} pallet={pallet} onUnlink={onUnlink} />
      ))}
    </Wrapper>
  );
}
