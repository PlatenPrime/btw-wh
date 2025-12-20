import { PageLayout } from '@/components/layout/page-layout';
import { useLocalSearchParams } from 'expo-router';
import { ArtFetcher } from '@/modules/arts/components/fetchers/art-fetcher/ArtFetcher';

export default function ArtScreen() {
  const { artikul } = useLocalSearchParams<{ artikul: string }>();

  return (
    <PageLayout title={`Артикул: ${artikul || "невідомий"}`}>
      <ArtFetcher artikul={artikul || ""} />
    </PageLayout>
  );
}
