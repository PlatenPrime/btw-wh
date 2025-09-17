import { Card, CardContent } from "@/components/ui";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskCompleteButton } from "@/modules/asks/components/controls/ask-control-buttons/ask-complete-button/AskCompleteButton";
import { AskDeleteButton } from "@/modules/asks/components/controls/ask-control-buttons/ask-delete-button/AskDeleteButton.tsx";
import { AskRejectButton } from "@/modules/asks/components/controls/ask-control-buttons/ask-reject-button/AskRejectButton.tsx";

interface AskControlButtonsProps {
  askData: AskDto;
}

export function AskControlButtons({ askData }: AskControlButtonsProps) {
  return (
    <Card className="p-0">
      <CardContent className="flex flex-col justify-between h-full gap-1 p-1">
        <AskCompleteButton askData={askData} />
        <AskRejectButton askData={askData} />
        <AskDeleteButton askData={askData} />
      </CardContent>
    </Card>
  );
}
