import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { ConstantDto } from "@/modules/constants/api/types";
import { ConstantCard } from "@/modules/constants/components/cards/constant-card";

interface ConstantsGridProps {
  constants: ConstantDto[];
}

export function ConstantsGrid({ constants }: ConstantsGridProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2">
      {constants.map((constant) => (
        <ConstantCard key={constant._id} constant={constant} />
      ))}
    </Wrapper>
  );
}
