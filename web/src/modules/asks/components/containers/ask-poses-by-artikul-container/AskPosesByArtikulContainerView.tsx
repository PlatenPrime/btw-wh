import { AskSkladPosesList } from "@/modules/asks/components/containers/ask-poses-by-artikul-container/components/ask-sklad-poses-list/AskSkladPosesList";
import { TotalItems } from "@/modules/arts/components/containers/poses-by-artikul-container/components/total-items/TotalItems";
import type { GetPosesByArtikulResponse } from "@/modules/poses/api/types";

interface AskPosesByArtikulContainerViewProps {
  data: GetPosesByArtikulResponse;
  askId: string;
}

export function AskPosesByArtikulContainerView({
  data,
  askId,
}: AskPosesByArtikulContainerViewProps) {
  const { pogrebi, merezhi } = data;

  return (
    <div className="grid gap-2">
      {/* Заголовок секции */}


      {/* Общая статистика */}
      {/* <TotalItems data={data} /> */}

      {/* Позиции по складам */}
      <div className="grid items-start gap-2 lg:grid-cols-2">
        <AskSkladPosesList skladData={pogrebi} title="Погреби" askId={askId} />
        <AskSkladPosesList skladData={merezhi} title="Мережі" askId={askId} />
      </div>
    </div>
  );
}
