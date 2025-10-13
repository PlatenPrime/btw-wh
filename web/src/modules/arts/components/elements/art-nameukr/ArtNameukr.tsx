import { cn } from "@/lib/utils";

interface ArtNameukrProps {
  nameukr: string;
  className?: string;
}

export function ArtNameukr({ nameukr, className }: ArtNameukrProps) {
  return (
    <span className={cn("text-foreground text-sm font-medium", className)}>
      {nameukr}
    </span>
  );
}
