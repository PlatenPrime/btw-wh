import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { ZoneWithBlockDto } from "@/modules/blocks/api/types";
import { BlockZoneCard } from "@/modules/blocks/components/cards/block-zone-card";

interface SortableZoneItemProps {
  zone: ZoneWithBlockDto;
  isEditMode?: boolean;
  onRemove?: () => void;
}

export function SortableZoneItem({ zone, isEditMode = false, onRemove }: SortableZoneItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: zone._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2">
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing flex items-center justify-center p-1 text-muted-foreground hover:text-foreground transition-colors"
        title="Перетягнути для зміни порядку"
      >
        <GripVertical className="size-5" />
      </div>
      <div className="flex-1">
        <BlockZoneCard zone={zone} isEditMode={isEditMode} onRemove={onRemove} />
      </div>
    </div>
  );
}

