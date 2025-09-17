import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridView } from "@/modules/arts/components/lists/arts-grid/ArtsGridView.tsx";

interface GridProps {
  arts: ArtDto[] | undefined;
  isFetchingNextPage?: boolean;
}




export function ArtsGrid({ arts,   }: GridProps) {

 
  return (
    <ArtsGridView arts={arts}   />
  );
}
