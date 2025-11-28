import { ErrorDisplay } from "@/components/shared/error-components";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  SegmentDto,
  ZoneWithSegmentDto,
} from "@/modules/blocks/api/types";
import { SegmentInfoCard } from "@/modules/blocks/components/cards/segment-info-card";
import { ZonesBySegmentList } from "@/modules/blocks/components/lists/zones-by-segment-list";

interface SegmentContainerViewProps {
  segment: SegmentDto;
  zones: ZoneWithSegmentDto[];
  isLoadingZones: boolean;
  zonesError: Error | null;
  onAddZones: () => void;
}

export function SegmentContainerView({
  segment,
  zones,
  isLoadingZones,
  zonesError,
  onAddZones,
}: SegmentContainerViewProps) {
  return (
    <div className="flex flex-col gap-2">
      <Wrapper>
        <SegmentInfoCard
          segment={segment}
          zonesCount={zones.length}
          onAddZones={onAddZones}
        />
      </Wrapper>

      {isLoadingZones ? (
        <Wrapper>
          <Skeleton className="h-24 w-full" />
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
        <ZonesBySegmentList
          segment={segment}
          zones={zones}
          onAddZones={onAddZones}
        />
      )}
    </div>
  );
}
