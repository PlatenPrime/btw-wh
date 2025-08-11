import type { PalletShortDto } from "@/modules/rows/api/types/dto";
import { Columns4 } from "lucide-react";
import { PalletInRowCard } from "../../cards/pallet-in-row-card/PalletInRowCard";

interface PalletListProps {
  pallets: PalletShortDto[];
}

/**
 * Список карточек палет для отображения в ряде
 */
export function PalletList({ pallets }: PalletListProps) {
  if (!pallets.length) {
    return (
      <div className="py-8 text-center">
        <Columns4 className="text-muted-foreground/50 mx-auto h-12 w-12" />
        <h3 className="text-muted-foreground mt-2 text-sm font-medium">
          Палети не знайдено
        </h3>
        <p className="text-muted-foreground mt-1 text-xs">
          Додайте палети для початку роботи
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {pallets.map((pallet) => (
        <PalletInRowCard key={pallet._id} pallet={pallet} />
      ))}
    </div>
  );
}
