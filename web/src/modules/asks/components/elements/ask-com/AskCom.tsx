import { IconWell } from "@/components/shared/elements";
import { MessageSquareMore } from "lucide-react";

interface AskComProps {
  com: string | undefined;
}

export function AskCom({ com }: AskComProps) {
  if (!com) return null;
  return (
    <div className="text-foreground flex items-center gap-2 text-sm">
      <IconWell icon={MessageSquareMore} tone="edit" size="sm" />
      <span className="italic">{com}</span>
    </div>
  );
}
