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
import { BlocksControlPanel } from "@/modules/blocks/components/controls/blocks-control-panel/BlocksControlPanel";
import { BlocksGrid } from "@/modules/blocks/components/lists/blocks-grid";
import { SortableBlockItem } from "@/modules/blocks/components/elements/sortable-block-item";

interface BlocksContainerViewProps {
  blocks: BlockDto[];
  isEditMode: boolean;
  isSaving: boolean;
  onDragEnd: (newBlocks: BlockDto[]) => void;
  onDelete?: (block: BlockDto) => void;
  onCreate: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export function BlocksContainerView({
  blocks,
  isEditMode,
  isSaving,
  onDragEnd,
  onDelete,
  onCreate,
  onEdit,
  onCancel,
  onSave,
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

  const hasBlocks = blocks.length > 0;

  return (
    <div className="grid gap-2 p-2">
      <BlocksControlPanel
        isEditMode={isEditMode}
        hasBlocks={hasBlocks}
        onCreate={onCreate}
        onEdit={onEdit}
        onCancel={onCancel}
        onSave={onSave}
        isSaving={isSaving}
      />

      {isEditMode ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={blocks.map((b) => b._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 gap-2">
              {blocks.map((block) => (
                <SortableBlockItem key={block._id} block={block} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <BlocksGrid blocks={blocks} onDelete={onDelete} />
      )}
    </div>
  );
}

