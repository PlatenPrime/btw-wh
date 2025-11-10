import { Button } from "@/components/ui/button";
import { FetchIndicator } from "@/components/shared/fetch-indicator";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { Pull, PullPosition, PullsResponsePayload } from "@/modules/pulls/api/types";
import { PullStats } from "@/modules/pulls/components/elements/PullStats";
import { PullsList } from "@/modules/pulls/components/lists/pulls-list/PullsList";
import { ProcessPositionDialog } from "@/modules/pulls/components/dialogs/process-position-dialog/ProcessPositionDialog";
import { Package, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
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
      <Wrapper className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-start">
          <FetchIndicator
            total={data.totalPulls}
            isFetching={isFetching}
            icon={<Package />}
          />
          <PullStats totalPulls={data.totalPulls} totalAsks={data.totalAsks} />
        </div>
        <div className="flex justify-end">
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
        </div>
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
