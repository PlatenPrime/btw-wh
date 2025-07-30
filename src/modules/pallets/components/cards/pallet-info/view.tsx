import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="py-2">
      <CardContent>
        <div className="grid grid-cols-2 place-items-center gap-2">
          <div className="flex items-center justify-start gap-2">
            <NotebookText className="h-4 w-4" />
            <span className="font-semibold">{totalPositions}</span>
          </div>

          <div className="flex items-center justify-start gap-2">
            <Package className="h-4 w-4" /> 
            <span className="font-semibold">{totalBoxes}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
