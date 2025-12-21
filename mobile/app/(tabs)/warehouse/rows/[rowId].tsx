import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useRegisterHeaderActions } from "@/components/layout/header";
import { useRowByIdQuery } from "@/modules/rows/api/hooks/queries/useRowByIdQuery";
import { PalletsByRowFetcher } from "@/modules/pallets/components/fetchers/pallets-by-row-fetcher/PalletsByRowFetcher";
import { CreatePalletDialog } from "@/modules/pallets/components/dialogs/create-pallet-dialog/CreatePalletDialog";
import type { RowDto } from "@/modules/rows/api/types/dto";

interface RowDetailContentProps {
  row: RowDto;
  rowId: string;
}

function RowDetailContent({ row, rowId }: RowDetailContentProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useRegisterHeaderActions([
    {
      id: "create-pallet",
      label: "Створити палету",
      icon: "add",
      iconColor: "emerald",
      variant: "default",
      onClick: () => setCreateDialogOpen(true),
    },
  ]);

  const handleCreateSuccess = () => {
    setCreateDialogOpen(false);
  };

  return (
    <View className="flex-1 p-4">
      <View className="mb-4">
        <ThemedText type="title" className="mb-2">
          {row.title}
        </ThemedText>
        <ThemedText type="default">
          Паллет: {row.pallets.length}
        </ThemedText>
      </View>
      <PalletsByRowFetcher rowId={rowId} />
      <CreatePalletDialog
        row={row}
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={handleCreateSuccess}
      />
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
    <PageLayout title={row.title}>
      <RowDetailContent row={row} rowId={rowId} />
    </PageLayout>
  );
}

