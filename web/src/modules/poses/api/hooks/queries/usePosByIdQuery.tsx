import { getPosById } from "@/modules/poses/api/services/queries/getPosById";
import { useQuery } from "@tanstack/react-query";

export function usePosByIdQuery(id: string) {
  return useQuery({
    queryKey: ["poses", { by: "id", id }],
    queryFn: ({ signal }) => getPosById(id, signal),
    enabled: !!id,
  });
}
