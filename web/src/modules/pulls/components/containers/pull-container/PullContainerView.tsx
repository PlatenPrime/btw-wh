import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IPull, IPullPosition } from "@/modules/pulls/api/types/dto";
import { ProcessPositionDialog } from "@/modules/pulls/components/dialogs/process-position-dialog/ProcessPositionDialog";
import { PullPositionsList } from "@/modules/pulls/components/lists/pull-positions-list/PullPositionsList";

interface PullContainerViewProps {
  pull: IPull;
  selectedPosition: IPullPosition | null;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onPositionClick: (position: IPullPosition) => void;
  onProcessPosition: (position: IPullPosition, actualQuant: number) => void;
  isProcessing: boolean;
}

export function PullContainerView({
  pull,
  selectedPosition,
  dialogOpen,
  setDialogOpen,
  onPositionClick,
  onProcessPosition,
  isProcessing,
}: PullContainerViewProps) {
  return (
    <main className="grid gap-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{pull.palletTitle}</span>
            <div className="flex gap-2">
              <Badge variant="outline">Сектор: {pull.sector}</Badge>
              <Badge variant="outline">Ряд: {pull.rowTitle}</Badge>
              <Badge variant="secondary">
                Позицій: {pull.positions.length}
              </Badge>
              <Badge variant="secondary">Запитів: {pull.totalAsks}</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PullPositionsList
            positions={pull.positions}
            onPositionClick={onPositionClick}
          />
        </CardContent>
      </Card>

      {selectedPosition && (
        <ProcessPositionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          position={selectedPosition}
          onProcess={onProcessPosition}
          isProcessing={isProcessing}
        />
      )}
    </main>
  );
}
