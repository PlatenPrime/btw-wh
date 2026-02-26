import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { AnalogDto } from "@/modules/analogs/api/types";
import { AnalogGridCard } from "@/modules/analogs/components/cards/analog-grid-card";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";

interface AnalogsGridProps {
  analogs: AnalogDto[];
  konks: KonkDto[];
  prods: ProdDto[];
  onEdit?: (analog: AnalogDto) => void;
  onDelete?: (analog: AnalogDto) => void;
}

export function AnalogsGrid({
  analogs,
  konks,
  prods,
  onEdit,
  onDelete,
}: AnalogsGridProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {analogs.map((analog) => (
        <AnalogGridCard
          key={analog._id}
          analog={analog}
          konks={konks}
          prods={prods}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Wrapper>
  );
}
