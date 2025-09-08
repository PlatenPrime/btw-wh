import { useQuery } from "@tanstack/react-query";
import { getPosById } from "@/modules/poses/api/services/queries/getPosById";

export function usePosByIdQuery(id: string) {
  return useQuery({
    queryKey: ["poses", id],
    queryFn: ({ signal }) => getPosById(id, signal),
    enabled: !!id,
  });
} 