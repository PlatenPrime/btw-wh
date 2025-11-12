import { FetchIndicator } from "@/components/shared/fetch-indicator";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  Pull,
  PullPosition,
  PullsResponsePayload,
} from "@/modules/pulls/api/types";
import { ProcessPositionDialog } from "@/modules/pulls/components/dialogs/process-position-dialog/ProcessPositionDialog";
import { PullsList } from "@/modules/pulls/components/lists/pulls-list/PullsList";
import { Columns4Icon, RotateCcw } from "lucide-react";
import { useMemo } from "react";

interface PullsContainerViewProps {
  data: PullsResponsePayload;
  isFetching: boolean;
  onRefresh: () => void;
  onPositionClick: (pull: Pull, position: PullPosition) => void;
  selectedPull: Pull | null;
  selectedPosition: PullPosition | null;
  onCloseDialog: () => void;
  onProcess: (actualQuant: number, actualBoxes: number) => Promise<void> | void;
  isProcessing: boolean;
}

export function PullsContainerView({
  data,
  isFetching,
  onRefresh,
  onPositionClick,
  selectedPull,
  selectedPosition,
  onCloseDialog,
  onProcess,
  isProcessing,
}: PullsContainerViewProps) {
  const hasNoPulls = data.pulls.length === 0;

  const currentDialogTitle = useMemo(() => {
    if (!selectedPull || !selectedPosition) {
      return null;
    }

    return `${selectedPull.palletTitle} • ${selectedPosition.artikul}`;
  }, [selectedPull, selectedPosition]);

  return (
    <section className="grid gap-3">
      <Wrapper className="flex items-center justify-between">
        <FetchIndicator
          total={data.totalPulls}
          isFetching={isFetching}
          icon={<Columns4Icon className="h-4 w-4" />}
        />

        <Button
          type="button"
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          disabled={isFetching}
        >
          <RotateCcw className={cn("h-4 w-4", isFetching && "animate-spin")} />
          Оновити
        </Button>
      </Wrapper>

      <Wrapper className={cn("grid gap-3", isFetching && "opacity-60")}>
        <PullsList
          pulls={data.pulls}
          onPositionClick={onPositionClick}
          isEmpty={hasNoPulls}
        />
      </Wrapper>

      <ProcessPositionDialog
        open={Boolean(selectedPull && selectedPosition)}
        onOpenChange={(open) => {
          if (!open) {
            onCloseDialog();
          }
        }}
        pullTitle={selectedPull?.palletTitle ?? ""}
        position={selectedPosition}
        dialogTitle={currentDialogTitle}
        onProcess={onProcess}
        isProcessing={isProcessing}
      />
    </section>
  );
}
