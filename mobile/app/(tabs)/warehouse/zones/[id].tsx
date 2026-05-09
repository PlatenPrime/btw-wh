import { PageLayout } from "@/components/layout/page-layout";
import { WarehouseAdminGuard } from "@/components/guards/warehouse-admin-guard";
import { ThemedText } from "@/components/themed/themed-text";
import { useZoneByIdQuery } from "@/modules/zones/api/hooks/queries/useZoneByIdQuery";
import {
  ZoneContainer,
  ZoneContainerSkeleton,
} from "@/modules/zones/components/containers/zone-container";
import { ZoneFetcher } from "@/modules/zones/components/fetchers/zone-fetcher/ZoneFetcher";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function ZoneDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useZoneByIdQuery(id);

  return (
    <WarehouseAdminGuard>
      {!id ? (
        <PageLayout title="Зона не знайдена" useHeroGradient>
          <View className="flex-1 items-center justify-center">
            <ThemedText type="default">ID зони не знайдено</ThemedText>
          </View>
        </PageLayout>
      ) : isLoading ? (
        <PageLayout title="Завантаження..." useHeroGradient>
          <View className="flex-1 items-center justify-center">
            <ThemedText type="default">Завантаження...</ThemedText>
          </View>
        </PageLayout>
      ) : !data?.data ? (
        <PageLayout title="Зона не знайдена" useHeroGradient>
          <View className="flex-1 items-center justify-center">
            <ThemedText type="default">Зону не знайдено</ThemedText>
          </View>
        </PageLayout>
      ) : (
        <PageLayout title={`Зона: ${data.data.title}`} useHeroGradient>
          <ZoneFetcher
            id={id}
            ContainerComponent={ZoneContainer}
            SkeletonComponent={ZoneContainerSkeleton}
          />
        </PageLayout>
      )}
    </WarehouseAdminGuard>
  );
}
