import { format, parse } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { SurfaceSection } from "@/components/shared/layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const DATE_API_FORMAT = "yyyy-MM-dd";

interface BtradeSlicesControlsProps {
  date: string;
  onDateChange: (value: string) => void;
  showInvalidOnly: boolean;
  onShowInvalidOnlyChange: (value: boolean) => void;
}

function parseDate(value: string): Date | undefined {
  if (!value) return undefined;
  try {
    return parse(value, DATE_API_FORMAT, new Date());
  } catch {
    return undefined;
  }
}

export function BtradeSlicesControls({
  date,
  onDateChange,
  showInvalidOnly,
  onShowInvalidOnlyChange,
}: BtradeSlicesControlsProps) {
  const selectedDate = parseDate(date);

  const handleSelect = (d: Date | undefined) => {
    onDateChange(d ? format(d, DATE_API_FORMAT) : "");
  };

  return (
    <SurfaceSection className="flex flex-wrap items-end gap-3">
      <div className="flex min-w-0 flex-col gap-2">
        <Label id="btrade-slices-date-label">Дата</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="btrade-slices-date"
              variant="outline"
              aria-labelledby="btrade-slices-date-label"
              aria-label="Дата зрізу"
              className={cn(
                "min-w-[140px] justify-start text-left font-normal sm:min-w-[200px]",
                !selectedDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 size-4 shrink-0" />
              {selectedDate ? (
                format(selectedDate, "d MMM yyyy", { locale: uk })
              ) : (
                <span>Оберіть дату</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              disabled={(d) => d > new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center gap-2 pb-0.5">
        <Switch
          id="btrade-slices-invalid-only"
          checked={showInvalidOnly}
          onCheckedChange={onShowInvalidOnlyChange}
        />
        <Label
          htmlFor="btrade-slices-invalid-only"
          className="text-muted-foreground cursor-pointer text-sm font-normal"
        >
          Лише невалідні
        </Label>
      </div>
    </SurfaceSection>
  );
}
