import { useQueryArtById } from "@/modules/arts/api/useQueryArtById";
import { ArtCard } from "@/modules/arts/components/card";
import { ArtInfo } from "@/modules/arts/components/info";
import { IArtInfo } from "@/modules/arts/types/IArtInfo";
import { useParams } from "react-router";

export function ArtWidget() {
  const { artId } = useParams();

  const { data: art, isLoading } = useQueryArtById(artId!);

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
