import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridView } from "./view";

interface GridProps {
  arts: ArtDto[] | undefined;
  isPending?: boolean;
  isFetching?: boolean;
}

export function ArtsGrid({ arts, isPending, isFetching }: GridProps) {
  return (
    <ArtsGridView arts={arts} isFetching={isFetching} isPending={isPending} />
  );
}
