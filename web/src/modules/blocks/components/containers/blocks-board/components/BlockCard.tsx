import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DraftBlock } from "@/modules/blocks/components/containers/blocks-board/types";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableZoneChip } from "@/modules/blocks/components/containers/blocks-board/components/SortableZoneChip";
import { Link } from "react-router-dom";

interface BlocksBoardCardProps {
  block: DraftBlock;
  isEditMode: boolean;
  allowBlockReorder: boolean;
}

export function BlocksBoardCard({
  block,
  isEditMode,
  allowBlockReorder,
}: BlocksBoardCardProps) {
  const sortable = useSortable({
    id: `block:${block._id}`,
    disabled: !isEditMode || !allowBlockReorder,
  });

  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
  };

  const zoneIds = block.zones.map((zone) => `zone:${block._id}:${zone._id}`);

  return (
    <div
      ref={sortable.setNodeRef}
      style={style}
      className={cn(
        "transition",
        sortable.isDragging && "z-10 scale-[1.01] drop-shadow-2xl",
      )}
    >
      <Card
        className={cn(
          "border-muted-foreground/40",
          sortable.isDragging && "border-primary/40 ring-2 ring-primary/30",
        )}
      >
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {isEditMode && allowBlockReorder && (
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-dashed border-muted-foreground/60 text-muted-foreground transition hover:border-primary hover:text-primary"
                {...sortable.attributes}
                {...sortable.listeners}
              >
                <GripVertical className="h-4 w-4" />
              </button>
            )}
            <div className="flex flex-col gap-1">
              <CardTitle className="text-lg">
                <Link
                  to={`/wh/blocks/${block._id}`}
                  className="rounded-md px-1 text-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  {block.title}
                </Link>
              </CardTitle>
              <CardDescription>
                {block.zones.length
                  ? `${block.zones.length} зон у блоці`
                  : "Немає призначених зон"}
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Порядок: {block.order}</Badge>
            <Badge variant="secondary">Зон: {block.zones.length}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          {block.zones.length ? (
            <SortableContext
              items={zoneIds}
              strategy={verticalListSortingStrategy}
              disabled={!isEditMode}
            >
              <div className="flex flex-col gap-2">
                {block.zones.map((zone) => (
                  <SortableZoneChip
                    key={zone._id}
                    blockId={block._id}
                    zone={zone}
                    disabled={!isEditMode}
                  />
                ))}
              </div>
            </SortableContext>
          ) : (
            <div className="text-muted-foreground text-sm">
              Додайте зони до блоку у модулі зон
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

