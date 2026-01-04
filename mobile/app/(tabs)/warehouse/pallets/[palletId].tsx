import { useLocalSearchParams } from "expo-router";
import { PageLayout } from "@/components/layout/page-layout";
import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { usePalletByIdQuery } from "@/modules/pallets/api/hooks/queries/usePalletByIdQuery";
import { PalletContainer } from "@/modules/pallets/components/containers/pallet-container";

export default function PalletDetailScreen() {
  const { palletId } = useLocalSearchParams<{ palletId: string }>();
  const { data, isLoading, refetch } = usePalletByIdQuery(palletId);

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
      <PageLayout title="Паллета не знайдено">
        <View className="flex-1 justify-center items-center">
          <ThemedText type="default">Паллета не знайдено</ThemedText>
        </View>
      </PageLayout>
    );
  }

  const pallet = data.data;

  const handlePosCreated = () => {
    refetch();
  };

  return (
    <PageLayout title={`Палета: ${pallet.title}`}>
      <PalletContainer pallet={pallet} onPosCreated={handlePosCreated} />
    </PageLayout>
  );
}
