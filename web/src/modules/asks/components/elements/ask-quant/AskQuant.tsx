import { CircleIcon } from "lucide-react";

interface AskQuantProps {
  quant: number | undefined;
}

export function AskQuant({ quant }: AskQuantProps) {
  if (!quant) return null;
  return (
    <div className="flex items-center gap-2">
      <CircleIcon className="h-4 w-4" />
      <span className="text-foreground text-sm">{quant}</span>
    </div>
  );
}
