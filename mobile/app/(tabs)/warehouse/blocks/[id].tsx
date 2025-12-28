import { PageLayout } from "@/components/layout/page-layout";
import { BlockFetcher } from "@/modules/blocks/components/fetchers/block-fetcher";
import { useLocalSearchParams } from "expo-router";

export default function BlockScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) {
    return (
      <PageLayout title="Блок не знайдено">
        <></>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Блок">
      <BlockFetcher blockId={id} />
    </PageLayout>
  );
}

