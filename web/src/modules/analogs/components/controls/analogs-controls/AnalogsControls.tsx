import { SelectLimit } from "@/components/shared/select-limit";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAnalogsParams } from "@/modules/analogs/hooks/useAnalogsParams";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";

export function AnalogsControls() {
  const { limit, setLimit, konkName, setKonkName, prodName, setProdName } =
    useAnalogsParams();
  const prodsQuery = useProdsQuery();
  const konksQuery = useKonksQuery();
  const prods = prodsQuery.data?.data ?? [];
  const konks = konksQuery.data?.data ?? [];

  return (
    <Wrapper className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      <div className="flex flex-wrap items-end gap-2">
        <div className="grid gap-1">
          <Label className="text-xs">Конкурент</Label>
          <Select
            value={konkName || "all"}
            onValueChange={(v) => setKonkName(v === "all" ? "" : v)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Усі" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Усі</SelectItem>
              {konks.map((k) => (
                <SelectItem key={k._id} value={k.name}>
                  {k.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1">
          <Label className="text-xs">Виробник</Label>
          <Select
            value={prodName || "all"}
            onValueChange={(v) => setProdName(v === "all" ? "" : v)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Усі" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Усі</SelectItem>
              {prods.map((p) => (
                <SelectItem key={p._id} value={p.name}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 lg:justify-end">
        <SelectLimit
          limitOptions={[10, 20, 50, 100]}
          limit={limit}
          setLimit={setLimit}
        />
      </div>
    </Wrapper>
  );
}
