import type { ConstantDto } from "@/modules/constants/api/types";
import { ConstantDetailsCard } from "@/modules/constants/components/cards/constant-details-card";

interface ConstantContainerViewProps {
  constant: ConstantDto;
}

export function ConstantContainerView({
  constant,
}: ConstantContainerViewProps) {
  return (
    <div className="grid gap-2">
      <ConstantDetailsCard constant={constant} />
    </div>
  );
}
