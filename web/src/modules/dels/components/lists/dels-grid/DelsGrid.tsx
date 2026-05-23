import { SurfaceSection } from "@/components/shared/wrappers/SurfaceSection";
import type { DelListItemDto } from "@/modules/dels/api/types";
import { DelCard } from "@/modules/dels/components/cards/del-card";

interface DelsGridProps {
  dels: DelListItemDto[];
}

export function DelsGrid({ dels }: DelsGridProps) {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-2 p-2 ">
      {dels.map((del) => (
        <DelCard key={del._id} del={del} />
      ))}
    </SurfaceSection>
  );
}
