import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { AnalogDto } from "@/modules/analogs/api/types";
import { AnalogGridCard } from "@/modules/analogs/components/cards/analog-grid-card";

interface AnalogsGridProps {
  analogs: AnalogDto[];
  onEdit?: (analog: AnalogDto) => void;
  onDelete?: (analog: AnalogDto) => void;
}

export function AnalogsGrid({
  analogs,
  onEdit,
  onDelete,
}: AnalogsGridProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {analogs.map((analog) => (
        <AnalogGridCard
          key={analog._id}
          analog={analog}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Wrapper>
  );
}
