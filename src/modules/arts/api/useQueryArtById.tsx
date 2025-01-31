import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

async function fetchArt(id: string) {
  if (!id) return;
  const response = await axios.get(`/arts/${id}`);
  console.log("response", response);
  return response.data;
}

export function useQueryArtById(id: string) {
  const { data: art } = useQuery({
    queryKey: ["art", id],
    queryFn: () => fetchArt(id),
    enabled: !!id,
  });
  return { art };
}
