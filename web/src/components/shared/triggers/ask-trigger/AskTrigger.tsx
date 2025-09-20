import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

interface AskTriggerProps {
  onClick?: () => void;
}

export default function AskTrigger({ onClick }: AskTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 text-violet-500 hover:bg-violet-500/10 hover:text-violet-400"
      onClick={onClick}
    >
      <FileQuestion className="h-4 w-4" />
    </Button>
  );
}
