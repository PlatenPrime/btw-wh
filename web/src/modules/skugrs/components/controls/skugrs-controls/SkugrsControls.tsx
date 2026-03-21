import { SearchPanel } from "@/components/shared/search-components/search-panel/SearchPanel";
import { SelectLimit } from "@/components/shared/select-limit";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { useSkugrsParams } from "@/modules/skugrs/hooks/useSkugrsParams";

export function SkugrsControls() {
  const { limit, setLimit, konkName, setKonkName, prodName, setProdName, search, setSearch } =
    useSkugrsParams();
  const prodsQuery = useProdsQuery();
  const konksQuery = useKonksQuery();
  const prods = prodsQuery.data?.data ?? [];
  const konks = konksQuery.data?.data ?? [];

  return (
    <Wrapper className="grid grid-cols-1 gap-3">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1 basis-full">
          <SearchPanel
            search={search}
            onSearchChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук за назвою групи..."
          />
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <Select
            value={konkName || "all"}
            onValueChange={(v) => setKonkName(v === "all" ? "" : v)}
          >
            <SelectTrigger
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
                  />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={prodName || "all"}
            onValueChange={(v) => setProdName(v === "all" ? "" : v)}
          >
            <SelectTrigger
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
                  />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
