import { ChevronsLeftRightEllipsis } from "lucide-react";

interface ArtLimitProps {
  limit: number | undefined;
}

export function ArtLimit({ limit }: ArtLimitProps) {
  if (!limit) return null;
  return (
    <div className="flex items-center gap-1 text-xs">
      <ChevronsLeftRightEllipsis size={12} className="text-rose-500" />
      <span className="">{limit}</span>

    </div>
  );
}
