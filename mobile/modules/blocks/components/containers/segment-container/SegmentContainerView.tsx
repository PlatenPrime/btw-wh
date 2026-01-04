import { ThemedText } from "@/components/themed/themed-text";
import { ThemedBox, ThemedVStack } from "@/components/themed";
import type {
  SegmentDto,
  ZoneWithSegmentDto,
} from "@/modules/blocks/api/types";
import { SegmentInfo } from "@/modules/blocks/components/elements/segment-info";
import { ZonesBySegmentList } from "@/modules/blocks/components/lists/zones-by-segment-list";

interface SegmentContainerViewProps {
  segment: SegmentDto;
  zones: ZoneWithSegmentDto[] | undefined;
  isLoadingZones: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function SegmentContainerView({
  segment,
  zones,
  isLoadingZones,
  refreshing,
  onRefresh,
}: SegmentContainerViewProps) {
  return (
    <ThemedVStack className="flex-1 gap-4 p-2">
      <SegmentInfo segment={segment} />
      {isLoadingZones ? (
        <ThemedBox className="flex-1 justify-center items-center py-8">
          <ThemedText type="default" className="text-center">
            Завантаження зон...
          </ThemedText>
        </ThemedBox>
      ) : (
        <ThemedBox className="flex-1">
          <ZonesBySegmentList
            zones={zones}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </ThemedBox>
      )}
    </ThemedVStack>
  );
}
