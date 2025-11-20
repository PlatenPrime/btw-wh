import { GripVertical, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ZoneInBlockDto } from "@/modules/blocks/api/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface SortableZoneChipProps {
  zone: ZoneInBlockDto;
  blockId: string;
  disabled?: boolean;
}

export function SortableZoneChip({
  zone,
  blockId,
  disabled = false,
}: SortableZoneChipProps) {
  const sortable = useSortable({
    id: `zone:${blockId}:${zone._id}`,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
  };

  return (
    <div
      ref={sortable.setNodeRef}
      style={style}
      className={cn(
        "flex items-center justify-between rounded-lg border border-muted-foreground/40 px-3 py-2 text-sm transition",
        sortable.isDragging && "border-primary/40 bg-primary/5 shadow-lg",
      )}
    >
      <div className="flex items-center gap-2">
        {!disabled && (
          <button
            type="button"
            className="text-muted-foreground transition hover:text-primary"
            {...sortable.attributes}
            {...sortable.listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
        )}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 font-semibold">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            {zone.title}
          </div>
          <div className="text-muted-foreground text-xs">
            Баркод: {zone.bar} · Сектор: {zone.sector}
          </div>
        </div>
      </div>
      <Badge variant="outline">#{zone.order ?? 0}</Badge>
    </div>
  );
}

