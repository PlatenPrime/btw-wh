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
import { ListChecks, ListX, RotateCcw, Search } from "lucide-react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { SkuMultiSelectControlSkeleton } from "./SkuMultiSelectControlSkeleton";

const SKU_ROW_PLACEHOLDER = "https://placehold.co/96x96?text=SKU&font=roboto";

const SELECT_TRIGGER_CLASS =
  "h-8 w-full min-w-0 overflow-hidden text-sm";

export type SkuMultiSelectLayout = "dialog" | "page";

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
  layout?: SkuMultiSelectLayout;
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
  catalogActive: boolean;
  disabledHint?: string;
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
  layout = "page",
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
  catalogActive,
  disabledHint,
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
  const canSelectAll = catalogActive && matchedTotal > 0 && !disabled;

  const konkSelect = showKonkFilter ? (
    <Select
      value={filterKonkName || "all"}
      onValueChange={(v) => onFilterKonkNameChange(v === "all" ? "" : v)}
      disabled={disabled}
    >
      <SelectTrigger
        id={`${searchInputId}-konk`}
        aria-label="Конкурент"
        className={SELECT_TRIGGER_CLASS}
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
  ) : null;

  const prodSelect = (
    <Select
      value={filterProdName || "all"}
      onValueChange={(v) => onFilterProdNameChange(v === "all" ? "" : v)}
      disabled={disabled}
    >
      <SelectTrigger
        id={`${searchInputId}-prod`}
        aria-label="Виробник"
        className={SELECT_TRIGGER_CLASS}
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
  );

  const searchInput = (
    <div className="relative min-w-0 w-full">
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        aria-hidden
      />
      <Input
        id={searchInputId}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="За назвою, ID або артикулом..."
        disabled={disabled}
        className="h-8 w-full min-w-0 pl-9 text-sm"
      />
    </div>
  );

  const resetButton = (
    <Button
      type="button"
      variant="destructive-soft"
      size="sm"
      className="h-8 w-auto shrink-0"
      onClick={onReset}
      disabled={disabled || !canReset}
    >
      <RotateCcw />
      Скинути фільтри
    </Button>
  );

  const foundBadge = (
    <Badge
      variant={catalogActive ? "secondary" : "outline"}
      className="px-2.5 py-0.5 text-sm tabular-nums"
    >
      {catalogActive ? `Знайдено ${matchedTotal}` : "Знайдено —"}
    </Badge>
  );

  const selectedBadge = (
    <Badge
      variant={selectAll || selectedCount > 0 ? "default" : "outline"}
      className="px-2.5 py-0.5 text-sm tabular-nums"
    >
      {selectAll
        ? `Обрано всі · ${matchedTotal}`
        : `Обрано ${selectedCount}`}
    </Badge>
  );

  const selectAllButton = selectAll ? (
    <Button
      type="button"
      variant="default"
      size="sm"
      className="h-8 w-auto shrink-0"
      onClick={onClearSelectAll}
      disabled={disabled}
    >
      <ListX />
      Скасувати «всі»
    </Button>
  ) : (
    <Button
      type="button"
      variant="default"
      size="sm"
      className="h-8 w-auto shrink-0"
      onClick={onRequestSelectAll}
      disabled={!canSelectAll}
    >
      <ListChecks />
      Вибрати всі
    </Button>
  );

  const resultsResetRow = (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center">{foundBadge}</div>
      {resetButton}
    </div>
  );

  const selectedRow = (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center">{selectedBadge}</div>
      {selectAllButton}
    </div>
  );

  const pageSelectClass = "w-full sm:w-[200px] sm:max-w-[240px] shrink-0";

  const toolbar =
    layout === "dialog" ? (
      <div className="grid min-w-0 gap-2">
        {leadingSlot}
        {konkSelect}
        {prodSelect}
        {searchInput}
        {resultsResetRow}
        {selectedRow}
      </div>
    ) : (
      <div className="grid min-w-0 gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {leadingSlot ? (
            <div className="w-full shrink-0 sm:w-auto">{leadingSlot}</div>
          ) : null}
          {showKonkFilter ? (
            <div className={pageSelectClass}>{konkSelect}</div>
          ) : null}
          <div className={pageSelectClass}>{prodSelect}</div>
        </div>
        {searchInput}
        {resultsResetRow}
        {selectedRow}
      </div>
    );

  return (
    <div className="grid gap-3">
      {toolbar}

      {!catalogActive ? (
        <p
          className={cn(
            "rounded-md border border-dashed p-4 text-center",
            typography.pageDescription,
          )}
        >
          {disabledHint ?? "Оберіть період, щоб показати товари."}
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
