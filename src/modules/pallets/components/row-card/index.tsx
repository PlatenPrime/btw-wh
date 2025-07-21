import { Card } from "@/components/ui/card";
import type { PalletShortDto } from "@/modules/rows/types/dto";
import { Package } from "lucide-react";

interface PalletRowCardProps {
  pallet: PalletShortDto;
  index: number;
}

/**
 * Карточка палеты для отображения в списке ряда
 */
export function PalletRowCard({ pallet }: PalletRowCardProps) {
  return (
    <Card className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors">
      <div className="flex items-center gap-2">
        <Package className="text-muted-foreground h-4 w-4" />
        <span className="text-sm font-medium">{pallet.title}</span>
        {pallet.sector && (
          <span className="text-muted-foreground ml-2 text-xs">
            {pallet.sector}
          </span>
        )}
      </div>
    </Card>
  );
}

export type { PalletShortDto };
