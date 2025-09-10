import { CircleIcon, MessageSquareMore } from "lucide-react";
import { Link } from "react-router";

interface AskInfoProps {
  nameukr: string;
  quant: number;
  com: string;
  id: string;
}

export function AskInfo({ nameukr, quant, com, id }: AskInfoProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Link to={`${id}`} className="text-foreground">{nameukr}</Link>
      </div>
      {quant !== 0 && (
        <div className="flex items-center gap-2">
          <CircleIcon className="h-4 w-4" />
          <span className="text-foreground text-sm">{quant}</span>
        </div>
      )}
      {com !== "" && (
        <div className="flex items-center gap-2">
          <MessageSquareMore className="text-foreground h-4 w-4" />
          <span className="text-foreground text-sm italic">{com}</span>
        </div>
      )}
    </div>
  );
}
