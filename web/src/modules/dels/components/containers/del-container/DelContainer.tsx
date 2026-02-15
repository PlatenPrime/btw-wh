import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { patchDelArtikul } from "@/modules/dels/api/services/mutations/patchDelArtikul";
import { useDelByIdQuery } from "@/modules/dels/api/hooks/queries/useDelByIdQuery";
import { useUpdateAllDelArtikulsMutation } from "@/modules/dels/api/hooks/mutations/useUpdateAllDelArtikulsMutation";
import type { DelDto } from "@/modules/dels/api/types";
import { DelArtikulsList } from "@/modules/dels/components/containers/del-container/DelArtikulsList";
import { Loader2, RefreshCw } from "lucide-react";
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
        await patchDelArtikul({ id: del._id, artikul });
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
  }, [del._id, del.artikuls]);

  const hasArtikuls =
    Object.keys(del.artikuls ?? {}).length > 0;

  return (
    <div className="grid gap-4 p-4">
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle>{del.title}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={updateAllMutation.isPending}
              onClick={() => {
                updateAllMutation.mutate(undefined, {
                  onSettled: () => refetch(),
                });
              }}
            >
              {updateAllMutation.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                <RefreshCw className="size-4" aria-hidden />
              )}
              <span className="ml-2">Оновити всі</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={isChainRunning || !hasArtikuls}
              onClick={runChain}
            >
              {isChainRunning ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : null}
              <span className="ml-2">Ланцюгове оновлення</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DelArtikulsList
            del={del}
            onRefetch={refetch}
            chainRunning={isChainRunning}
            chainSteps={chainSteps}
          />
        </CardContent>
      </Card>
    </div>
  );
}
