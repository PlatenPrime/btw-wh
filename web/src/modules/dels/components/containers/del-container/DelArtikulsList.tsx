import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { DelDto } from "@/modules/dels/api/types";
import { usePatchDelArtikulMutation } from "@/modules/dels/api/hooks/mutations/usePatchDelArtikulMutation";
import { DelArtikulCard } from "@/modules/dels/components/cards/del-artikul-card";

export interface ChainStepForList {
  artikul: string;
  status: string;
  error?: string;
}

interface DelArtikulsListProps {
  del: DelDto;
  onRefetch?: () => void;
  chainRunning?: boolean;
  chainSteps?: ChainStepForList[];
}

export function DelArtikulsList({
  del,
  onRefetch,
  chainRunning = false,
  chainSteps = [],
}: DelArtikulsListProps) {
  const patchMutation = usePatchDelArtikulMutation({ delId: del._id });
  const entries = Object.entries(del.artikuls ?? {});

  const stepByArtikul = new Map(
    chainSteps.map((s) => [s.artikul, s]),
  );

  if (entries.length === 0) {
    return (
      <Wrapper>
        <p className="text-muted-foreground text-sm">
          У поставці ще немає артикулів.
        </p>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2">
      {entries.map(([artikul, item]) => {
        const step = stepByArtikul.get(artikul);
        const showChainStatus = chainRunning && step;

        const isUpdating =
          !showChainStatus &&
          patchMutation.isPending &&
          patchMutation.variables?.artikul === artikul;

        return (
          <DelArtikulCard
            key={artikul}
            artikul={artikul}
            item={item}
            onRefresh={() => {
              patchMutation.mutate(
                { artikul },
                { onSettled: () => onRefetch?.() },
              );
            }}
            isUpdating={isUpdating}
            disabled={patchMutation.isPending || chainRunning}
            chainStep={step ?? null}
            chainRunning={chainRunning}
          />
        );
      })}
    </Wrapper>
  );
}
