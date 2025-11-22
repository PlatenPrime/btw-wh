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
import type { BlockDto, ZoneWithBlockDto } from "@/modules/blocks/api/types";
import { BlockZonesList } from "@/modules/blocks/components/lists/block-zones-list";
import { SortableZoneItem } from "@/modules/blocks/components/elements/sortable-zone-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlockContainerViewProps {
  block: BlockDto;
  zones: ZoneWithBlockDto[];
  isEditMode: boolean;
  isFetching?: boolean;
  onDragEnd: (newZones: ZoneWithBlockDto[]) => void;
  onRemove?: (zone: ZoneWithBlockDto) => void;
}

export function BlockContainerView({
  block,
  zones,
  isEditMode,
  isFetching = false,
  onDragEnd,
  onRemove,
}: BlockContainerViewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = zones.findIndex((z) => z._id === active.id);
      const newIndex = zones.findIndex((z) => z._id === over.id);

      const newOrder = arrayMove(zones, oldIndex, newIndex);
      onDragEnd(newOrder);
    }
  };

  return (
    <div className="grid gap-2">
      <Card>
        <CardHeader>
          <CardTitle>{block.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Порядок:</span>
              <span className="text-sm">{block.order}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {zones.length === 0 ? (
        <div className="text-muted-foreground text-center p-4">
          Зони не додані до блоку
        </div>
      ) : isEditMode ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={zones.map((z) => z._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className={`grid grid-cols-1 gap-2 p-2 ${isFetching ? "opacity-50" : ""}`}>
              {zones.map((zone) => (
                <SortableZoneItem
                  key={zone._id}
                  zone={zone}
                  isEditMode={isEditMode}
                  onRemove={onRemove ? () => onRemove(zone) : undefined}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className={isFetching ? "opacity-50" : ""}>
          <BlockZonesList zones={zones} isEditMode={isEditMode} onRemove={onRemove} />
        </div>
      )}
    </div>
  );
}

