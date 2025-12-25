import { ThemedText } from "@/components/themed-text";
import { PageLayout } from "@/components/layout/page-layout";
import { useLocalSearchParams } from "expo-router";
import {
  AskContainer,
  AskContainerSkeleton,
} from "@/modules/asks/components/containers/ask-container";
import { AskFetcher } from "@/modules/asks/components/fetchers/ask-fetcher/AskFetcher";

export default function AskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) {
    return (
      <PageLayout title="Запит">
        <ThemedText type="default" className="text-center p-4">
          ID запиту не знайдено
        </ThemedText>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Запит">
      <AskFetcher
        id={id}
        ContainerComponent={AskContainer}
        SkeletonComponent={AskContainerSkeleton}
      />
    </PageLayout>
  );
}

