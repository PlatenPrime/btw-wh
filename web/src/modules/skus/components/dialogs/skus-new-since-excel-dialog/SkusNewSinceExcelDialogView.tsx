import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";

interface SkusNewSinceExcelDialogViewProps {
  selectedDate: Date | undefined;
  onSelectDate: (d: Date | undefined) => void;
  isDownloading: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function SkusNewSinceExcelDialogView({
  selectedDate,
  onSelectDate,
  isDownloading,
  onDownload,
  onCancel,
}: SkusNewSinceExcelDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Excel новинок конкурента</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm">
          У файл потраплять усі SKU обраного конкурента з датою створення не раніше
          обраного календарного дня (за правилами зрізів на сервері).
        </p>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          disabled={(date) => date > new Date()}
          numberOfMonths={1}
        />
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDownload}
          isSubmitting={isDownloading}
          submitText="Скачати"
          submitLoadingText="Завантаження..."
          isDisabled={!selectedDate}
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
