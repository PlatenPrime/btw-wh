import { useQuery } from "@tanstack/react-query";
import { getPosById } from "../services/getPosById";

export function usePosByIdQuery(id: string) {
  return useQuery({
    queryKey: ["poses", id],
    queryFn: ({ signal }) => getPosById(id, signal),
    enabled: !!id,
  });
} 