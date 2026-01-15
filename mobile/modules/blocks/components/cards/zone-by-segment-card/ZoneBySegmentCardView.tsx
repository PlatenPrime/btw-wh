import { ThemedText } from "@/components/themed/themed-text";
import { ThemedBox, ThemedHStack, ThemedPressable, ThemedVStack } from "@/components/themed";
import { ArtsByZoneFetcher } from "@/modules/arts/components/fetchers/arts-by-zone-fetcher/ArtsByZoneFetcher";
import {
  ArtsByZoneContainer,
  ArtsByZoneContainerSkeleton,
} from "@/modules/zones/components/containers/arts-by-zone-container";
import { useRouter } from "expo-router";

interface ZoneBySegmentCardViewProps {
  zoneId: string;
  zoneTitle: string;
  bar: number;
  sector: number;
  onPress?: () => void;
}

export function ZoneBySegmentCardView({
  zoneId,
  zoneTitle,
  bar,
  sector,
  onPress,
}: ZoneBySegmentCardViewProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/(tabs)/warehouse/zones/${zoneId}` as any);
    }
  };

  return (
    <ThemedVStack className="gap-2">
      <ThemedPressable
        onPress={handlePress}
        className="p-4 rounded-lg border border-outline-50 bg-background-0"
      >
        <ThemedBox className="gap-2">
          <ThemedHStack className="items-center justify-between">
            <ThemedText type="title" className="text-lg flex-1 text-center">
              Зона {zoneTitle}
            </ThemedText>
          </ThemedHStack>
          <ThemedBox className="gap-1">
            <ThemedHStack className="items-center justify-start gap-2">
              <ThemedText type="default" className="text-sm">
                Штрих-код:
              </ThemedText>
              <ThemedText type="default" className="text-sm">
                {bar}
              </ThemedText>
            </ThemedHStack>
            <ThemedHStack className="items-center justify-start gap-2">
              <ThemedText type="default" className="text-sm">
                Сектор:
              </ThemedText>
              <ThemedText type="default" className="text-sm">
                {sector}
              </ThemedText>
            </ThemedHStack>
          </ThemedBox>
        </ThemedBox>
      </ThemedPressable>
      {zoneTitle && (
        <ThemedBox className="pl-2">
          <ArtsByZoneFetcher
            zone={zoneTitle.trim()}
            ContainerComponent={ArtsByZoneContainer}
            SkeletonComponent={ArtsByZoneContainerSkeleton}
          />
        </ThemedBox>
      )}
    </ThemedVStack>
  );
}

