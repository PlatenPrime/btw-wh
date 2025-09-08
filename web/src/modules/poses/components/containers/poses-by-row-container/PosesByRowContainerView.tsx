import type { IPos } from "@/modules/poses/api/types";
import { PosInPalletCard } from "@/modules/poses/components/cards/pos-in-pallet-card/PosInPalletCard";

interface PosesByRowContainerViewProps {
  poses: IPos[];
}

export function PosesByRowContainerView({
  poses,
}: PosesByRowContainerViewProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {poses.map((pos, index) => (
        <PosInPalletCard key={`${pos.artikul}-${index}`} pos={pos} />
      ))}
    </section>
  );
}
