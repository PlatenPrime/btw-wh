import { Button } from "@/components/ui/button";
import { SquareCheckBig } from "lucide-react";

interface CheckTriggerProps {
  onClick?: () => void;
}

export function CheckTrigger({ onClick }: CheckTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="hover:bg-emerald-500/10 text-emerald-500 hover:text-emerald-400 h-8 w-8 p-0"
      onClick={onClick}
    >
      <SquareCheckBig className="h-4 w-4" />
    </Button>
  );
}
