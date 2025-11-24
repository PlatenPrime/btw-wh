import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { useContainerInfiniteScroll } from "@/hooks/useContainerInfiniteScroll";
import type { ZoneDto } from "@/modules/zones/api/types";
import { Skeleton } from "@/components/ui/skeleton";

interface CreateSegmentFormViewProps {
  search: string;
  onSearchChange: (search: string) => void;
  zones: ZoneDto[];
  selectedZoneIds: Set<string>;
  onToggleZone: (zoneId: string) => void;
  order: number;
  onOrderChange: (order: number) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
}

export function CreateSegmentFormView({
  search,
  onSearchChange,
  zones,
  selectedZoneIds,
  onToggleZone,
  order,
  onOrderChange,
  onSubmit,
  onCancel,
  isLoading = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  fetchNextPage,
}: CreateSegmentFormViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useContainerInfiniteScroll({
    hasNextPage,
    isFetching: isFetchingNextPage,
    fetchNextPage: fetchNextPage ?? (() => {}),
    containerRef: scrollContainerRef as React.RefObject<HTMLElement>,
  });

  return (
    <div className="grid gap-4 flex-1 min-h-0">
      <div className="grid gap-2">
        <Label htmlFor="order">Порядок сегмента</Label>
        <Input
          id="order"
          type="number"
          min="1"
          value={order}
          onChange={(e) => onOrderChange(Number.parseInt(e.target.value) || 1)}
          placeholder="1"
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="search">Пошук зон</Label>
        <Input
          id="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Введіть назву зони..."
          disabled={isLoading}
        />
      </div>

      <div
        ref={scrollContainerRef}
        className="overflow-auto h-[400px] border rounded-md p-2"
      >
        <div className="grid gap-2">
          {zones.map((zone) => (
            <div
              key={zone._id}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
            >
              <Checkbox
                id={zone._id}
                checked={selectedZoneIds.has(zone._id)}
                onCheckedChange={() => onToggleZone(zone._id)}
                disabled={isLoading}
              />
              <Label htmlFor={zone._id} className="flex-1 cursor-pointer">
                {zone.title} (штрих-код: {zone.bar})
              </Label>
            </div>
          ))}
          {isFetchingNextPage && (
            <div className="grid gap-2 p-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          )}
        </div>
        <div ref={bottomRef} className="h-4" />
      </div>

      <DialogActions
        onCancel={onCancel}
        onSubmit={onSubmit}
        isSubmitting={isLoading}
        isDisabled={selectedZoneIds.size === 0}
        submitText={`Створити (${selectedZoneIds.size} зон)`}
      />
    </div>
  );
}

