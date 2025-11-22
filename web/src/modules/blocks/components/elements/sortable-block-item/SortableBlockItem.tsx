import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { BlockDto } from "@/modules/blocks/api/types";
import { BlockCard } from "@/modules/blocks/components/cards/block-card";

interface SortableBlockItemProps {
  block: BlockDto;
}

export function SortableBlockItem({ block }: SortableBlockItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block._id });

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
        <BlockCard block={block} />
      </div>
    </div>
  );
}

