import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { PalletGroupCard } from "@/modules/pallet-groups/components/cards/pallet-group-card/PalletGroupCard";

interface PalletGroupsGridProps {
  groups: PalletGroupDto[];
}

export function PalletGroupsGrid({ groups }: PalletGroupsGridProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2">
      {groups.map((group) => (
        <PalletGroupCard key={group.id} group={group} />
      ))}
    </Wrapper>
  );
}
