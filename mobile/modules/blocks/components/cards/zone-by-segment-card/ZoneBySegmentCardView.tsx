import { ThemedText } from "@/components/themed-text";
import { Box, HStack, Pressable, VStack } from "@/components/ui";
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
    <VStack className="gap-2">
      <Pressable
        onPress={handlePress}
        className="p-4 rounded-lg border border-outline-100 bg-background-0"
      >
        <Box className="gap-2">
          <HStack className="items-center justify-between">
            <ThemedText type="title" className="text-lg flex-1 text-center">
              Зона {zoneTitle}
            </ThemedText>
          </HStack>
          <Box className="gap-1">
            <HStack className="items-center justify-start gap-2">
              <ThemedText type="default" className="text-sm">
                Штрих-код:
              </ThemedText>
              <ThemedText type="default" className="text-sm">
                {bar}
              </ThemedText>
            </HStack>
            <HStack className="items-center justify-start gap-2">
              <ThemedText type="default" className="text-sm">
                Сектор:
              </ThemedText>
              <ThemedText type="default" className="text-sm">
                {sector}
              </ThemedText>
            </HStack>
          </Box>
        </Box>
      </Pressable>
      {zoneTitle && (
        <Box className="pl-2">
          <ArtsByZoneFetcher
            zone={zoneTitle.trim()}
            ContainerComponent={ArtsByZoneContainer}
            SkeletonComponent={ArtsByZoneContainerSkeleton}
          />
        </Box>
      )}
    </VStack>
  );
}

