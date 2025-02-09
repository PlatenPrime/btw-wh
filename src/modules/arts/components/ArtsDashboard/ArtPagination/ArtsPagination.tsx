import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ArtsPaginationProps {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export function ArtsPagination({
  page,
  totalPages,
  handlePageChange,
}: ArtsPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            isActive={page === 1}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {Array.from(
          { length: Math.min(3, totalPages - 2) },
          (_, i) => page - 1 + i
        )
          .filter((p) => p > 1 && p < totalPages)
          .map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={page === p}
                onClick={() => handlePageChange(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

        {page < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            isActive={page === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(page + 1)}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
