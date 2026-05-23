import { ListRowCard } from "@/components/shared/cards";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ZoneWithBlockDto } from "@/modules/blocks/api/types";
import { Trash } from "lucide-react";

interface BlockZoneCardProps {
  zone: ZoneWithBlockDto;
  isEditMode?: boolean;
  onRemove?: () => void;
}

export function BlockZoneCard({
  zone,
  isEditMode = false,
  onRemove,
}: BlockZoneCardProps) {
  return (
    <ListRowCard>
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{zone.title}</CardTitle>
          {isEditMode && onRemove ? (
            <Button
              variant="destructive"
              size="icon-sm"
              onClick={onRemove}
              title="Видалити зону з блоку"
            >
              <Trash className="size-4" />
              <span className="sr-only">Видалити зону з блоку</span>
            </Button>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 p-0">
        <div className="flex items-center justify-start border-b">
          <span className="text-xs text-muted-foreground">Штрих-код:</span>
          <span className="text-xs text-muted-foreground">{zone.bar}</span>
        </div>
        <div className="flex items-center justify-start border-b">
          <span className="text-xs text-muted-foreground">Сектор:</span>
          <span className="text-xs text-muted-foreground">{zone.sector}</span>
        </div>
        {zone.order !== undefined ? (
          <div className="flex items-center justify-start border-b">
            <span className="text-xs text-muted-foreground">Порядок:</span>
            <span className="text-xs text-muted-foreground">{zone.order}</span>
          </div>
        ) : null}
      </CardContent>
    </ListRowCard>
  );
}
