import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { LoadingNoData } from "@/components/shared/loading-states";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ZoneBySegmentCard } from "@/modules/blocks/components/cards/zone-by-segment-card";
import type { SegmentDto, ZoneWithSegmentDto } from "@/modules/blocks/api/types";

interface ZonesBySegmentListProps {
  segment: SegmentDto;
  zones: ZoneWithSegmentDto[];
  onAddZones: () => void;
}

export function ZonesBySegmentList({
  segment,
  zones,
  onAddZones,
}: ZonesBySegmentListProps) {
  if (zones.length === 0) {
    return (
      <Wrapper>
        <div className="grid gap-4 rounded-lg border border-dashed p-6 text-center">
          <LoadingNoData description="Цей сегмент не має зон" />
          <div className="flex justify-center">
            <Button onClick={onAddZones}>
              <Plus className="mr-2 size-4" />
              Додати зони
            </Button>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <>
      {zones
        .filter((zone) => zone.title)
        .map((zone) => (
          <ZoneBySegmentCard key={zone._id} segment={segment} zone={zone} />
        ))}
    </>
  );
}

