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
import type { SegmentDto } from "@/modules/blocks/api/types";
import { SegmentsGrid } from "@/modules/blocks/components/lists/segments-grid";
import { SortableSegmentItem } from "@/modules/blocks/components/elements/sortable-segment-item";

interface SegmentsContainerViewProps {
  segments: SegmentDto[];
  blockId: string;
  isEditMode: boolean;
  onDragEnd: (newSegments: SegmentDto[]) => void;
  onDelete?: (segment: SegmentDto) => void;
}

export function SegmentsContainerView({
  segments,
  blockId,
  isEditMode,
  onDragEnd,
  onDelete,
}: SegmentsContainerViewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = segments.findIndex((s) => s._id === active.id);
      const newIndex = segments.findIndex((s) => s._id === over.id);

      const newOrder = arrayMove(segments, oldIndex, newIndex);
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
          items={segments.map((s) => s._id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 gap-2 p-2">
            {segments.map((segment) => (
              <SortableSegmentItem key={segment._id} segment={segment} blockId={blockId} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  }

  return <SegmentsGrid segments={segments} blockId={blockId} onDelete={onDelete} />;
}

