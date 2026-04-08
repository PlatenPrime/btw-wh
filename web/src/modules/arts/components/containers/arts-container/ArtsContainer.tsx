import type { ArtsDto } from "@/modules/arts/api/types/dto";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsHeaderActions } from "@/modules/arts/components/actions/arts-header-actions";
import { ArtsContainerView } from "@/modules/arts/components/containers/arts-container/ArtsContainerView.tsx";

interface ArtsContainerProps {
  data: ArtsDto;
  arts: ArtDto[];
  isPending: boolean;
  page: number;
  limit: number;
  search: string;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSearchChange: (search: string) => void;
}

export function ArtsContainer({
  data,
  arts,
  isPending,
  page,
  limit,
  search,
  onPageChange,
  onLimitChange,
  onSearchChange,
}: ArtsContainerProps) {
  return (
    <>
      <ArtsHeaderActions />
      <ArtsContainerView
        data={data}
        arts={arts}
        isPending={isPending}
        page={page}
        limit={limit}
        search={search}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        onSearchChange={onSearchChange}
      />
    </>
  );
}
