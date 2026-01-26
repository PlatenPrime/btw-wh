import { useLocalSearchParams } from "expo-router";
import { PageLayout } from "@/components/layout/page-layout";
import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { useRowByIdQuery } from "@/modules/rows/api/hooks/queries/useRowByIdQuery";
import { RowDetailHeaderActions } from "@/modules/rows/components/actions/row-detail-header-actions";
import { PalletsByRowFetcher } from "@/modules/pallets/components/fetchers/pallets-by-row-fetcher/PalletsByRowFetcher";
import type { RowDto } from "@/modules/rows/api/types/dto";

interface RowDetailContentProps {
  row: RowDto;
  rowId: string;
}

function RowDetailContent({ row, rowId }: RowDetailContentProps) {
  return (
    <View className="flex-1 p-4">
      <RowDetailHeaderActions row={row} />
      <PalletsByRowFetcher rowId={rowId} />
    </View>
  );
}

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
    <PageLayout title={`Ряд:  ${row.title}`}>
      <RowDetailContent row={row} rowId={rowId} />
    </PageLayout>
  );
}

