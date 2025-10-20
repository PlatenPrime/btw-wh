import { getPosesByArtikul } from "@/modules/poses/api/services/queries/getPosesByArtikul";
import { useQuery } from "@tanstack/react-query";

export function usePosesByArtikulQuery(artikul: string) {
  return useQuery({
    queryKey: ["poses", { by: "artikul", artikul }],
    queryFn: ({ signal }) => getPosesByArtikul(artikul, signal),
    enabled: !!artikul,
  });
}
