import type { KonkDto } from "@/modules/konks/api/types";
import { KonkDetailsCardView } from "./KonkDetailsCardView";

interface KonkDetailsCardProps {
  konk: KonkDto;
}

export function KonkDetailsCard({ konk }: KonkDetailsCardProps) {
  return <KonkDetailsCardView konk={konk} />;
}
