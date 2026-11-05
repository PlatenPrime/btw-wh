import { Image } from "@/components/shared/media/image/Image";
import {
  URL_DIALOG_IMAGE_FALLBACK,
  UrlDialogImage,
} from "@/components/shared/dialogs";
import { KonkBanner } from "@/components/shared/domain/konk-banner";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useContainerInfiniteScroll } from "@/hooks/useContainerInfiniteScroll";
import { cn } from "@/lib/utils";
import { iconSize, typography } from "@/lib/typography";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkuDto } from "@/modules/skus/api/types";
import type { ReactNode } from "react";
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

export interface SkuMultiSelectQuery {
  search: string;
  konkName: string;
  prodName: string;
}

interface SkuMultiSelectControlViewProps {
  leadingSlot?: ReactNode;
  search: string;
  onSearchChange: (value: string) => void;
  filterKonkName: string;
  onFilterKonkNameChange: (value: string) => void;
  filterProdName: string;
  onFilterProdNameChange: (value: string) => void;
  showKonkFilter: boolean;
  konks: readonly KonkDto[];
  prods: readonly ProdDto[];
  hasRun: boolean;
  onRun: () => void;
  canReset: boolean;
  onReset: () => void;
  skus: SkuDto[];
  valueIds: Set<string>;
  selectAll: boolean;
  matchedTotal: number;
  selectedCount: number;
  onToggle: (sku: SkuDto) => void;
  onRequestSelectAll: () => void;
  onClearSelectAll: () => void;
  isLoadingFirstPage: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  disabled?: boolean;
  searchInputId?: string;
  konkByName: ReadonlyMap<string, KonkDto>;
  prodByName: ReadonlyMap<string, ProdDto>;
}

export function SkuMultiSelectControlView({
  leadingSlot,
  search,
  onSearchChange,
  filterKonkName,
  onFilterKonkNameChange,
  filterProdName,
  onFilterProdNameChange,
  showKonkFilter,
  konks,
  prods,
  hasRun,
  onRun,
  canReset,
  onReset,
  skus,
  valueIds,
  selectAll,
  matchedTotal,
  selectedCount,
  onToggle,
  onRequestSelectAll,
  onClearSelectAll,
  isLoadingFirstPage,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
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

  const showInitialSkeleton = isLoadingFirstPage && skus.length === 0;
  const canSelectAll = hasRun && matchedTotal > 0 && !disabled;

  return (
    <div className="grid gap-3">
      <div className="flex min-w-0 flex-wrap items-end gap-3">
        {leadingSlot}

        {showKonkFilter ? (
          <Select
            value={filterKonkName || "all"}
            onValueChange={(v) => onFilterKonkNameChange(v === "all" ? "" : v)}
            disabled={disabled}
          >
            <SelectTrigger
              id={`${searchInputId}-konk`}
              aria-label="Конкурент"
              className="h-9 min-w-[160px] text-sm sm:min-w-[180px]"
            >
              <SelectValue placeholder="Усі конкуренти" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Усі конкуренти</SelectItem>
              {konks.map((k) => (
                <SelectItem key={k._id} value={k.name}>
                  <EntityLabel
                    imageUrl={k.imageUrl}
                    title={k.title}
                    fallbackLabel={k.name}
                    imageSize="xs"
                  />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}

        <Select
          value={filterProdName || "all"}
          onValueChange={(v) => onFilterProdNameChange(v === "all" ? "" : v)}
          disabled={disabled}
        >
          <SelectTrigger
            id={`${searchInputId}-prod`}
            aria-label="Виробник"
            className="h-9 min-w-[160px] text-sm sm:min-w-[180px]"
          >
            <SelectValue placeholder="Усі виробники" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Усі виробники</SelectItem>
            {prods.map((p) => (
              <SelectItem key={p._id} value={p.name}>
                <EntityLabel
                  imageUrl={p.imageUrl}
                  title={p.title}
                  fallbackLabel={p.name}
                  imageSize="xs"
                />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          id={searchInputId}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="За назвою, ID або артикулом..."
          disabled={disabled}
          className="h-9 min-w-[200px] flex-1 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !disabled) {
              e.preventDefault();
              onRun();
            }
          }}
        />

        <Button
          type="button"
          variant="info"
          className="h-9"
          onClick={onRun}
          disabled={disabled}
        >
          Знайти
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-9"
          onClick={onReset}
          disabled={disabled || !canReset}
        >
          Скинути фільтри
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant={selectAll || selectedCount > 0 ? "default" : "outline"}
            className="px-3 py-1 text-sm tabular-nums"
          >
            {selectAll
              ? `Обрано всі · ${matchedTotal}`
              : `Обрано ${selectedCount}`}
          </Badge>
          {hasRun ? (
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm tabular-nums"
            >
              Знайдено {matchedTotal}
            </Badge>
          ) : null}
        </div>
        {selectAll ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9"
            onClick={onClearSelectAll}
            disabled={disabled}
          >
            Скасувати «всі»
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9"
            onClick={onRequestSelectAll}
            disabled={!canSelectAll}
          >
            Вибрати всі
          </Button>
        )}
      </div>

      {!hasRun ? (
        <p
          className={cn(
            "rounded-md border border-dashed p-4 text-center",
            typography.pageDescription,
          )}
        >
          Задайте фільтри та натисніть «Знайти», щоб показати товари.
        </p>
      ) : showInitialSkeleton ? (
        <SkuMultiSelectControlSkeleton />
      ) : (
        <div
          ref={scrollContainerRef}
          className="bg-card grid h-[280px] gap-2 overflow-auto rounded-md border p-2"
        >
          <div className="grid gap-2">
            {skus.map((sku) => {
              const selected = selectAll || valueIds.has(sku._id);
              const konk = konkByName.get(sku.konkName);
              const prod = prodByName.get(sku.prodName);
              const hasImage = Boolean(sku.imageUrl?.trim());
              const toggleDisabled = disabled || selectAll;
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
                Нічого не знайдено. Спробуйте змінити фільтри або пошук.
              </p>
            ) : null}
            {isFetchingNextPage ? (
              <div className="grid gap-2 p-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : null}
          </div>
          <div ref={bottomRef} className="h-4 shrink-0" />
        </div>
      )}
    </div>
  );
}
