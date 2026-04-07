import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { EntityLabel } from "@/modules/analogs/components/entity-label/EntityLabel";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

interface SkuStatisticsControlsProps {
  konk: string;
  dateFrom: string;
  dateTo: string;
  onKonkChange: (value: string) => void;
  onDateRangeChange: (from: string, to: string) => void;
}

export function SkuStatisticsControls({
  konk,
  dateFrom,
  dateTo,
  onKonkChange,
  onDateRangeChange,
}: SkuStatisticsControlsProps) {
  const konksQuery = useKonksQuery();
  const konks = konksQuery.data?.data ?? [];

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
    onDateRangeChange(
      format(pendingRange.from, "yyyy-MM-dd"),
      format(pendingRange.to, "yyyy-MM-dd"),
    );
    setIsDialogOpen(false);
    setPendingRange(undefined);
  };

  const dateLabel =
    dateFrom && dateTo
      ? `${format(new Date(dateFrom), "dd.MM.yyyy")} — ${format(new Date(dateTo), "dd.MM.yyyy")}`
      : "Оберіть період";

  return (
    <Wrapper className="grid grid-cols-1 gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <Select
          value={konk || "placeholder"}
          onValueChange={(v) => onKonkChange(v === "placeholder" ? "" : v)}
        >
          <SelectTrigger
            aria-label="Конкурент"
            className="min-w-[180px] sm:min-w-[220px]"
          >
            <SelectValue placeholder="Оберіть конкурента" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="placeholder" disabled>
              Оберіть конкурента
            </SelectItem>
            {konks.map((item) => (
              <SelectItem key={item._id} value={item.name}>
                <EntityLabel
                  imageUrl={item.imageUrl}
                  title={item.title}
                  fallbackLabel={item.name}
                  imageSize="xs"
                />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="min-w-[240px] justify-start text-left font-normal"
          onClick={() => setIsDialogOpen(true)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateLabel}
        </Button>

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
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Скасувати
              </Button>
              <Button disabled={!isRangeComplete} onClick={handleConfirm}>
                Обрати
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Wrapper>
  );
}
