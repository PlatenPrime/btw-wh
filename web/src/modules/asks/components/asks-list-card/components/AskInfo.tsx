import { CircleIcon, NotebookTextIcon } from "lucide-react";

interface AskInfoProps {
  nameukr: string;
  quant: number;
  com: string;
}

export function AskInfo({ nameukr, quant, com }: AskInfoProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-foreground font-mono text-xl">{nameukr}</span>
      </div>
      <div className="flex items-center gap-2">
        <CircleIcon className="h-4 w-4" />
        <span className="text-foreground font-mono text-lg font-bold">
          {quant}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <NotebookTextIcon className="h-4 w-4" />
        <span className="text-foreground font-mono text-xs italic">{com}</span>
      </div>
    </div>
  );
}
