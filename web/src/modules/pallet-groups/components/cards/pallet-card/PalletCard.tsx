import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PalletShortDto } from "@/modules/pallet-groups/api/types";

interface PalletCardProps {
  pallet: PalletShortDto;
  onUnlink?: (pallet: PalletShortDto) => void;
}

export function PalletCard({ pallet, onUnlink }: PalletCardProps) {
  return (
    <Card className="p-2">
      <CardHeader className="p-0">
        <CardTitle className="flex flex-row items-center justify-between gap-2 text-sm">
          <span>{pallet.title}</span>
          <span className="text-muted-foreground font-mono text-xs">
            {pallet.sector}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground grid gap-2 p-0 pt-2 text-xs">
        <div className="flex justify-between">
          <span>Дефіцитна:</span>
          <span>{pallet.isDef ? "Так" : "Ні"}</span>
        </div>
        <div className="flex justify-between">
          <span>Пуста:</span>
          <span>{pallet.isEmpty ? "Так" : "Ні"}</span>
        </div>
        {onUnlink && (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onUnlink(pallet)}
            >
              Відв&apos;язати від групи
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
