import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface EditTriggerProps {
  onClick?: () => void;
}

export function EditTrigger({ onClick }: EditTriggerProps) {
  return (
    <Button variant="edit-soft" size="icon-sm" onClick={onClick}>
      <Edit className="h-4 w-4" />
      <span className="sr-only">Редагувати</span>
    </Button>
  );
}
