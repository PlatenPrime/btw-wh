import { Button } from "@/components/ui/button";
import { NotepadText } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

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
    <div className="flex justify-between md:justify-center items-center gap-4 w-full md:w-auto">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        variant="outline"
      >
        ← Назад
      </Button>

      {totalPages <= 1 ? (
        <span className="text-sm text-muted-foreground">0</span>
      ) : (
        <span className="text-sm flex items-center text-muted-foreground text-nowrap ">
          <NotepadText />
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
