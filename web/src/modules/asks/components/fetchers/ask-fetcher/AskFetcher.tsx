import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { useAskQuery } from "@/modules/asks/api/hooks/queries/useAskQuery";
import {
  AskContainer,
  AskContainerSkeleton,
} from "@/modules/asks/components/containers/ask-container";

interface AskFetcherProps {
  id: string;
}

export function AskFetcher({ id }: AskFetcherProps) {
  const { data: askData, isLoading, error } = useAskQuery({ id });

  if (isLoading) return <AskContainerSkeleton />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження запиту"
        description="Не вдалося завантажити запит"
      />
    );

  if (!askData)
    return <LoadingNoData description="Немає даних для відображення" />;

  return <AskContainer askData={askData.data} />;
}
