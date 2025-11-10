import { useState } from "react";

import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { useProcessPullPositionMutation } from "@/modules/pulls/api/hooks/mutations/useProcessPullPositionMutation";
import type {
  Pull,
  PullPosition,
  PullsResponsePayload,
} from "@/modules/pulls/api/types";
import { toast } from "sonner";
import { PullsContainerView } from "./PullsContainerView";

interface PullsContainerProps {
  data: PullsResponsePayload;
  isFetching: boolean;
  onRefresh: () => void;
}

export function PullsContainer({
  data,
  isFetching,
  onRefresh,
}: PullsContainerProps) {
  const { user } = useAuth();
  const processPositionMutation = useProcessPullPositionMutation();
  const [selectedContext, setSelectedContext] = useState<{
    pull: Pull;
    position: PullPosition;
  } | null>(null);

  const handlePositionClick = (pull: Pull, position: PullPosition) => {
    setSelectedContext({ pull, position });
  };

  const handleDialogClose = () => {
    setSelectedContext(null);
  };

  const handleProcessPosition = async (
    actualQuant: number,
    actualBoxes: number,
  ) => {
    if (!selectedContext) {
      return;
    }

    if (!user) {
      toast.error("Користувач не авторизований");
      return;
    }

    try {
      await processPositionMutation.mutateAsync({
        pull: selectedContext.pull,
        position: selectedContext.position,
        actualQuant,
        actualBoxes,
        solverId: user._id,
      });

      handleDialogClose();
    } catch {
      // ошибки обрабатываются внутри мутации
    }
  };

  return (
    <PullsContainerView
      data={data}
      isFetching={isFetching}
      onRefresh={onRefresh}
      onPositionClick={handlePositionClick}
      selectedPull={selectedContext?.pull ?? null}
      selectedPosition={selectedContext?.position ?? null}
      onCloseDialog={handleDialogClose}
      onProcess={handleProcessPosition}
      isProcessing={processPositionMutation.isPending}
    />
  );
}
