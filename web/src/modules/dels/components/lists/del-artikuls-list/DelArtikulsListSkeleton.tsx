import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { DelArtikulCardSkeleton } from "@/modules/dels/components/cards/del-artikul-card";

const SKELETON_ITEMS_COUNT = 4;

export function DelArtikulsListSkeleton() {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2">
      {Array.from({ length: SKELETON_ITEMS_COUNT }).map((_, index) => (
        <DelArtikulCardSkeleton key={index} />
      ))}
    </Wrapper>
  );
}
