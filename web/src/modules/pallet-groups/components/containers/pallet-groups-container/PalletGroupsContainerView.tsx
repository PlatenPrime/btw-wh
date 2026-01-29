import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { PalletGroupsControlPanel } from "@/modules/pallet-groups/components/controls/pallet-groups-control-panel/PalletGroupsControlPanel";
import { SortablePalletGroupItem } from "@/modules/pallet-groups/components/elements/sortable-pallet-group-item/SortablePalletGroupItem";
import { PalletGroupsGrid } from "@/modules/pallet-groups/components/lists/pallet-groups-grid/PalletGroupsGrid";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface PalletGroupsContainerViewProps {
  groups: PalletGroupDto[];
  isEditMode: boolean;
  isSaving: boolean;
  onDragEnd: (newGroups: PalletGroupDto[]) => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export function PalletGroupsContainerView({
  groups,
  isEditMode,
  isSaving,
  onDragEnd,
  onEdit,
  onCancel,
  onSave,
}: PalletGroupsContainerViewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = groups.findIndex((g) => g.id === active.id);
      const newIndex = groups.findIndex((g) => g.id === over.id);

      const newOrder = arrayMove(groups, oldIndex, newIndex);
      onDragEnd(newOrder);
    }
  };

  const hasGroups = groups.length > 0;

  return (
    <div className="grid gap-2 p-2">
      <PalletGroupsControlPanel
        isEditMode={isEditMode}
        hasGroups={hasGroups}
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
            items={groups.map((g) => g.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 gap-2">
              {groups.map((group) => (
                <SortablePalletGroupItem key={group.id} group={group} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <PalletGroupsGrid groups={groups} />
      )}
    </div>
  );
}
