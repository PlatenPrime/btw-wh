import { useOneArtQuery } from "@/modules/arts/api/hooks/useOneArtQuery";
import { ArtContainer } from "../../containers/art-container/ArtContainer";
import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { ArtContainerSkeleton } from "../../containers/art-container/ArtContainerSkeleton";

interface ArtFetcherProps {
    artikul: string;
}

export function ArtFetcher({ artikul }: ArtFetcherProps) {



    const { data: artData, isLoading, error } = useOneArtQuery(artikul);


    if (isLoading) return <ArtContainerSkeleton />;


    if (error)
      return (
        <ErrorDisplay
          error={error}
          title="Помилка завантаження артикулу"
          description="Не вдалося завантажити артикул"
        />
      );


    if (!artData) return <LoadingNoData description="Немає даних для відображення" />;


  return <ArtContainer artData={artData} />;
}
