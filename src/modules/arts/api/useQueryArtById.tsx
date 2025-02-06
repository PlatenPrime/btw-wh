import axios from "@/lib/axios";
import { IArt } from "@/modules/arts/types/IArt";
import { useQuery } from "@tanstack/react-query";

async function fetchArt(id: string): Promise<IArt | null> {
  try {
    if (!id) return null;
    const response = await axios.get<IArt>(`/arts/${id}`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching art:", error);
    return null;
  }
}

export function useQueryArtById(id: string) {
  return useQuery<IArt | null>({
    queryKey: ["art", id],
    queryFn: () => fetchArt(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
