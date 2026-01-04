import { ThemedText } from "@/components/themed/themed-text";
import { VStack, HStack } from "@/components/ui";
import type { GetAsksPullsResponse } from "@/modules/asks/api/types/dto";
import { PullsPositionCard } from "@/modules/asks/components/cards/pulls-position-card/PullsPositionCard";
import { ScrollView, RefreshControl, ActivityIndicator } from "react-native";

interface PullsContainerViewProps {
  data: GetAsksPullsResponse["data"];
  isFetching: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function PullsContainerView({
  data,
  isFetching,
  refreshing = false,
  onRefresh,
}: PullsContainerViewProps) {
  // Преобразуем все позиции из всех секторов в плоский список
  const allPositions = data.positionsBySector.flatMap(
    (sectorGroup) => sectorGroup.positions,
  );

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="gap-4 p-4"
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    >
      <VStack className="gap-2">
        <HStack className="items-center gap-2">
          <ThemedText type="defaultSemiBold" className="text-lg text-center w-full">
            Позиції для зняття
          </ThemedText>
          {isFetching && <ActivityIndicator size="small" />}
        </HStack>
      </VStack>

      {allPositions.length === 0 ? (
        <ThemedText type="default" className="text-center py-8 opacity-70">
          Немає позицій для зняття
        </ThemedText>
      ) : (
        <VStack
          className="gap-4"
          style={{ opacity: isFetching ? 0.6 : 1 }}
        >
          {allPositions.map((position) => (
            <PullsPositionCard
              key={`${position._id}-${position.askId}`}
              position={position}
            />
          ))}
        </VStack>
      )}
    </ScrollView>
  );
}

