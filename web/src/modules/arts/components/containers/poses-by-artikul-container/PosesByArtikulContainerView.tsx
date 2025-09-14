import type { GetPosesByArtikulResponse } from "@/modules/poses/api/types";
import { SkladPosesList } from "./components/sklad-poses-list/SkladPosesList";
import { TotalItems } from "./components/total-items/TotalItems";

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
