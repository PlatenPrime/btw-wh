import { useQueryArtById } from "@/modules/arts/api/useQueryArtById";

interface ArtWidgetProps {
  id: string | undefined;
}

export function ArtWidget({ id }: ArtWidgetProps) {
  const { art } = useQueryArtById(id!);

  return <div>{art?.nameukr || "Нет данных"}</div>;
}
