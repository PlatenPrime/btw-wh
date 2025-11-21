import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <BlockCard block={block} />
    </div>
  );
}

