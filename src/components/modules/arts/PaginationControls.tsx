// components/ui/PaginationControls.tsx
import { Button } from "@/components/ui/button"
import { useSearchParams } from "react-router"

interface PaginationControlsProps {
  page: number 
  totalPages: number
}

export function PaginationControls({ page, totalPages }: PaginationControlsProps) {
  const [params, setParams] = useSearchParams()
  const currentSearch = params.get("search") || ""

  const goToPage = (newPage: number) => {
    params.set("page", String(newPage))
    if (currentSearch) {
      params.set("search", currentSearch)
    }
    setParams(params)
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
      >
        ← Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
      >
        Next →
      </Button>
      
    </div>
  )
}
