import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useArtsByZoneQuery } from "@/modules/arts/api/hooks/queries/useArtsByZoneQuery";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import type { ComponentType } from "react";

interface ArtsByZoneFetcherProps {
  zone?: string;
  ContainerComponent: ComponentType<{ data: ArtDto[]; total: number }>;
  SkeletonComponent: ComponentType;
}

export function ArtsByZoneFetcher({
  zone,
  ContainerComponent,
  SkeletonComponent,
}: ArtsByZoneFetcherProps) {
  const artsQuery = useArtsByZoneQuery(zone);

  if (artsQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (artsQuery.error) {
    return (
      <View className="justify-center items-center p-4">
        <ThemedText type="defaultSemiBold" className="text-center mb-2">
          Помилка завантаження артикулів
        </ThemedText>
        <ThemedText type="default" className="text-center">
          {artsQuery.error instanceof Error
            ? artsQuery.error.message
            : "Не вдалося завантажити артикули зони"}
        </ThemedText>
      </View>
    );
  }

  if (!artsQuery.data || !artsQuery.data.data || artsQuery.data.data.length === 0) {
    return (
      <View className="justify-center items-center p-4">
        <ThemedText type="default" className="text-center">
          Ця зона не має артикулів
        </ThemedText>
      </View>
    );
  }

  return <ContainerComponent data={artsQuery.data.data} total={artsQuery.data.total} />;
}

