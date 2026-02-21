import { useQueryClient } from "@tanstack/react-query";
import { patchDelArtikul } from "@/modules/dels/api/services/mutations/patchDelArtikul";
import { useDelByIdQuery } from "@/modules/dels/api/hooks/queries/useDelByIdQuery";
import { useUpdateAllDelArtikulsMutation } from "@/modules/dels/api/hooks/mutations/useUpdateAllDelArtikulsMutation";
import type { DelDto } from "@/modules/dels/api/types";
import { DelHeaderActions } from "@/modules/dels/components/actions/del-header-actions";
import { DelContainerView } from "@/modules/dels/components/containers/del-container/DelContainerView";
import { useCallback, useState } from "react";

export type ChainStepStatus = "pending" | "running" | "success" | "error";

export interface ChainStep {
  artikul: string;
  status: ChainStepStatus;
  error?: string;
}

interface DelContainerProps {
  del: DelDto;
}

export function DelContainer({ del }: DelContainerProps) {
  const queryClient = useQueryClient();
  const { refetch } = useDelByIdQuery({ id: del._id });
  const updateAllMutation = useUpdateAllDelArtikulsMutation({ delId: del._id });

  const [isChainRunning, setIsChainRunning] = useState(false);
  const [chainSteps, setChainSteps] = useState<ChainStep[]>([]);

  const runChain = useCallback(async () => {
    const artikulKeys = Object.keys(del.artikuls ?? {});
    if (artikulKeys.length === 0) {
      return;
    }
    setIsChainRunning(true);
    setChainSteps(
      artikulKeys.map((artikul) => ({
        artikul,
        status: "pending" as ChainStepStatus,
      })),
    );

    for (let i = 0; i < artikulKeys.length; i++) {
      const artikul = artikulKeys[i];
      setChainSteps((prev) =>
        prev.map((s) =>
          s.artikul === artikul ? { ...s, status: "running" } : s,
        ),
      );
      try {
        const response = await patchDelArtikul({ id: del._id, artikul });
        queryClient.setQueryData(["dels", del._id], response);
        setChainSteps((prev) =>
          prev.map((s) =>
            s.artikul === artikul ? { ...s, status: "success" } : s,
          ),
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Помилка";
        setChainSteps((prev) =>
          prev.map((s) =>
            s.artikul === artikul
              ? { ...s, status: "error", error: message }
              : s,
          ),
        );
      }
    }

    setIsChainRunning(false);
    refetch();
  }, [del._id, del.artikuls, queryClient, refetch]);

  const hasArtikuls = Object.keys(del.artikuls ?? {}).length > 0;

  return (
    <>
      <DelHeaderActions
        refetch={refetch}
        updateAllMutation={{
          isPending: updateAllMutation.isPending,
          mutate: updateAllMutation.mutate,
        }}
        onRunChain={runChain}
        hasArtikuls={hasArtikuls}
        isChainRunning={isChainRunning}
      />
      <DelContainerView
        del={del}
        refetch={refetch}
        isChainRunning={isChainRunning}
        chainSteps={chainSteps}
      />
    </>
  );
}
