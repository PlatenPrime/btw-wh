import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";

interface CancelTriggerProps {
  onClick?: () => void;
}

export function CancelTrigger({ onClick }: CancelTriggerProps) {
  return (
    <Button variant="outline" size="icon-sm" onClick={onClick}>
      <Ban className="h-4 w-4" />
      <span className="sr-only">Скасувати</span>
    </Button>
  );
}
