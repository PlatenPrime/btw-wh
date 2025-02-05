import axios from "@/lib/axios";
import { IArt } from "@/modules/arts/types/IArt";
import { useQuery } from "@tanstack/react-query";

async function fetchArt(id: string): Promise<IArt | undefined> {
  if (!id) return;
  const response = await axios.get<IArt>(`/arts/${id}`);
  console.log("response", response);
  return response.data;
}

export function useQueryArtById(id: string) {
  return useQuery<IArt | undefined>({
    queryKey: ["art", id],
    queryFn: () => fetchArt(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
