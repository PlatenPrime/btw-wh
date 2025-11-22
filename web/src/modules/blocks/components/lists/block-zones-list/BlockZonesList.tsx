import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { ZoneWithBlockDto } from "@/modules/blocks/api/types";
import { BlockZoneCard } from "@/modules/blocks/components/cards/block-zone-card";

interface BlockZonesListProps {
  zones: ZoneWithBlockDto[];
  isEditMode?: boolean;
  onRemove?: (zone: ZoneWithBlockDto) => void;
}

export function BlockZonesList({ zones, isEditMode = false, onRemove }: BlockZonesListProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2">
      {zones.map((zone) => (
        <BlockZoneCard
          key={zone._id}
          zone={zone}
          isEditMode={isEditMode}
          onRemove={onRemove ? () => onRemove(zone) : undefined}
        />
      ))}
    </Wrapper>
  );
}

