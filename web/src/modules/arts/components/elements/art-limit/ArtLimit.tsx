import { ChevronsLeftRightEllipsis } from "lucide-react";

interface ArtLimitProps {
  limit: number | undefined;
}

export function ArtLimit({ limit }: ArtLimitProps) {
  if (!limit) return null;
  return (
    <div className="text-foreground flex items-center gap-2 text-xs">
      <ChevronsLeftRightEllipsis className="h-4 w-4 text-rose-500" />
      <span>{limit}</span>
    </div>
  );
}
