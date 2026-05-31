import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useContainerInfiniteScroll } from "@/hooks/useContainerInfiniteScroll";
import { EntityLabel } from "@/components/shared/entity-label";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkugrDto } from "@/modules/skugrs/api/types/dto";
import { useRef } from "react";
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
  getProdForSkugr: (prodName: string) => ProdDto | undefined;
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
  getProdForSkugr,
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
          className="bg-card grid h-[280px] max-h-[min(50vh,320px)] gap-2 overflow-auto rounded-md border p-2 sm:h-[320px]"
        >
          <div className="grid gap-2">
            {skugrs.map((skugr) => {
              const prod = getProdForSkugr(skugr.prodName);
              return (
                <div
                  key={skugr._id}
                  className="hover:bg-muted flex items-center gap-2 rounded-md p-2"
                >
                  <Checkbox
                    id={`skugr-${skugr._id}`}
                    checked={valueIds.has(skugr._id)}
                    onCheckedChange={() => onToggle(skugr._id)}
                    disabled={disabled}
                    className="shrink-0"
                  />
                  <EntityLabel
                    imageUrl={prod?.imageUrl}
                    title={prod?.title}
                    fallbackLabel={skugr.prodName}
                    imageSize="xs"
                    className="shrink-0 text-xs"
                  />
                  <Label
                    htmlFor={`skugr-${skugr._id}`}
                    className="grid min-w-0 flex-1 grid-cols-[1fr_auto] gap-0.5 leading-snug"
                  >
                    <span className="truncate font-medium">{skugr.title}</span>
                    <span className="text-muted-foreground shrink-0 text-xs">
                      ({skugr.skus?.length ?? 0} шт.)
                    </span>
                  </Label>
                </div>
              );
            })}
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
