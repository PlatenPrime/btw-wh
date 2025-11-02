import { useState } from "react";
import type { IPull, IPullPosition } from "@/modules/pulls/api/types/dto";
import { PullContainerView } from "./PullContainerView";
import { useProcessPullPositionMutation } from "@/modules/pulls/api/hooks/mutations/useProcessPullPositionMutation";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { toast } from "sonner";

interface PullContainerProps {
  pull: IPull;
}

export function PullContainer({ pull }: PullContainerProps) {
  const { user } = useAuth();
  const processPositionMutation = useProcessPullPositionMutation();
  const [selectedPosition, setSelectedPosition] =
    useState<IPullPosition | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleProcessPosition = async (
    position: IPullPosition,
    actualQuant: number,
    actualBoxes: number,
  ) => {
    if (!user) {
      toast.error("Користувач не авторизований");
      return;
    }

    try {
      await processPositionMutation.mutateAsync({
        palletId: pull.palletId,
        posId: position.posId,
        data: {
          askId: position.askId,
          actualQuant,
          actualBoxes,
          solverId: user._id,
        },
      });
      setDialogOpen(false);
      setSelectedPosition(null);
    } catch (error) {
      // Error handled in mutation hook
    }
  };

  const handlePositionClick = (position: IPullPosition) => {
    if (position.currentQuant === 0) {
      toast.info("Позиція вже оброблена");
      return;
    }
    setSelectedPosition(position);
    setDialogOpen(true);
  };

  return (
    <PullContainerView
      pull={pull}
      selectedPosition={selectedPosition}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      onPositionClick={handlePositionClick}
      onProcessPosition={handleProcessPosition}
      isProcessing={processPositionMutation.isPending}
    />
  );
}

