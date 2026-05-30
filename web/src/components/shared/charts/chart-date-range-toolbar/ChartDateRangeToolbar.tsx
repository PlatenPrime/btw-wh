import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export interface ChartDateRangeToolbarProps {
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (from: string, to: string) => void;
  /** Унікальні id для кнопки/лейбла, якщо на сторінці кілька тулбарів */
  idPrefix?: string;
  layout?: "toolbar" | "inline";
}

export function ChartDateRangeToolbar({
  dateFrom,
  dateTo,
  onDateRangeChange,
  idPrefix = "chart-date-range",
  layout = "toolbar",
}: ChartDateRangeToolbarProps) {
  const triggerId = `${idPrefix}-open`;
  const isInline = layout === "inline";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingRange, setPendingRange] = useState<DateRange | undefined>(
    undefined,
  );

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (open && dateFrom && dateTo) {
      setPendingRange({ from: new Date(dateFrom), to: new Date(dateTo) });
    }
    if (!open) {
      setPendingRange(undefined);
    }
  };

  const isRangeComplete = !!pendingRange?.from && !!pendingRange?.to;

  const handleConfirm = () => {
    if (!pendingRange?.from || !pendingRange?.to) return;
    let from = pendingRange.from;
    let to = pendingRange.to;
    if (from > to) {
      [from, to] = [to, from];
    }
    onDateRangeChange(format(from, "yyyy-MM-dd"), format(to, "yyyy-MM-dd"));
    setIsDialogOpen(false);
    setPendingRange(undefined);
  };

  const dateLabel =
    dateFrom && dateTo
      ? `${format(new Date(dateFrom), "dd.MM.yyyy")} — ${format(new Date(dateTo), "dd.MM.yyyy")}`
      : "Оберіть період";

  const triggerButton = (
    <Button
      id={triggerId}
      type="button"
      variant={isInline ? "outline" : "info-soft"}
      className={cn(
        "min-w-[220px] justify-start font-normal",
        isInline && "text-left",
      )}
      onClick={() => setIsDialogOpen(true)}
    >
      <span className="flex items-center gap-2">
        <CalendarIcon className="h-4 w-4 shrink-0" />
        {dateLabel}
      </span>
    </Button>
  );

  const dateDialog = (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-fit">
        <DialogHeader>
          <DialogTitle>Оберіть період</DialogTitle>
        </DialogHeader>
        <Calendar
          mode="range"
          selected={pendingRange}
          onSelect={setPendingRange}
          disabled={(date) => date > new Date()}
          numberOfMonths={2}
        />
        <DialogFooter className={cn(!isInline && "gap-2 sm:gap-0")}>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
          >
            Скасувати
          </Button>
          <Button
            type="button"
            variant={isInline ? "default" : "success"}
            disabled={!isRangeComplete}
            onClick={handleConfirm}
          >
            Обрати
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (isInline) {
    return (
      <>
        {triggerButton}
        {dateDialog}
      </>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-border/60 bg-surface-1/90 p-2 shadow-elevation-1">
      {triggerButton}
      {dateDialog}
    </div>
  );
}
