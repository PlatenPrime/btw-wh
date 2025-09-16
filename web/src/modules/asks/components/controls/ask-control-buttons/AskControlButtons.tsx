import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskDeleteButton } from "./ask-delete-button/AskDeleteButton";
import { AskExecuteButton } from "./ask-execute-button/AskExecuteButton";
import { AskRejectButton } from "./ask-reject-button/AskRejectButton";

interface AskControlButtonsProps {
  askData: AskDto;
}

export function AskControlButtons({ askData }: AskControlButtonsProps) {
  return (
    <Container className="flex items-center gap-2">
      <Card className="p-0">
        <CardContent className="flex gap-1 p-1">
          <AskExecuteButton askData={askData} />
          <AskRejectButton askData={askData} />
          <AskDeleteButton askData={askData} />
        </CardContent>
      </Card>
    </Container>
  );
}
