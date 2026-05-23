import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteTriggerProps {
  onClick?: () => void;
}

export function DeleteTrigger({ onClick }: DeleteTriggerProps) {
  return (
    <Button variant="destructive" size="icon-sm" onClick={onClick}>
      <Trash className="h-4 w-4" />
      <span className="sr-only">Видалити</span>
    </Button>
  );
}
