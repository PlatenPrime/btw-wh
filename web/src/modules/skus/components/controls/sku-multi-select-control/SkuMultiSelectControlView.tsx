import { Image } from "@/components/shared/media/image/Image";
import {
  URL_DIALOG_IMAGE_FALLBACK,
  UrlDialogImage,
} from "@/components/shared/dialogs";
import { KonkBanner } from "@/components/shared/domain/konk-banner";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useContainerInfiniteScroll } from "@/hooks/useContainerInfiniteScroll";
import { cn } from "@/lib/utils";
import { iconSize, typography } from "@/lib/typography";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkuDto } from "@/modules/skus/api/types";
import { useRef } from "react";
import { SkuMultiSelectControlSkeleton } from "./SkuMultiSelectControlSkeleton";

const SKU_ROW_PLACEHOLDER = "https://placehold.co/96x96?text=SKU&font=roboto";

export interface SkuMultiSelectPick {
  id: string;
  title: string;
  imageUrl?: string;
  konkName: string;
  prodName: string;
}

interface SkuMultiSelectControlViewProps {
  search: string;
  onSearchChange: (value: string) => void;
  skus: SkuDto[];
  valueIds: Set<string>;
  picks: readonly SkuMultiSelectPick[];
  onToggle: (sku: SkuDto) => void;
  onRemovePick: (id: string) => void;
  isLoadingFirstPage: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  hasMoreOnServer: boolean;
  maxSelected: number;
  disabled?: boolean;
  searchInputId?: string;
  konkByName: ReadonlyMap<string, KonkDto>;
  prodByName: ReadonlyMap<string, ProdDto>;
}

export function SkuMultiSelectControlView({
  search,
  onSearchChange,
  skus,
  valueIds,
  picks,
  onToggle,
  onRemovePick,
  isLoadingFirstPage,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  hasMoreOnServer,
  maxSelected,
  disabled = false,
  searchInputId = "sku-multi-select-search",
  konkByName,
  prodByName,
}: SkuMultiSelectControlViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useContainerInfiniteScroll({
    hasNextPage,
    isFetching: isFetchingNextPage,
    fetchNextPage,
    containerRef: scrollContainerRef as React.RefObject<HTMLElement>,
  });

  const atLimit = valueIds.size >= maxSelected;
  const showInitialSkeleton = isLoadingFirstPage && skus.length === 0;

  return (
    <div className="grid gap-3">
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor={searchInputId}>Пошук товарів</Label>
          <span className={typography.caption}>
            Обрано {valueIds.size}/{maxSelected}
          </span>
        </div>
        <Input
          id={searchInputId}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="За назвою, ID або артикулом..."
          disabled={disabled}
        />
      </div>

      {picks.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {picks.map((pick) => (
            <Badge
              key={pick.id}
              variant="secondary"
              className="max-w-full cursor-pointer gap-1 truncate"
              onClick={() => {
                if (!disabled) onRemovePick(pick.id);
              }}
              title="Прибрати"
            >
              <span className="truncate">{pick.title}</span>
              <span aria-hidden>×</span>
            </Badge>
          ))}
        </div>
      ) : null}

      {showInitialSkeleton ? (
        <SkuMultiSelectControlSkeleton />
      ) : (
        <div
          ref={scrollContainerRef}
          className="bg-card grid h-[280px] gap-2 overflow-auto rounded-md border p-2"
        >
          <div className="grid gap-2">
            {skus.map((sku) => {
              const selected = valueIds.has(sku._id);
              const konk = konkByName.get(sku.konkName);
              const prod = prodByName.get(sku.prodName);
              const hasImage = Boolean(sku.imageUrl?.trim());
              const toggleDisabled =
                disabled || (!selected && atLimit);
              const checkboxId = `sku-multi-${sku._id}`;

              return (
                <div
                  key={sku._id}
                  className={cn(
                    "overflow-hidden rounded-md border border-border",
                    selected ? "bg-accent/40" : "hover:bg-muted/60",
                  )}
                >
                  <KonkBanner
                    konkName={sku.konkName}
                    imageUrl={konk?.imageUrl}
                    title={konk?.title}
                  />
                  <div className="flex items-start gap-2 p-2">
                    <Checkbox
                      id={checkboxId}
                      checked={selected}
                      onCheckedChange={() => onToggle(sku)}
                      disabled={toggleDisabled}
                      className="mt-1 shrink-0"
                    />
                    {hasImage ? (
                      <UrlDialogImage
                        imageUrl={sku.imageUrl}
                        alt={sku.title}
                        fallbackSrc={URL_DIALOG_IMAGE_FALLBACK}
                        previewClassName={cn(
                          "bg-muted aspect-square rounded-lg object-cover",
                          iconSize.avatarList,
                        )}
                      />
                    ) : (
                      <div
                        className={cn(
                          "bg-muted aspect-square overflow-hidden rounded-lg",
                          iconSize.avatarList,
                        )}
                      >
                        <Image
                          src={SKU_ROW_PLACEHOLDER}
                          alt=""
                          className="size-full object-cover"
                        />
                      </div>
                    )}
                    <Label
                      htmlFor={checkboxId}
                      className="grid min-w-0 flex-1 gap-1"
                    >
                      <span
                        className={cn(
                          "line-clamp-2 text-left",
                          typography.gridTitle,
                        )}
                      >
                        {sku.title.trim() || sku.productId}
                      </span>
                      <EntityLabel
                        imageUrl={prod?.imageUrl}
                        title={prod?.title}
                        fallbackLabel={sku.prodName}
                        imageSize="xs"
                        className="text-xs"
                      />
                      {sku.artikul?.trim() ? (
                        <span className={typography.caption}>
                          Артикул: {sku.artikul}
                        </span>
                      ) : null}
                    </Label>
                  </div>
                </div>
              );
            })}
            {skus.length === 0 && !isLoadingFirstPage ? (
              <p className={cn("p-2", typography.pageDescription)}>
                Нічого не знайдено. Спробуйте змінити пошук.
              </p>
            ) : null}
            {isFetchingNextPage ? (
              <div className="grid gap-2 p-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : null}
            {hasMoreOnServer ? (
              <p className={cn("p-2", typography.caption)}>
                Уточніть пошук, щоб побачити решту.
              </p>
            ) : null}
          </div>
          <div ref={bottomRef} className="h-4 shrink-0" />
        </div>
      )}
    </div>
  );
}
