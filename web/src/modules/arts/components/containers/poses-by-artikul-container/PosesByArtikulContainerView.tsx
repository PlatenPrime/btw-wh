import type { GetPosesByArtikulResponse } from "@/modules/poses/api/types";
import { SkladPosesList } from "@/modules/arts/components/containers/poses-by-artikul-container/components/sklad-poses-list/SkladPosesList.tsx";
import { TotalItems } from "@/modules/arts/components/containers/poses-by-artikul-container/components/total-items/TotalItems.tsx";

interface PosesByArtikulContainerViewProps {
  data: GetPosesByArtikulResponse;
}

export function PosesByArtikulContainerView({
  data,
}: PosesByArtikulContainerViewProps) {
  const { pogrebi, merezhi } = data;
  return (
    <div className="grid gap-4">
      {/* Общая статистика */}
      <TotalItems data={data} />

      {/* Позиции по складам */}
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <SkladPosesList skladData={pogrebi} title="Погреби" />
        <SkladPosesList skladData={merezhi} title="Мережі" />
      </div>
    </div>
  );
}
