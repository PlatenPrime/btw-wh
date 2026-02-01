import { ThemedText } from "@/components/themed/themed-text";
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
      <PageLayout title="Запит" useHeroGradient>
        <ThemedText type="default" className="text-center p-4">
          ID запиту не знайдено
        </ThemedText>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Запит" useHeroGradient>
      <AskFetcher
        id={id}
        ContainerComponent={AskContainer}
        SkeletonComponent={AskContainerSkeleton}
      />
    </PageLayout>
  );
}

