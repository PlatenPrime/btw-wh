import type { ConstantDto } from "@/modules/constants/api/types";
import { ConstantDetailsCardView } from "./ConstantDetailsCardView";

interface ConstantDetailsCardProps {
  constant: ConstantDto;
}

export function ConstantDetailsCard({ constant }: ConstantDetailsCardProps) {
  return <ConstantDetailsCardView constant={constant} />;
}
