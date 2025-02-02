import { useQueryArtById } from "@/modules/arts/api/useQueryArtById";
import ArtImage from "../ArtImage/ArtImage";

interface ArtWidgetProps {
  id: string | undefined;
}

export function ArtWidget({ id }: ArtWidgetProps) {
  const { data: art, isLoading } = useQueryArtById(id!);

  if (isLoading) return <p>Загрузка...</p>;
  if (!art) return <p>Данных нет</p>;

  return (
    <div>
      {art?.nameukr || "Нет данных"}
      <ArtImage artikul={ ""} />
    </div>
  );
}
