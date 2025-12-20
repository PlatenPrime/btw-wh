import { View } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useBtradeArtDataQuery } from "@/modules/arts/api/hooks/queries/useBtradeArtDataQuery";
import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import type { ComponentType } from "react";
import { BtradeArtDataContainer } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataContainer";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";

export interface BtradeArtDataContainerProps {
  artikul: string;
  exists: boolean;
  message: string;
  data: BtradeArtInfoDto | null;
  onRetry: () => void;
}

interface BtradeArtDataFetcherProps {
  artikul: string | undefined;
  ContainerComponent?: ComponentType<BtradeArtDataContainerProps>;
  SkeletonComponent?: ComponentType;
}

export function BtradeArtDataFetcher({
  artikul,
  ContainerComponent = BtradeArtDataContainer,
  SkeletonComponent = BtradeArtDataSkeleton,
}: BtradeArtDataFetcherProps) {
  if (!artikul) {
    return (
      <ThemedView className="p-3">
        <ThemedText type="default" className="text-xs opacity-70 text-center">
          Артикул не передан для завантаження даних
        </ThemedText>
      </ThemedView>
    );
  }

  const {
    data: btradeArtResponse,
    isLoading,
    error,
    refetch,
  } = useBtradeArtDataQuery(artikul);

  if (isLoading) return <SkeletonComponent />;

  if (error) {
    return (
      <ThemedView className="p-3">
        <ThemedText type="defaultSemiBold" className="text-center mb-1">
          Помилка завантаження даних з sharik.ua
        </ThemedText>
        <ThemedText type="default" className="text-center text-xs opacity-70">
          {error instanceof Error ? error.message : "Не вдалося завантажити дані з sharik.ua"}
        </ThemedText>
      </ThemedView>
    );
  }

  if (!btradeArtResponse) {
    return (
      <ThemedView className="p-3">
        <ThemedText type="default" className="text-xs opacity-70 text-center">
          Немає даних для відображення
        </ThemedText>
      </ThemedView>
    );
  }

  const containerProps: BtradeArtDataContainerProps = {
    artikul,
    exists: btradeArtResponse.exists,
    message: btradeArtResponse.message,
    data: btradeArtResponse.data,
    onRetry: () => {
      void refetch();
    },
  };

  return <ContainerComponent {...containerProps} />;
}

