import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { BlockDto } from "@/modules/blocks/api/types";
import { BlocksGrid } from "@/modules/blocks/components/lists/blocks-grid";
import { SortableBlockItem } from "@/modules/blocks/components/elements/sortable-block-item";

interface BlocksContainerViewProps {
  blocks: BlockDto[];
  isEditMode: boolean;
  onDragEnd: (newBlocks: BlockDto[]) => void;
  onDelete?: (block: BlockDto) => void;
}

export function BlocksContainerView({
  blocks,
  isEditMode,
  onDragEnd,
  onDelete,
}: BlocksContainerViewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b._id === active.id);
      const newIndex = blocks.findIndex((b) => b._id === over.id);

      const newOrder = arrayMove(blocks, oldIndex, newIndex);
      onDragEnd(newOrder);
    }
  };

  if (isEditMode) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((b) => b._id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 gap-2 p-2">
            {blocks.map((block) => (
              <SortableBlockItem key={block._id} block={block} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  }

  return <BlocksGrid blocks={blocks} onDelete={onDelete} />;
}

