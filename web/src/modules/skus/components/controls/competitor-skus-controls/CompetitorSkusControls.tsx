import { SearchPanel } from "@/components/shared/search-components/search-panel/SearchPanel";
import { SelectLimit } from "@/components/shared/select-limit";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import type { CompetitorSkusScope } from "@/modules/skus/hooks/useCompetitorSkusParams";
import { format, parse } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

const DATE_API_FORMAT = "yyyy-MM-dd";

function parseDate(value: string): Date | undefined {
  if (!value) return undefined;
  try {
    return parse(value, DATE_API_FORMAT, new Date());
  } catch {
    return undefined;
  }
}

interface CompetitorSkusControlsProps {
  limit: number;
  setLimit: (n: number) => void;
  konkName: string;
  setKonkName: (v: string) => void;
  prodName: string;
  setProdName: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
  scope: CompetitorSkusScope;
  setScope: (s: CompetitorSkusScope) => void;
  createdFrom: string;
  setCreatedFrom: (v: string) => void;
}

export function CompetitorSkusControls({
  limit,
  setLimit,
  konkName,
  setKonkName,
  prodName,
  setProdName,
  search,
  setSearch,
  scope,
  setScope,
  createdFrom,
  setCreatedFrom,
}: CompetitorSkusControlsProps) {
  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];
  const selectedDate = parseDate(createdFrom);

  const handleDateSelect = (d: Date | undefined) => {
    setCreatedFrom(d ? format(d, DATE_API_FORMAT) : "");
  };

  const scopeSelectValue = scope;

  return (
    <Wrapper className="grid grid-cols-1 gap-3">
      <div className="flex min-w-0 flex-1 flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1 basis-full">
          <SearchPanel
            search={search}
            onSearchChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук за назвою товару..."
          />
        </div>
        <div className="flex min-w-0 flex-wrap items-end gap-3">
          <div className="flex min-w-0 flex-col gap-2">
            <Select
              value={konkName || "all"}
              onValueChange={(v) => setKonkName(v === "all" ? "" : v)}
            >
              <SelectTrigger
                id="comp-skus-konk"
                aria-label="Конкурент"
                className="min-w-[140px] sm:min-w-[160px]"
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
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <Select
              value={prodName || "all"}
              onValueChange={(v) => setProdName(v === "all" ? "" : v)}
            >
              <SelectTrigger
                id="comp-skus-prod"
                aria-label="Виробник"
                className="min-w-[140px] sm:min-w-[160px]"
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
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <Select
              value={scopeSelectValue}
              onValueChange={(v) => setScope(v as CompetitorSkusScope)}
            >
              <SelectTrigger
                id="comp-skus-scope"
                aria-label="Режим фільтра"
                className="min-w-[160px] sm:min-w-[200px]"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Усі товари</SelectItem>
                <SelectItem value="invalid">Лише невалідні</SelectItem>
                <SelectItem value="new_since">Новинки з дати</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {scope === "new_since" ? (
            <div className="flex min-w-0 flex-col gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    aria-labelledby="comp-skus-created-label"
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
                    onSelect={handleDateSelect}
                    disabled={(d) => d > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          ) : null}
          <SelectLimit
            limitOptions={[10, 20, 50, 100]}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
      </div>
    </Wrapper>
  );
}
