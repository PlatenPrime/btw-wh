import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { ConstantCardSkeleton } from "@/modules/constants/components/cards/constant-card";

const SKELETON_ITEMS_COUNT = 8;

export function ConstantsGridSkeleton() {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2">
      {Array.from({ length: SKELETON_ITEMS_COUNT }).map((_, index) => (
        <ConstantCardSkeleton key={index} />
      ))}
    </Wrapper>
  );
}
