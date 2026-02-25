import type { ConstantDto } from "@/modules/constants/api/types";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { ConstantDetailHeaderActions } from "@/modules/constants/components/actions/constant-detail-header-actions";
import { ConstantContainerView } from "@/modules/constants/components/containers/constant-container/ConstantContainerView";

interface ConstantContainerProps {
  constant: ConstantDto;
}

export function ConstantContainer({ constant }: ConstantContainerProps) {
  const { hasRole } = useAuth();
  const canEdit = hasRole(RoleType.ADMIN);

  return (
    <>
      <ConstantDetailHeaderActions constant={constant} />
      <ConstantContainerView constant={constant} canEdit={canEdit} />
    </>
  );
}
