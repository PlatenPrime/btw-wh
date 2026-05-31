import { SurfaceSection } from "@/components/shared/layout";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { PalletGroupCard } from "@/modules/pallet-groups/components/cards/pallet-group-card/PalletGroupCard";

interface PalletGroupsGridProps {
  groups: PalletGroupDto[];
}

export function PalletGroupsGrid({ groups }: PalletGroupsGridProps) {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-2 p-2">
      {groups.map((group) => (
        <PalletGroupCard key={group.id} group={group} />
      ))}
    </SurfaceSection>
  );
}
