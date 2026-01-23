import { CircleIcon } from "lucide-react";

interface AskQuantProps {
  quant: number | undefined;
}

export function AskQuant({ quant }: AskQuantProps) {
  if (!quant) return null;
  return (
    <div className="text-foreground flex items-center gap-2 text-sm">
      <CircleIcon className="h-4 w-4" />
      <span>{quant}</span>
    </div>
  );
}
