import { useQueryArtById } from "@/modules/arts/api/useQueryArtById";
import { ArtCard } from "../ArtCard/ArtCard";

interface ArtWidgetProps {
  id: string | undefined;
}

export function ArtWidget({ id }: ArtWidgetProps) {
  const { data: art, isLoading } = useQueryArtById(id!);

  if (isLoading) return <p>Загрузка...</p>;
  if (!art) return <p>Данных нет</p>;

  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 gap-2">
      <ArtCard art={art} />
    </div>
  );
}
