import axios from "@/lib/axios";
import { IArt } from "@/modules/arts/types/IArt";
import { useQuery } from "@tanstack/react-query";



interface FetchArtsParams {
    page?: number;
    limit?: number;
    search?: string;
  }
  
  async function fetchArts({ page = 1, limit = 10, search = "" }: FetchArtsParams): Promise<IArt[] | null> {
    try {
      const response = await axios.get<IArt[]>(`/arts`, {
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching arts:", error);
      return null;
    }
  }
  
  export function useQueryArts({ page = 1, limit = 10, search = "" }: FetchArtsParams) {
    return useQuery<IArt[] | null>({
      queryKey: ["arts", page, limit, search],
      queryFn: () => fetchArts({ page, limit, search }),
      staleTime: 5 * 60 * 1000,

    });
  }
  