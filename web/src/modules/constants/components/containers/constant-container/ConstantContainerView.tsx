import type { ConstantDto } from "@/modules/constants/api/types";
import { ConstantDetailsCard } from "@/modules/constants/components/cards/constant-details-card";

interface ConstantContainerViewProps {
  constant: ConstantDto;
  canEdit: boolean;
}

export function ConstantContainerView({
  constant,
  canEdit,
}: ConstantContainerViewProps) {
  return (
    <div className="grid gap-2">
      <ConstantDetailsCard constant={constant} canEdit={canEdit} />
    </div>
  );
}

