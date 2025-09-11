import { MessageSquareMore } from "lucide-react";

interface AskComProps {
  com: string | undefined;
}

export function AskCom({ com }: AskComProps) {

  if (!com) return null;
  return (
    <div className="flex items-center gap-2">
      <MessageSquareMore className="text-foreground h-4 w-4" />
      <span className="text-foreground text-sm italic">{com}</span>
    </div>
  );
}
