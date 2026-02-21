import type { DelDto } from "@/modules/dels/api/types";
import { DelHeaderCard } from "@/modules/dels/components/cards/del-header-card";
import { DelArtikulsList } from "@/modules/dels/components/lists/del-artikuls-list";

export interface DelContainerViewChainStep {
  artikul: string;
  status: string;
  error?: string;
}

interface DelContainerViewProps {
  del: DelDto;
  refetch: () => void;
  isChainRunning: boolean;
  chainSteps: DelContainerViewChainStep[];
}

export function DelContainerView({
  del,
  refetch,
  isChainRunning,
  chainSteps,
}: DelContainerViewProps) {
  return (
    <div className="grid gap-4 p-4">
      <DelHeaderCard del={del} />
      <DelArtikulsList
        del={del}
        onRefetch={refetch}
        chainRunning={isChainRunning}
        chainSteps={chainSteps}
      />
    </div>
  );
}
