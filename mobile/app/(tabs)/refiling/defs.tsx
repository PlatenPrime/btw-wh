import { PageLayout } from "@/components/layout/page-layout";
import { DefsContent } from "@/modules/defs/components/fetchers/defs-content/DefsContent";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

export default function DefsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [onRefresh, setOnRefresh] = useState<(() => Promise<void>) | undefined>(
    undefined,
  );

  const handleRefreshingChange = useCallback(
    (newRefreshing: boolean, newOnRefresh: () => Promise<void>) => {
      setRefreshing(newRefreshing);
      setOnRefresh(() => newOnRefresh);
    },
    [],
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
        <DefsContent onRefreshingChange={handleRefreshingChange} />
      </ScrollView>
    </PageLayout>
  );
}
