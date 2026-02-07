import { ErrorDisplay } from "@/components/shared/error-components";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
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
      <Wrapper>
        <SegmentInfoCard segment={segment} zonesCount={zones.length} />
      </Wrapper>

      {isLoadingZones ? (
        <Wrapper>
          <div className="flex flex-col gap-2">
            <ZoneBySegmentCardSkeleton />
            <ZoneBySegmentCardSkeleton />
          </div>
        </Wrapper>
      ) : zonesError ? (
        <Wrapper>
          <ErrorDisplay
            error={zonesError}
            title="Помилка завантаження зон"
            description="Не вдалося завантажити зони сегмента"
          />
        </Wrapper>
      ) : (
        <ZonesBySegmentList segment={segment} zones={zones} />
      )}
    </div>
  );
}
