import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Art } from "@/modules/arts/types/Art";

async function fetchArt(id: string): Promise<Art | undefined> {
  if (!id) return;
  const response = await axios.get<Art>(`/arts/${id}`);
  console.log("response", response);
  return response.data;
}

export function useQueryArtById(id: string) {
  return useQuery<Art | undefined>({
    queryKey: ["art", id],
    queryFn: () => fetchArt(id),
    enabled: !!id,
    staleTime: 10*60*1000,
  });
}
