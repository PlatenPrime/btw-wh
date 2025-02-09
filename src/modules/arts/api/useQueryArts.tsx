import axios from "@/lib/axios";
import { IArt } from "@/modules/arts/types/IArt";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface FetchArtsParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface FetchArtsResponse {
  data: IArt[];
  total: number;
  page: number;
  totalPages: number;
}

async function fetchArts({
  page = 1,
  limit = 10,
  search = "",
}: FetchArtsParams): Promise<FetchArtsResponse | null> {
  try {
    const response = await axios.get<FetchArtsResponse>(`/arts`, {
      params: { page, limit, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching arts:", error);
    return null;
  }
}

export function useQueryArts({
  page = 1,
  limit = 10,
  search = "",
}: FetchArtsParams) {
  return useQuery<FetchArtsResponse | null>({
    queryKey: ["arts", page, limit, search],
    queryFn: () => fetchArts({ page, limit, search }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
