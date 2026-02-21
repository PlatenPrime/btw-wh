import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { DelHeaderActionsView } from "@/modules/dels/components/actions/del-header-actions/DelHeaderActionsView";
import { ListOrdered, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface DelHeaderActionsProps {
  refetch: () => void;
  updateAllMutation: {
    isPending: boolean;
    mutate: (
      vars?: void,
      opts?: { onSettled?: () => void },
    ) => void;
  };
  onRunChain: () => void;
  hasArtikuls: boolean;
  isChainRunning: boolean;
}

export function DelHeaderActions({
  refetch,
  updateAllMutation,
  onRunChain,
  hasArtikuls,
  isChainRunning,
}: DelHeaderActionsProps) {
  const [updateAllConfirmOpen, setUpdateAllConfirmOpen] = useState(false);
  const [runChainConfirmOpen, setRunChainConfirmOpen] = useState(false);
  const prevChainRunning = useRef(false);

  useEffect(() => {
    if (prevChainRunning.current && !isChainRunning) {
      setRunChainConfirmOpen(false);
    }
    prevChainRunning.current = isChainRunning;
  }, [isChainRunning]);

  const openUpdateAllConfirm = useCallback(() => {
    setUpdateAllConfirmOpen(true);
  }, []);
  const closeUpdateAllConfirm = useCallback(() => {
    setUpdateAllConfirmOpen(false);
  }, []);

  const openRunChainConfirm = useCallback(() => {
    setRunChainConfirmOpen(true);
  }, []);
  const closeRunChainConfirm = useCallback(() => {
    setRunChainConfirmOpen(false);
  }, []);

  const handleUpdateAllConfirm = useCallback(() => {
    updateAllMutation.mutate(undefined, {
      onSettled: () => {
        refetch();
        setUpdateAllConfirmOpen(false);
      },
    });
  }, [updateAllMutation, refetch]);

  const handleRunChainConfirm = useCallback(() => {
    onRunChain();
  }, [onRunChain]);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [
      {
        id: "update-all-del-artikuls",
        label: "Оновити всі",
        icon: RefreshCw,
        iconColor: "blue",
        variant: "default",
        onClick: openUpdateAllConfirm,
      },
    ];
    if (hasArtikuls) {
      actions.push({
        id: "run-chain-del",
        label: "Ланцюгове оновлення",
        icon: ListOrdered,
        iconColor: "default",
        variant: "default",
        onClick: openRunChainConfirm,
      });
    }
    return actions;
  }, [openUpdateAllConfirm, openRunChainConfirm, hasArtikuls]);

  useRegisterHeaderActions(headerActions);

  return (
    <DelHeaderActionsView
      updateAllConfirmOpen={updateAllConfirmOpen}
      onUpdateAllConfirmOpenChange={setUpdateAllConfirmOpen}
      onUpdateAllConfirm={handleUpdateAllConfirm}
      onUpdateAllCancel={closeUpdateAllConfirm}
      updateAllIsPending={updateAllMutation.isPending}
      runChainConfirmOpen={runChainConfirmOpen}
      onRunChainConfirmOpenChange={setRunChainConfirmOpen}
      onRunChainConfirm={handleRunChainConfirm}
      onRunChainCancel={closeRunChainConfirm}
      runChainIsPending={isChainRunning}
    />
  );
}
