import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskDeleteButton } from "./ask-delete-button/AskDeleteButton";

interface AskControlButtonsProps {
  askData: AskDto;
}

export function AskControlButtons({ askData }: AskControlButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <AskDeleteButton askData={askData} />
    </div>
  );
}
