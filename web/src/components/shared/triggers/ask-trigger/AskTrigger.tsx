import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

interface AskTriggerProps {
  onClick?: () => void;
}

export default function AskTrigger({ onClick }: AskTriggerProps) {
  return (
    <Button variant="info-soft" size="icon-sm" onClick={onClick}>
      <FileQuestion className="h-4 w-4" />
      <span className="sr-only">Заявка</span>
    </Button>
  );
}
