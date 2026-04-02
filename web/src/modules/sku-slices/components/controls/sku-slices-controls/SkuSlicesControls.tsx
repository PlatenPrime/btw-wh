import { format, parse } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import { cn } from "@/lib/utils";

const DATE_API_FORMAT = "yyyy-MM-dd";

interface SkuSlicesControlsProps {
  konkName: string;
  onKonkNameChange: (value: string) => void;
  date: string;
  onDateChange: (value: string) => void;
}

function parseDate(value: string): Date | undefined {
  if (!value) return undefined;
  try {
    return parse(value, DATE_API_FORMAT, new Date());
  } catch {
    return undefined;
  }
}

export function SkuSlicesControls({
  konkName,
  onKonkNameChange,
  date,
  onDateChange,
}: SkuSlicesControlsProps) {
  const konksQuery = useKonksQuery();
  const konks = konksQuery.data?.data ?? [];
  const selectedDate = parseDate(date);

  const handleSelect = (d: Date | undefined) => {
    onDateChange(d ? format(d, DATE_API_FORMAT) : "");
  };

  return (
    <Wrapper className="flex flex-wrap items-end gap-3">
      <div className="flex min-w-0 flex-col gap-2">
        <Label htmlFor="sku-slices-konk">Конкурент</Label>
        <Select
          value={konkName || "all"}
          onValueChange={(v) => onKonkNameChange(v === "all" ? "" : v)}
        >
          <SelectTrigger
            id="sku-slices-konk"
            aria-label="Конкурент"
            className="min-w-[140px] sm:min-w-[160px]"
          >
            <SelectValue placeholder="Оберіть конкурента" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Оберіть конкурента</SelectItem>
            {konks.map((k) => (
              <SelectItem key={k._id} value={k.name}>
                <EntityLabel
                  imageUrl={k.imageUrl}
                  title={k.title}
                  fallbackLabel={k.name}
                />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <Label id="sku-slices-date-label">Дата</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="sku-slices-date"
              variant="outline"
              aria-labelledby="sku-slices-date-label"
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
    </Wrapper>
  );
}
