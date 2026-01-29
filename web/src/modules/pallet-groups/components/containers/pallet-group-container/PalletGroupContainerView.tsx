import { Button } from "@/components/ui/button";
import type {
  PalletGroupDto,
  PalletShortDto,
} from "@/modules/pallet-groups/api/types";
import { SortablePalletItem } from "@/modules/pallet-groups/components/elements/sortable-pallet-item/SortablePalletItem";
import { PalletsGrid } from "@/modules/pallet-groups/components/lists/pallets-grid/PalletsGrid";
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

interface PalletGroupContainerViewProps {
  group: PalletGroupDto;
  pallets: PalletShortDto[];
  isEditMode: boolean;
  isSaving: boolean;
  onEnterEditMode: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDragEnd: (newPallets: PalletShortDto[]) => void;
  onUnlink?: (pallet: PalletShortDto) => void;
}

export function PalletGroupContainerView({
  pallets,
  isEditMode,
  isSaving,
  onEnterEditMode,
  onCancel,
  onSave,
  onDragEnd,
  onUnlink,
}: PalletGroupContainerViewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = pallets.findIndex((p) => p.id === active.id);
      const newIndex = pallets.findIndex((p) => p.id === over.id);

      const newOrder = arrayMove(pallets, oldIndex, newIndex);
      onDragEnd(newOrder);
    }
  };

  const hasPallets = pallets.length > 0;

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-start">
        <div className="flex gap-2">
          {isEditMode ? (
            <>
              <Button variant="outline" onClick={onCancel} disabled={isSaving}>
                Скасувати
              </Button>
              <Button onClick={onSave} disabled={isSaving}>
                {isSaving ? "Збереження..." : "Зберегти порядок"}
              </Button>
            </>
          ) : (
            hasPallets && (
              <Button variant="outline" onClick={onEnterEditMode}>
                Редагувати порядок палет
              </Button>
            )
          )}
        </div>
      </div>

      {isEditMode ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={pallets.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 gap-2 p-2">
              {pallets.map((pallet) => (
                <SortablePalletItem
                  key={pallet.id}
                  pallet={pallet}
                  onUnlink={onUnlink}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <PalletsGrid pallets={pallets} onUnlink={onUnlink} />
      )}
    </div>
  );
}
