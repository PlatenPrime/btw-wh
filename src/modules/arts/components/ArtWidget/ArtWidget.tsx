import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface ArtCardProps {
  id: string | undefined;
}

async function fetchArt(id: string) {
  if (!id) return
  const response = await axios.get(`/arts/${id}`);
  console.log("response", response);
  return response.data;
}

export function ArtWidget({ id }: ArtCardProps) {
  const { data:art } = useQuery({
    queryKey: ["art", id],
    queryFn: () => fetchArt(id!),
    enabled: !!id,
  });

  return <div>{art?.nameukr || "Нет данных"}</div>;
}
