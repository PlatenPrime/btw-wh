import { Button } from "@/components/ui/button"
import { Skeleton } from "./ui/skeleton"

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isPending?: boolean
}

export function PaginationControls({ currentPage, totalPages, onPageChange, isPending = false }: Props) {


 if (isPending) {
    return <Skeleton className="h-12" />;
  }

  return (
    <div className="flex justify-between md:justify-center items-center gap-4 w-full md:w-auto">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        variant="outline"
      >
        ← Назад
      </Button>

      <span className="text-sm">
        Сторінка {currentPage} із {totalPages}
      </span>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        variant="outline"
      >
        Далі →
      </Button>
    </div>
  )
}
