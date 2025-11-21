import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ZoneWithBlockDto } from "@/modules/blocks/api/types";
import { BlockZoneCard } from "@/modules/blocks/components/cards/block-zone-card";

interface SortableZoneItemProps {
  zone: ZoneWithBlockDto;
}

export function SortableZoneItem({ zone }: SortableZoneItemProps) {
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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <BlockZoneCard zone={zone} />
    </div>
  );
}

