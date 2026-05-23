import { Button } from "@/components/ui/button";
import { SquareCheckBig } from "lucide-react";

interface CheckTriggerProps {
  onClick?: () => void;
}

export function CheckTrigger({ onClick }: CheckTriggerProps) {
  return (
    <Button variant="success-soft" size="icon-sm" onClick={onClick}>
      <SquareCheckBig className="h-4 w-4" />
      <span className="sr-only">Підтвердити</span>
    </Button>
  );
}
