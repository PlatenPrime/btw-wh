import { MessageSquareMore } from "lucide-react";

interface AskComProps {
  com: string | undefined;
}

export function AskCom({ com }: AskComProps) {
  if (!com) return null;
  return (
    <div className="text-foreground flex items-center gap-2 text-xs">
      <MessageSquareMore className="h-4 w-4" />
      <span className="italic">{com}</span>
    </div>
  );
}
