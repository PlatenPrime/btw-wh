import { DialogActions } from "@/components/shared/dialogs";
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
import { typography } from "@/lib/typography";

export type SkuStatisticsSkugrShareExcelExportSort =
  | "default"
  | "sales"
  | "revenue";

interface SkuStatisticsSkugrShareExcelDialogViewProps {
  dateFrom: string;
  dateTo: string;
  exportSort: SkuStatisticsSkugrShareExcelExportSort;
  onExportSortChange: (value: SkuStatisticsSkugrShareExcelExportSort) => void;
  isExporting: boolean;
  isDownloadDisabled: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function SkuStatisticsSkugrShareExcelDialogView({
  dateFrom,
  dateTo,
  exportSort,
  onExportSortChange,
  isExporting,
  isDownloadDisabled,
  onDownload,
  onCancel,
}: SkuStatisticsSkugrShareExcelDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Excel з картинками товарів</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <p className={typography.pageDescription}>
          Та сама таблиця часток за період на сторінці, з картинками товарів.
          Файл готується на сервері.
        </p>
        <div className="grid gap-1">
          <p className={typography.formLabel}>Період</p>
          <p className="text-foreground text-sm tabular-nums">
            {dateFrom} — {dateTo}
          </p>
        </div>
        <div className="grid gap-2">
          <p className={typography.formLabel}>Сортування товарів у файлі</p>
          <Select
            value={exportSort}
            onValueChange={(v) =>
              onExportSortChange(v as SkuStatisticsSkugrShareExcelExportSort)
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
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDownload}
          isSubmitting={isExporting}
          submitText="Скачати"
          submitLoadingText="Готуємо..."
          isDisabled={isDownloadDisabled}
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
