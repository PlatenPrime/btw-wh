import { useState } from "react";
import type { SegmentDto, ZoneWithSegmentDto } from "@/modules/blocks/api/types";
import { SegmentContainerView } from "./SegmentContainerView";
import { AddZonesToSegmentDialog } from "@/modules/blocks/components/dialogs/add-zones-to-segment-dialog";

interface SegmentContainerProps {
  segment: SegmentDto;
  zones: ZoneWithSegmentDto[];
  isLoadingZones: boolean;
  zonesError: Error | null;
}

export function SegmentContainer({
  segment,
  zones,
  isLoadingZones,
  zonesError,
}: SegmentContainerProps) {
  const [isAddZonesDialogOpen, setIsAddZonesDialogOpen] = useState(false);

  return (
    <>
      <SegmentContainerView
        segment={segment}
        zones={zones}
        isLoadingZones={isLoadingZones}
        zonesError={zonesError}
        onAddZones={() => setIsAddZonesDialogOpen(true)}
      />
      <AddZonesToSegmentDialog
        open={isAddZonesDialogOpen}
        onOpenChange={setIsAddZonesDialogOpen}
        segment={segment}
      />
    </>
  );
}

