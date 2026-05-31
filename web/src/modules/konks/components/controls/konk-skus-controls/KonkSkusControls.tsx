import { SelectLimit } from "@/components/shared/controls";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import type { ProdDto } from "@/modules/prods/api/types";

interface KonkSkusControlsProps {
  prods: ProdDto[];
  prodName: string;
  setProdName: (value: string) => void;
  limit: number;
  setLimit: (value: number) => void;
}

export function KonkSkusControls({
  prods,
  prodName,
  setProdName,
  limit,
  setLimit,
}: KonkSkusControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
      <Select value={prodName || "all"} onValueChange={(v) => setProdName(v === "all" ? "" : v)}>
        <SelectTrigger aria-label="Виробник" className="min-w-[140px] sm:min-w-[160px]">
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
      <SelectLimit limitOptions={[10, 20, 50, 100]} limit={limit} setLimit={setLimit} />
    </div>
  );
}
