import { getPosById } from "@/modules/poses/api/services/queries/getPosById";
import type { PosResponse } from "@/modules/poses/api/types";
import { useQuery } from "@tanstack/react-query";

export function usePosByIdQuery(id: string) {
  return useQuery<PosResponse>({
    queryKey: ["poses", { by: "id", id }],
    queryFn: ({ signal }) => getPosById(id, signal),
    enabled: !!id,
  });
}
