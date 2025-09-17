import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface CheckTriggerProps {
  onClick?: () => void;
}

export function CheckTrigger({ onClick }: CheckTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="hover:bg-success/10 hover:text-success h-8 w-8 p-0"
      onClick={onClick}
    >
      <Check className="h-4 w-4" />
    </Button>
  );
}
