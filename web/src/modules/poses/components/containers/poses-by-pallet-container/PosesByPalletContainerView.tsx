import { Container } from "@/components/shared/containers/Container";
import type { IPos } from "@/modules/poses/api/types";
import { PosInPalletCard } from "@/modules/poses/components/cards/pos-in-pallet-card/PosInPalletCard";

interface PosesByPalletContainerViewProps {
  allPoses: IPos[];
  newPosIds: string[];
}

export function PosesByPalletContainerView({
  allPoses,
  newPosIds,
}: PosesByPalletContainerViewProps) {
  // Сортируем позиции по типу (новые/старые)

  return (
    <Container className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {allPoses.map((pos, index) => {
        const isNew = newPosIds.includes(pos._id);
        return (
          <div
            key={`${pos.artikul}-${index}`}
            className={
              isNew ? "animate-in fade-in slide-in-from-top-2 duration-500" : ""
            }
          >
            <PosInPalletCard pos={pos} isNew={isNew} />
          </div>
        );
      })}
    </Container>
  );
}
