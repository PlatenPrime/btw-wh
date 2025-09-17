import { AskSkladPosesList } from "@/modules/asks/components/containers/ask-poses-by-artikul-container/components/ask-sklad-poses-list/AskSkladPosesList";
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

      {/* Позиции по складам */}
      <div className="grid items-start gap-2 lg:grid-cols-2">
        <AskSkladPosesList skladData={pogrebi} title="Погреби" askId={askId} />
        <AskSkladPosesList skladData={merezhi} title="Мережі" askId={askId} />
      </div>
    </div>
  );
}
