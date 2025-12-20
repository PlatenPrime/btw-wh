import { useLocalSearchParams } from "expo-router";
import { PageLayout } from "@/components/layout/page-layout";
import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useRowByIdQuery } from "@/modules/rows/api/hooks/queries/useRowByIdQuery";
import { PalletsByRowFetcher } from "@/modules/pallets/components/fetchers/pallets-by-row-fetcher/PalletsByRowFetcher";

export default function RowDetailScreen() {
  const { rowId } = useLocalSearchParams<{ rowId: string }>();
  const { data, isLoading } = useRowByIdQuery(rowId);

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
      <PageLayout title="Ряд не знайдено">
        <View className="flex-1 justify-center items-center">
          <ThemedText type="default">Ряд не знайдено</ThemedText>
        </View>
      </PageLayout>
    );
  }

  const row = data.data;

  return (
    <PageLayout title={row.title}>
      <View className="flex-1 p-4">
        <View className="mb-4">
          <ThemedText type="title" className="mb-2">
            {row.title}
          </ThemedText>
          <ThemedText type="default">
            Паллет: {row.pallets.length}
          </ThemedText>
        </View>
        {rowId && <PalletsByRowFetcher rowId={rowId} />}
      </View>
    </PageLayout>
  );
}

