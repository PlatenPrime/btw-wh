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
import type { ProdDto } from "@/modules/prods/api/types";
import type { DateRange } from "react-day-picker";

interface KonkSliceExcelDialogViewProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  selectedProd: string;
  onSelectedProdChange: (value: string) => void;
  prods: ProdDto[];
  isDownloading: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function KonkSliceExcelDialogView({
  dateRange,
  onDateRangeChange,
  selectedProd,
  onSelectedProdChange,
  prods,
  isDownloading,
  onDownload,
  onCancel,
}: KonkSliceExcelDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const isRangeValid = from !== undefined && to !== undefined && from <= to;
  const isDownloadDisabled = !isRangeValid || !selectedProd;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Експорт Excel залишків конкурента</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm">
          Оберіть виробника та період. Файл буде сформований з endpoint
          `sku-slices/konk/excel`.
        </p>
        <div className="grid gap-2">
          <p className="text-sm font-medium">Виробник</p>
          <Select value={selectedProd} onValueChange={onSelectedProdChange}>
            <SelectTrigger>
              <SelectValue placeholder="Оберіть виробника" />
            </SelectTrigger>
            <SelectContent>
              {prods.map((prod) => (
                <SelectItem key={prod._id} value={prod.name}>
                  {prod.title}
                </SelectItem>
              ))}
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
