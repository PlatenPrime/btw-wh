import { IconWell } from "@/components/shared/elements";
import { CircleIcon } from "lucide-react";

interface AskQuantProps {
  quant: number | undefined;
}

export function AskQuant({ quant }: AskQuantProps) {
  if (!quant) return null;
  return (
    <div className="text-foreground flex items-center gap-2 text-sm">
      <IconWell icon={CircleIcon} tone="info" size="sm" />
      <span>{quant}</span>
    </div>
  );
}
