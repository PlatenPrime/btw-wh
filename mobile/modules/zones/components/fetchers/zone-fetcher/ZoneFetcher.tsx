import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { useZoneByIdQuery } from "@/modules/zones/api/hooks/queries/useZoneByIdQuery";
import type { ZoneDto } from "@/modules/zones/api/types/dto";
import type { ComponentType } from "react";
import { ThemedButton, ThemedText as ThemedTextButton } from "@/components/themed";

interface ZoneFetcherProps {
  id: string;
  ContainerComponent: ComponentType<{
    zone: ZoneDto;
    refreshing?: boolean;
    onRefresh?: () => void;
  }>;
  SkeletonComponent: ComponentType;
}

export function ZoneFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: ZoneFetcherProps) {
  const zoneQuery = useZoneByIdQuery(id);
  const zoneResponse = zoneQuery.data;

  if (zoneQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (zoneQuery.error) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center mb-4">
          Помилка завантаження зони
        </ThemedText>
        <ThemedText type="default" className="text-center text-xs opacity-70 mb-4">
          Не вдалося завантажити зону
        </ThemedText>
        <ThemedButton onPress={() => zoneQuery.refetch()} variant="outline">
          <ThemedTextButton>Спробувати ще раз</ThemedTextButton>
        </ThemedButton>
      </ThemedView>
    );
  }

  if (!zoneResponse || !zoneResponse.data) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center mb-4">
          Зону не знайдено
        </ThemedText>
        <ThemedText type="default" className="text-center text-xs opacity-70 mb-4">
          Зону з таким ID не існує або була видалена
        </ThemedText>
        <ThemedButton onPress={() => zoneQuery.refetch()} variant="outline">
          <ThemedTextButton>Спробувати ще раз</ThemedTextButton>
        </ThemedButton>
      </ThemedView>
    );
  }

  return (
    <ContainerComponent
      zone={zoneResponse.data}
      refreshing={zoneQuery.isRefetching}
      onRefresh={() => void zoneQuery.refetch()}
    />
  );
}

