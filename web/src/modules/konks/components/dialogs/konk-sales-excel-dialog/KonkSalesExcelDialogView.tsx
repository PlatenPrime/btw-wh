import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { EntityLabel } from "@/modules/analogs/components/entity-label/EntityLabel";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { SkugrMultiSelectControl } from "@/modules/skugrs/components/controls/skugr-multi-select-control";
import type { DateRange } from "react-day-picker";

export type KonkSalesExcelExportSort = "default" | "sales" | "revenue";

interface KonkSalesExcelDialogViewProps {
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
  exportSort: KonkSalesExcelExportSort;
  onExportSortChange: (value: KonkSalesExcelExportSort) => void;
  isExporting: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function KonkSalesExcelDialogView({
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
  exportSort,
  onExportSortChange,
  isExporting,
  onDownload,
  onCancel,
}: KonkSalesExcelDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const isRangeValid = from !== undefined && to !== undefined && from <= to;
  const isKonkOk = !showKonkSelect || Boolean(selectedKonkName);
  const isDownloadDisabled = !isRangeValid || !selectedProd || !isKonkOk;

  const skugrListReady = Boolean(resolvedKonkName && selectedProd);

  return (
    <DialogContent className="flex max-h-[min(90vh,720px)] flex-col gap-4 overflow-y-auto sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Експорт Excel продаж конкурента</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm">
          {showKonkSelect
            ? "Оберіть конкурента, виробника та період. Файл формується на backend та завантажується готовим Excel."
            : "Оберіть виробника та період. Файл формується на backend та завантажується готовим Excel."}
        </p>
        {showKonkSelect && (
          <div className="grid gap-2">
            <p className="text-sm font-medium">Конкурент</p>
            <Select
              value={selectedKonkName || "placeholder"}
              onValueChange={(v) =>
                onSelectedKonkNameChange(v === "placeholder" ? "" : v)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Оберіть конкурента" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placeholder" disabled>
                  Оберіть конкурента
                </SelectItem>
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
          </div>
        )}
        <div className="grid gap-2">
          <p className="text-sm font-medium">Виробник</p>
          <Select value={selectedProd} onValueChange={onSelectedProdChange}>
            <SelectTrigger>
              <SelectValue placeholder="Оберіть виробника" />
            </SelectTrigger>
            <SelectContent>
              {prods.map((prod) => (
                <SelectItem key={prod._id} value={prod.name}>
                  <EntityLabel
                    imageUrl={prod.imageUrl}
                    title={prod.title}
                    fallbackLabel={prod.name}
                    imageSize="xs"
                  />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid min-h-0 gap-2">
          <p className="text-sm font-medium">Товарні групи (опційно)</p>
          {!skugrListReady ? (
            <p className="text-muted-foreground text-sm">
              Оберіть конкурента та виробника, щоб обмежити вивантаження
              товарними групами.
            </p>
          ) : null}
          <SkugrMultiSelectControl
            konkName={resolvedKonkName}
            prodName={selectedProd}
            value={selectedSkugrIds}
            onChange={onSelectedSkugrIdsChange}
            enabled={skugrListReady}
            disabled={!skugrListReady}
            searchInputId="konk-sales-excel-skugr-search"
          />
        </div>
        <div className="grid gap-2">
          <p className="text-sm font-medium">Сортування товарів у файлі</p>
          <Select
            value={exportSort}
            onValueChange={(v) =>
              onExportSortChange(v as KonkSalesExcelExportSort)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">За замовчуванням</SelectItem>
              <SelectItem value="sales">За кількістю продажів (шт)</SelectItem>
              <SelectItem value="revenue">За виручкою</SelectItem>
            </SelectContent>
          </Select>
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
          isSubmitting={isExporting}
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
