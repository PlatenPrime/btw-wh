import type { IPos } from "@/modules/poses/api/types";
import { PosInPalletCard } from "@/modules/poses/components/cards/pos-in-pallet-card/PosInPalletCard";

interface PosesByPalletContainerViewProps {
  poses: IPos[];
  newPosIds?: string[];
}

export function PosesByPalletContainerView({
  poses,
  newPosIds = [],
}: PosesByPalletContainerViewProps) {
  // Сортируем позиции: новые сверху, остальные по алфавиту
  const sortedPoses = [...poses].sort((a, b) => {
    const aIsNew = newPosIds.includes(a._id);
    const bIsNew = newPosIds.includes(b._id);

    // Если одна позиция новая, а другая нет - новая идет первой
    if (aIsNew && !bIsNew) return -1;
    if (!aIsNew && bIsNew) return 1;

    // Если обе новые или обе старые - сортируем по артикулу
    return a.artikul.localeCompare(b.artikul);
  });

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sortedPoses.map((pos, index) => {
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
    </section>
  );
}
