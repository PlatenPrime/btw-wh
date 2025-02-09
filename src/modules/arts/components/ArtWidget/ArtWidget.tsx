import { useQueryArtById } from "@/modules/arts/api/useQueryArtById";
import { ArtCard } from "@/modules/arts/components/ArtWidget/ArtCard/ArtCard";
import { ArtInfo } from "@/modules/arts/components/ArtWidget/ArtInfo/ArtInfo";
import { IArtInfo } from "@/modules/arts/types/IArtInfo";

interface ArtWidgetProps {
  id: string | undefined;
}

export function ArtWidget({ id }: ArtWidgetProps) {
  const { data: art, isLoading } = useQueryArtById(id!);

  if (isLoading) return <p>Загрузка...</p>;
  if (!art) return <p>Данных нет</p>;

  const artInfo: IArtInfo = {
    artikul: "1102-0260",
    price: "0.00",
    sklad: 0,
    pogrebi: 0,
    mereghi: 0,
  };

  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 gap-2">
      <ArtCard art={art} />
      <ArtInfo artInfo={artInfo} />
    </div>
  );
}
