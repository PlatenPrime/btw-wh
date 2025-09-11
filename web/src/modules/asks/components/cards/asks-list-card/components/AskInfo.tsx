import { AskCom } from "@/modules/asks/components/elements/ask-com/AskCom";
import { AskNameukr } from "@/modules/asks/components/elements/ask-nameukr/AskNameukr";
import { AskQuant } from "@/modules/asks/components/elements/ask-quant/AskQuant";
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
      <Link to={`${id}`} className="text-foreground hover:underline">
        <AskNameukr nameukr={nameukr} />
      </Link>
      <AskQuant quant={quant} />
      <AskCom com={com} />
    </div>
  );
}
