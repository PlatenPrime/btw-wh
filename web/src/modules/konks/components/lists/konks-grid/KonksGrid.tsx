import { SurfaceSection } from "@/components/shared/layout";
import type { KonkDto } from "@/modules/konks/api/types";
import { KonkCard } from "@/modules/konks/components/cards/konk-card";

interface KonksGridProps {
  konks: KonkDto[];
}

export function KonksGrid({ konks }: KonksGridProps) {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-2 p-2 ">
      {konks.map((konk) => (
        <KonkCard key={konk._id} konk={konk} />
      ))}
    </SurfaceSection>
  );
}
