import { PageLayout } from "@/components/layout/page-layout";
import { DefControls } from "@/modules/defs/components/controls/def-controls/DefControls";
import { DefsContent } from "@/modules/defs/components/fetchers/defs-content/DefsContent";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

export default function DefsScreen() {
  const [, setIsCalculationRunning] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [onRefresh, setOnRefresh] = useState<(() => Promise<void>) | undefined>(
    undefined
  );

  const handleStatusChange = (isRunning: boolean) => {
    setIsCalculationRunning(isRunning);
  };

  const handleRefreshingChange = useCallback(
    (newRefreshing: boolean, newOnRefresh: () => Promise<void>) => {
      setRefreshing(newRefreshing);
      setOnRefresh(() => newOnRefresh);
    },
    []
  );

  const handleRefresh = useCallback(async () => {
    if (onRefresh) {
      await onRefresh();
    }
  }, [onRefresh]);

  return (
    <PageLayout title="Дефіцити">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-2 p-2"
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          ) : undefined
        }
      >
        <DefControls />

        <DefsContent
          onStatusChange={handleStatusChange}
          onRefreshingChange={handleRefreshingChange}
        />
      </ScrollView>
    </PageLayout>
  );
}
