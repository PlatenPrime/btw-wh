import { Container } from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskDeleteButton } from "@/modules/asks/components/controls/ask-control-buttons/ask-delete-button/AskDeleteButton.tsx";
import { AskCompleteButton } from "@/modules/asks/components/controls/ask-control-buttons/ask-complete-button/AskCompleteButton";
import { AskRejectButton } from "@/modules/asks/components/controls/ask-control-buttons/ask-reject-button/AskRejectButton.tsx";

interface AskControlButtonsProps {
  askData: AskDto;
}

export function AskControlButtons({ askData }: AskControlButtonsProps) {
  return (
    <Container className="flex items-center justify-end gap-2">
      <Card className="p-0">
        <CardContent className="flex gap-1 p-1">
          <AskCompleteButton askData={askData} />
          <AskRejectButton askData={askData} />
          <AskDeleteButton askData={askData} />
        </CardContent>
      </Card>
    </Container>
  );
}
