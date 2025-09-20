import { ChevronsLeftRightEllipsis } from "lucide-react";

interface ArtLimitProps {
  limit: number | undefined;
}

export function ArtLimit({ limit }: ArtLimitProps) {
  if (!limit) return null;
  return (
    <div className="flex items-center gap-1">
      <ChevronsLeftRightEllipsis size={12} className="" />
      {limit}
    </div>
  );
}
