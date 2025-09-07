import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridView } from "./ArtsGridView";

interface GridProps {
  arts: ArtDto[] | undefined;

  isFetchingNextPage?: boolean;
}




export function ArtsGrid({ arts,   }: GridProps) {

 
  return (
    <ArtsGridView arts={arts}   />
  );
}
