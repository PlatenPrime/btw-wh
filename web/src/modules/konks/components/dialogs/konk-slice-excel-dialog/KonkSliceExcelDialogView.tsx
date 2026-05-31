import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  KonkEntitySelect,
  ProdEntitySelect,
} from "@/components/shared/controls";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { SKU_KONK_PROD_QUERY_ALL } from "@/modules/sku-analytics/constants";
import { SkugrMultiSelectControl } from "@/modules/skugrs/components/controls/skugr-multi-select-control";
import type { DateRange } from "react-day-picker";

interface KonkSliceExcelDialogViewProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  showKonkSelect: boolean;
  selectedKonkName: string;
  onSelectedKonkNameChange: (value: string) => void;
  konks: KonkDto[];
  resolvedKonkName: string;
  selectedProd: string;
  onSelectedProdChange: (value: string) => void;
  prods: ProdDto[];
  selectedSkugrIds: string[];
  onSelectedSkugrIdsChange: (ids: string[]) => void;
  isDownloading: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function KonkSliceExcelDialogView({
  dateRange,
  onDateRangeChange,
  showKonkSelect,
  selectedKonkName,
  onSelectedKonkNameChange,
  konks,
  resolvedKonkName,
  selectedProd,
  onSelectedProdChange,
  prods,
  selectedSkugrIds,
  onSelectedSkugrIdsChange,
  isDownloading,
  onDownload,
  onCancel,
}: KonkSliceExcelDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const isRangeValid = from !== undefined && to !== undefined && from <= to;
  const isKonkOk = !showKonkSelect || Boolean(selectedKonkName);
  const isDownloadDisabled = !isRangeValid || !selectedProd || !isKonkOk;

  const skugrListReady = Boolean(resolvedKonkName);
  const prodNameForSkugrList =
    selectedProd === SKU_KONK_PROD_QUERY_ALL ? "" : selectedProd;

  return (
    <DialogContent className="flex max-h-[min(90vh,720px)] flex-col gap-4 overflow-y-auto sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Експорт Excel залишків конкурента</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm">
          {showKonkSelect
            ? "Оберіть конкурента, виробника та період. Файл буде сформований з endpoint sku-slices/konk/excel."
            : "Оберіть виробника та період. Файл буде сформований з endpoint sku-slices/konk/excel."}
        </p>
        {showKonkSelect ? (
          <div className="grid gap-2">
            <p className="text-sm font-medium">Конкурент</p>
            <KonkEntitySelect
              value={selectedKonkName}
              onValueChange={onSelectedKonkNameChange}
              konks={konks}
              className="w-full min-w-0"
            />
          </div>
        ) : null}
        <div className="grid gap-2">
          <p className="text-sm font-medium">Виробник</p>
          <ProdEntitySelect
            value={selectedProd}
            onValueChange={onSelectedProdChange}
            prods={prods}
            showAllProducersOption
            className="w-full min-w-0"
          />
        </div>
        <div className="grid min-h-0 gap-2">
          <p className="text-sm font-medium">Товарні групи (опційно)</p>
          {!skugrListReady ? (
            <p className="text-muted-foreground text-sm">
              Оберіть конкурента, щоб обмежити вивантаження товарними групами.
            </p>
          ) : null}
          <SkugrMultiSelectControl
            konkName={resolvedKonkName}
            prodName={prodNameForSkugrList}
            value={selectedSkugrIds}
            onChange={onSelectedSkugrIdsChange}
            enabled={skugrListReady}
            disabled={!skugrListReady}
            searchInputId="konk-slice-excel-skugr-search"
          />
        </div>
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={onDateRangeChange}
          disabled={(date) => date > new Date()}
          numberOfMonths={1}
        />
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDownload}
          isSubmitting={isDownloading}
          submitText="Скачати"
          submitLoadingText="Формування..."
          isDisabled={isDownloadDisabled}
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
