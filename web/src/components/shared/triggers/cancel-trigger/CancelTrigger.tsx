import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";

interface CancelTriggerProps {
  onClick?: () => void;
}

export function CancelTrigger({ onClick }: CancelTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0"
      onClick={onClick}
    >
      <Ban className="h-4 w-4" />
    </Button>
  );
}
