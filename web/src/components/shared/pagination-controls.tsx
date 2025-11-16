import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isPending?: boolean;
};

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  isPending = false,
}: Props) {
  if (isPending) {
    return <Skeleton className="h-12" />;
  }

  return (
    <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-center">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        variant="outline"
      >
        ← Назад
      </Button>

      {totalPages <= 1 ? (
        <span className="text-muted-foreground text-sm">0</span>
      ) : (
        <span className="text-muted-foreground flex items-center text-sm text-nowrap">
          {currentPage} / {totalPages}
        </span>
      )}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        variant="outline"
      >
        Далі →
      </Button>
    </div>
  );
}
