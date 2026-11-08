import { EntityLabel } from "@/components/shared/entities/entity-label";
import { SurfaceSection } from "@/components/shared/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { KonkDto } from "@/modules/konks/api/types";

interface SkuStockBandsControlsViewProps {
  konkName: string;
  konks: KonkDto[];
  onKonkNameChange: (value: string) => void;
}

export function SkuStockBandsControlsView({
  konkName,
  konks,
  onKonkNameChange,
}: SkuStockBandsControlsViewProps) {
  return (
    <SurfaceSection className="flex min-w-0 flex-wrap items-end gap-3">
      <Select
        value={konkName || "all"}
        onValueChange={(value) =>
          onKonkNameChange(value === "all" ? "" : value)
        }
      >
        <SelectTrigger aria-label="Фільтр конкурента" className="min-w-[220px]">
          <SelectValue placeholder="Усі конкуренти" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Усі конкуренти</SelectItem>
          {konks.map((konk) => (
            <SelectItem key={konk._id} value={konk.name}>
              <EntityLabel
                imageUrl={konk.imageUrl}
                title={konk.title}
                fallbackLabel={konk.name}
                imageSize="xs"
              />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SurfaceSection>
  );
}
