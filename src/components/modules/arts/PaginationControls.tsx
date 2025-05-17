import { Button } from "@/components/ui/button"

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationControls({ currentPage, totalPages, onPageChange }: Props) {
  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        variant="outline"
      >
        ← Назад
      </Button>

      <span className="text-sm">
        Страница {currentPage} из {totalPages}
      </span>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        variant="outline"
      >
        Вперёд →
      </Button>
    </div>
  )
}
