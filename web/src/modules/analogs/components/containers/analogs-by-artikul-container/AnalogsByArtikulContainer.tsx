import type { AnalogsByArtikulResponseDto } from "@/modules/analogs/api/types";
import { AnalogsGrid } from "@/modules/analogs/components/lists/analogs-grid";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";

interface AnalogsByArtikulContainerProps {
  data: AnalogsByArtikulResponseDto;
  konks: KonkDto[];
  prods: ProdDto[];
}

export function AnalogsByArtikulContainer({
  data,
  konks,
  prods,
}: AnalogsByArtikulContainerProps) {
  return (
    <AnalogsGrid
      analogs={data.data}
      konks={konks}
      prods={prods}
    />
  );
}
