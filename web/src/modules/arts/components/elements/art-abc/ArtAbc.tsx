import { BarChart3 } from "lucide-react";

interface ArtAbcProps {
  abc: string | undefined;
}

export function ArtAbc({ abc }: ArtAbcProps) {
  if (!abc) return null;
  return (
    <div className="text-foreground flex items-center gap-2 text-xs">
      <BarChart3 className="h-4 w-4 text-blue-500" />
      <span>ABC: {abc}</span>
    </div>
  );
}
