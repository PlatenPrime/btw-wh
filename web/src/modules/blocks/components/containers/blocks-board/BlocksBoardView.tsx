import { DndContext, type DragEndEvent, type UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { BlocksBoardCard } from "@/modules/blocks/components/containers/blocks-board/components/BlockCard";
import type { DraftBlock } from "@/modules/blocks/components/containers/blocks-board/types";
import { Badge } from "@/components/ui/badge";

interface BlocksBoardViewProps {
  blocks: DraftBlock[];
  isEditMode: boolean;
  allowBlockReorder: boolean;
  onBlockReorder: (activeBlockId: string, overBlockId: string) => void;
  onZoneReorder: (
    blockId: string,
    activeZoneId: string,
    overZoneId: string,
  ) => void;
}

interface DragMeta {
  type: "block" | "zone";
  blockId: string;
  zoneId?: string;
}

const parseDragId = (id: UniqueIdentifier): DragMeta | null => {
  const [type, blockId, zoneId] = String(id).split(":");
  if (type === "block" && blockId) {
    return { type: "block", blockId };
  }

  if (type === "zone" && blockId && zoneId) {
    return { type: "zone", blockId, zoneId };
  }

  return null;
};

export function BlocksBoardView({
  blocks,
  isEditMode,
  allowBlockReorder,
  onBlockReorder,
  onZoneReorder,
}: BlocksBoardViewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeMeta = parseDragId(active.id);
    const overMeta = parseDragId(over.id);

    if (!activeMeta || !overMeta) return;

    if (
      activeMeta.type === "block" &&
      overMeta.type === "block" &&
      allowBlockReorder
    ) {
      onBlockReorder(activeMeta.blockId, overMeta.blockId);
      return;
    }

    if (
      activeMeta.type === "zone" &&
      overMeta.type === "zone" &&
      activeMeta.blockId === overMeta.blockId
    ) {
      onZoneReorder(
        activeMeta.blockId,
        activeMeta.zoneId!,
        overMeta.zoneId!,
      );
    }
  };

  if (!blocks.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-muted-foreground/30 p-8 text-center">
        <p className="text-lg font-semibold">Блоки відсутні</p>
        <p className="text-muted-foreground text-sm">
          Додайте перший блок, щоби почати працювати з секторами
        </p>
      </div>
    );
  }

  const blockItems = blocks.map((block) => `block:${block._id}`);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-4">
        <SortableContext
          items={blockItems}
          strategy={verticalListSortingStrategy}
          disabled={!allowBlockReorder || !isEditMode}
        >
          {blocks.map((block) => (
            <BlocksBoardCard
              key={block._id}
              block={block}
              isEditMode={isEditMode}
              allowBlockReorder={allowBlockReorder}
            />
          ))}
        </SortableContext>

        {isEditMode && (
          <div className="flex flex-wrap items-center gap-2 rounded-md border border-dashed border-muted-foreground/40 px-3 py-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="bg-muted text-muted-foreground">
              Редагування
            </Badge>
            <span>
              Перетягніть блоки або зони, потім підтвердіть зміни кнопкою в
              хедері
            </span>
          </div>
        )}
      </div>
    </DndContext>
  );
}

