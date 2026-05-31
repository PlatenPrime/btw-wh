import { ErrorDisplay } from "@/components/shared/errors";
import { SurfaceSection } from "@/components/shared/layout";
import type {
  SegmentDto,
  ZoneWithSegmentDto,
} from "@/modules/blocks/api/types";
import { SegmentInfoCard } from "@/modules/blocks/components/cards/segment-info-card";
import { ZoneBySegmentCardSkeleton } from "@/modules/blocks/components/cards/zone-by-segment-card";
import { ZonesBySegmentList } from "@/modules/blocks/components/lists/zones-by-segment-list";

interface SegmentContainerViewProps {
  segment: SegmentDto;
  zones: ZoneWithSegmentDto[];
  isLoadingZones: boolean;
  zonesError: Error | null;
}

export function SegmentContainerView({
  segment,
  zones,
  isLoadingZones,
  zonesError,
}: SegmentContainerViewProps) {
  return (
    <div className="flex flex-col gap-2">
      <SurfaceSection>
        <SegmentInfoCard segment={segment} zonesCount={zones.length} />
      </SurfaceSection>

      {isLoadingZones ? (
        <SurfaceSection>
          <div className="flex flex-col gap-2">
            <ZoneBySegmentCardSkeleton />
            <ZoneBySegmentCardSkeleton />
          </div>
        </SurfaceSection>
      ) : zonesError ? (
        <SurfaceSection>
          <ErrorDisplay
            error={zonesError}
            title="Помилка завантаження зон"
            description="Не вдалося завантажити зони сегмента"
          />
        </SurfaceSection>
      ) : (
        <ZonesBySegmentList segment={segment} zones={zones} />
      )}
    </div>
  );
}
