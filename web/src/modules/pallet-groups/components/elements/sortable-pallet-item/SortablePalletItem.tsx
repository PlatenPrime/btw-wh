import type { PalletShortDto } from "@/modules/pallet-groups/api/types";
import { PalletCard } from "@/modules/pallet-groups/components/cards/pallet-card/PalletCard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortablePalletItemProps {
  pallet: PalletShortDto;
  onUnlink?: (pallet: PalletShortDto) => void;
}

export function SortablePalletItem({
  pallet,
  onUnlink,
}: SortablePalletItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: pallet.id });

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
        className="text-muted-foreground hover:text-foreground flex cursor-grab items-center justify-center p-1 transition-colors active:cursor-grabbing"
        title="Перетягнути для зміни порядку"
      >
        <GripVertical className="size-5" />
      </div>
      <div className="flex-1">
        <PalletCard pallet={pallet} onUnlink={onUnlink} />
      </div>
    </div>
  );
}
