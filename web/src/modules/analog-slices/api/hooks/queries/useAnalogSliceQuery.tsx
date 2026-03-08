import { getAnalogSlice } from "@/modules/analog-slices/api/services/queries/getAnalogSlice";
import { useQuery } from "@tanstack/react-query";

export interface UseAnalogSliceQueryParams {
  konkName: string;
  date: string;
}

export function useAnalogSliceQuery({ konkName, date }: UseAnalogSliceQueryParams) {
  return useQuery({
    queryKey: ["analog-slices", konkName, date],
    queryFn: ({ signal }) => getAnalogSlice(konkName, date, signal),
    enabled: Boolean(konkName && date),
    staleTime: 2 * 60 * 1000,
  });
}
