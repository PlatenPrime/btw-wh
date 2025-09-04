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
        <span className="text-foreground font-semibold ">{nameukr}</span>
      </div>
      {quant !== 0 &&  <div className="flex items-center gap-2">
        <CircleIcon className="h-4 w-4" color="blue" />
        <span className="text-foreground text-sm ">
          {quant}
        </span>
      </div>}
      {com !== "" && <div className="flex items-center gap-2">
        <NotebookTextIcon className="h-4 w-4" color="blue" />
        <span className="text-foreground   italic text-sm ">{com}</span>
      </div>}
    </div>
  );
}
