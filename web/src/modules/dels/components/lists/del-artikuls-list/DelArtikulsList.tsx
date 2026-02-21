import type { DelDto } from "@/modules/dels/api/types";
import { usePatchDelArtikulMutation } from "@/modules/dels/api/hooks/mutations/usePatchDelArtikulMutation";
import { DelArtikulsListView } from "@/modules/dels/components/lists/del-artikuls-list/DelArtikulsListView";

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
  const stepByArtikul = new Map(chainSteps.map((s) => [s.artikul, s]));

  const items = entries.map(([artikul, item]) => {
    const step = stepByArtikul.get(artikul);
    const showChainStatus = chainRunning && step;
    const isUpdating =
      !showChainStatus &&
      patchMutation.isPending &&
      patchMutation.variables?.artikul === artikul;

    return {
      artikul,
      item,
      onRefresh: () => {
        patchMutation.mutate(
          { artikul },
          { onSettled: () => onRefetch?.() },
        );
      },
      isUpdating,
      disabled: patchMutation.isPending || chainRunning,
      chainStep: step ?? null,
      chainRunning,
    };
  });

  return (
    <DelArtikulsListView
      empty={items.length === 0}
      items={items}
    />
  );
}
