import { Warehouse } from "lucide-react";
import { sklads, type ISklads } from "@/constants/sklad";

interface AskSkladProps {
  sklad?: "pogrebi" | "merezhi";
}

export function AskSklad({ sklad }: AskSkladProps) {
  if (!sklad) return null;
  return (
    <div className="text-foreground flex items-center gap-2 text-xs">
      <Warehouse className="h-4 w-4" />
      <span>{sklads[sklad as keyof ISklads] || sklad}</span>
    </div>
  );
}
