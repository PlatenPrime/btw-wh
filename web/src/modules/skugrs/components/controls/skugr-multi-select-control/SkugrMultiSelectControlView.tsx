import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useContainerInfiniteScroll } from "@/hooks/useContainerInfiniteScroll";
import type { SkugrDto } from "@/modules/skugrs/api/types/dto";
import { SkugrMultiSelectControlSkeleton } from "./SkugrMultiSelectControlSkeleton";

interface SkugrMultiSelectControlViewProps {
  search: string;
  onSearchChange: (value: string) => void;
  skugrs: SkugrDto[];
  valueIds: Set<string>;
  onToggle: (skugrId: string) => void;
  isLoadingFirstPage: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  disabled?: boolean;
  searchInputId?: string;
}

export function SkugrMultiSelectControlView({
  search,
  onSearchChange,
  skugrs,
  valueIds,
  onToggle,
  isLoadingFirstPage,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  disabled = false,
  searchInputId = "skugr-multi-select-search",
}: SkugrMultiSelectControlViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useContainerInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetching: isFetchingNextPage,
    fetchNextPage,
    containerRef: scrollContainerRef as React.RefObject<HTMLElement>,
  });

  const showInitialSkeleton = isLoadingFirstPage && skugrs.length === 0;

  return (
    <div className="grid min-h-0 flex-1 gap-4">
      <div className="grid gap-2">
        <Label htmlFor={searchInputId}>Пошук груп</Label>
        <Input
          id={searchInputId}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="За назвою групи..."
          disabled={disabled}
        />
      </div>

      {showInitialSkeleton ? (
        <SkugrMultiSelectControlSkeleton />
      ) : (
        <div
          ref={scrollContainerRef}
          className="grid h-[280px] max-h-[min(50vh,320px)] gap-2 overflow-auto rounded-md border p-2 sm:h-[320px]"
        >
          <div className="grid gap-2">
            {skugrs.map((skugr) => (
              <div
                key={skugr._id}
                className="hover:bg-accent flex items-start gap-2 rounded-md p-2"
              >
                <Checkbox
                  id={`skugr-${skugr._id}`}
                  checked={valueIds.has(skugr._id)}
                  onCheckedChange={() => onToggle(skugr._id)}
                  disabled={disabled}
                  className="mt-0.5"
                />
                <Label
                  htmlFor={`skugr-${skugr._id}`}
                  className="flex flex-1 cursor-pointer flex-col gap-0.5 leading-snug"
                >
                  <span className="font-medium">{skugr.title}</span>
                  <span className="text-muted-foreground text-xs">
                    SKU у групі: {skugr.skus?.length ?? 0}
                  </span>
                </Label>
              </div>
            ))}
            {skugrs.length === 0 && !isLoadingFirstPage && (
              <p className="text-muted-foreground p-2 text-sm">
                Нічого не знайдено. Спробуйте змінити пошук.
              </p>
            )}
            {isFetchingNextPage && (
              <div className="grid gap-2 p-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            )}
          </div>
          <div ref={bottomRef} className="h-4 shrink-0" />
        </div>
      )}
    </div>
  );
}
