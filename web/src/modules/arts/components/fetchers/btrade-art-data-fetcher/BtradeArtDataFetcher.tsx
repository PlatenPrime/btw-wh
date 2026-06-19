import { ContentReveal } from "@/components/shared/motion";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useBtradeArtDataQuery } from "@/modules/arts/api/hooks/queries/useBtradeArtDataQuery";
import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import type { ComponentType, ReactNode } from "react";

export interface BtradeArtDataContainerProps {
  artikul: string;
  exists: boolean;
  message: string;
  data: BtradeArtInfoDto | null;
  onRetry: () => void;
}

interface BtradeArtDataFetcherChromeProps {
  children: ReactNode;
}

interface BtradeArtDataFetcherProps {
  artikul: string | undefined;
  ContainerComponent: ComponentType<BtradeArtDataContainerProps>;
  SkeletonComponent: ComponentType;
  ChromeComponent?: ComponentType<BtradeArtDataFetcherChromeProps>;
}

export function BtradeArtDataFetcher({
  artikul,
  ContainerComponent,
  SkeletonComponent,
  ChromeComponent,
}: BtradeArtDataFetcherProps) {
  const {
    data: btradeArtResponse,
    isLoading,
    error,
    refetch,
  } = useBtradeArtDataQuery(artikul);

  const wrapChrome = (content: ReactNode) =>
    ChromeComponent ? <ChromeComponent>{content}</ChromeComponent> : content;

  if (!artikul) {
    return wrapChrome(
      <LoadingNoData description="Артикул не передан для завантаження даних" />,
    );
  }

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return wrapChrome(
      <ErrorDisplay
        error={error}
        title="Помилка завантаження даних з sharik.ua"
        description="Не вдалося завантажити дані з sharik.ua"
      />,
    );

  if (!btradeArtResponse) {
    return wrapChrome(
      <LoadingNoData description="Немає даних для відображення" />,
    );
  }

  const containerProps: BtradeArtDataContainerProps = {
    artikul,
    exists: btradeArtResponse.exists,
    message: btradeArtResponse.message,
    data: btradeArtResponse.data,
    onRetry: () => {
      void refetch();
    },
  };

  return wrapChrome(
    <ContentReveal>
      <ContainerComponent {...containerProps} />
    </ContentReveal>,
  );
}
