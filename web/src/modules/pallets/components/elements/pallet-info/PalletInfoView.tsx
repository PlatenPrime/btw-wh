import { NotebookText, Package } from "lucide-react";

interface PalletInfoViewProps {
  totalPositions: number;
  totalBoxes: number;
}

export function PalletInfoView({
  totalPositions,
  totalBoxes,
}: PalletInfoViewProps) {
  return (
    <div className="flex gap-4 items-center justify-center ">
      <div className="flex  gap-1 items-center ">
        <NotebookText className="size-3 " />
        <span className="font-semibold ">{totalPositions}</span>
      </div>

      <div className="flex  gap-1 items-center">
        <Package className="size-3" />
        <span className="font-semibold ">{totalBoxes}</span>
      </div>
    </div>
  );
}
