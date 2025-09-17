import { MessageSquareMore } from "lucide-react";

interface AskComProps {
  com: string | undefined;
}

export function AskCom({ com }: AskComProps) {

  if (!com) return null;
  return (
    <div className="flex items-center gap-2">
      <MessageSquareMore className="text-foreground h-3 w-3" />
      <span className="text-foreground text-xs italic">{com}</span>
    </div>
  );
}
