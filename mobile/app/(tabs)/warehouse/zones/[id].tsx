import { useLocalSearchParams } from "expo-router";
import { PageLayout } from "@/components/layout/page-layout";
import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { useZoneByIdQuery } from "@/modules/zones/api/hooks/queries/useZoneByIdQuery";
import { ZoneFetcher } from "@/modules/zones/components/fetchers/zone-fetcher/ZoneFetcher";
import {
  ZoneContainer,
  ZoneContainerSkeleton,
} from "@/modules/zones/components/containers/zone-container";

export default function ZoneDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useZoneByIdQuery(id);

  if (!id) {
    return (
      <PageLayout title="Зона не знайдена">
        <View className="flex-1 justify-center items-center">
          <ThemedText type="default">ID зони не знайдено</ThemedText>
        </View>
      </PageLayout>
    );
  }

  if (isLoading) {
    return (
      <PageLayout title="Завантаження...">
        <View className="flex-1 justify-center items-center">
          <ThemedText type="default">Завантаження...</ThemedText>
        </View>
      </PageLayout>
    );
  }

  if (!data?.data) {
    return (
      <PageLayout title="Зона не знайдена">
        <View className="flex-1 justify-center items-center">
          <ThemedText type="default">Зону не знайдено</ThemedText>
        </View>
      </PageLayout>
    );
  }

  const zone = data.data;

  return (
    <PageLayout title={`Зона: ${zone.title}`}>
      <ZoneFetcher
        id={id}
        ContainerComponent={ZoneContainer}
        SkeletonComponent={ZoneContainerSkeleton}
      />
    </PageLayout>
  );
}

