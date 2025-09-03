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
        <span className="text-foreground font-bold ">{nameukr}</span>
      </div>
      <div className="flex items-center gap-2">
        <CircleIcon className="h-4 w-4" />
        <span className="text-foreground ">
          {quant}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <NotebookTextIcon className="h-4 w-4" />
        <span className="text-foreground   italic">{com}</span>
      </div>
    </div>
  );
}
