import { Container } from "@/components/shared/containers/Container";
import type { IPos } from "@/modules/poses/api/types";
import { PosInPalletCard } from "@/modules/poses/components/cards/pos-in-pallet-card/PosInPalletCard";

interface PosesByPalletContainerViewProps {
  poses: IPos[];
}

export function PosesByPalletContainerView({
  poses,
}: PosesByPalletContainerViewProps) {
  return (
    <Container className="grid gap-2 lg:grid-cols-2 2xl:grid-cols-4">
      {poses.map((pos, index) => (
        <div key={`${pos.artikul}-${index}`}>
          <PosInPalletCard pos={pos} />
        </div>
      ))}
    </Container>
  );
}
