import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import type { ZoneWithBlockDto } from "@/modules/blocks/api/types";

interface BlockZoneCardProps {
  zone: ZoneWithBlockDto;
  isEditMode?: boolean;
  onRemove?: () => void;
}

export function BlockZoneCard({ zone, isEditMode = false, onRemove }: BlockZoneCardProps) {
  return (
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{zone.title}</CardTitle>
          {isEditMode && onRemove && (
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              onClick={onRemove}
              title="Видалити зону з блоку"
            >
              <Trash className="size-4 text-destructive" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 p-0">
        <div className="flex items-center justify-start  border-b">
          <span className="text-muted-foreground text-xs">Штрих-код:</span>
          <span className="text-muted-foreground text-xs">{zone.bar}</span>
        </div>
        <div className="flex items-center justify-start  border-b">
          <span className="text-muted-foreground text-xs">Сектор:</span>
          <span className="text-muted-foreground text-xs">{zone.sector}</span>
        </div>
        {zone.order !== undefined && (
          <div className="flex items-center justify-start  border-b">
            <span className="text-muted-foreground text-xs">Порядок:</span>
            <span className="text-muted-foreground text-xs">{zone.order}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

