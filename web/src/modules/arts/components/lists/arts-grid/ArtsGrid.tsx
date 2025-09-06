import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridView } from "./ArtsGridView";
import { ArtsGridSkeleton } from "./ArtsGridSkeleton";

interface GridProps {
  arts: ArtDto[] | undefined;
  isPending?: boolean;
  isFetching?: boolean;
}




export function ArtsGrid({ arts, isPending, isFetching }: GridProps) {

  if (isPending) { return <ArtsGridSkeleton /> }
  return (
    <ArtsGridView arts={arts} isFetching={isFetching} isPending={isPending} />
  );
}
