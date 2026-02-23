import type { KonkDto } from "@/modules/konks/api/types";
import { KonkDetailsCard } from "@/modules/konks/components/cards/konk-details-card";

interface KonkContainerViewProps {
  konk: KonkDto;
}

export function KonkContainerView({ konk }: KonkContainerViewProps) {
  return (
    <div className="grid gap-2">
      <KonkDetailsCard konk={konk} />
    </div>
  );
}
