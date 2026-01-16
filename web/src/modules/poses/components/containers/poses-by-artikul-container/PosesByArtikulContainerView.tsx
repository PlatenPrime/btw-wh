import { memo } from "react";
import { Card } from "@/components/ui";
import { SkladPosesList } from "./components/sklad-poses-list/SkladPosesList";
import type { PosesByArtikulContainerViewProps } from "./types";

export const PosesByArtikulContainerView = memo(function PosesByArtikulContainerView({
  data,
  renderPos,
  additionalProps,
}: PosesByArtikulContainerViewProps) {
  const { pogrebi, merezhi } = data;

  return (
    <Card className="grid gap-4 p-2 bg-card/10 dark:bg-card/50">
      {/* Позиции по складам */}
      <div className="grid items-start gap-2 lg:grid-cols-2">
        <SkladPosesList
          skladData={pogrebi}
          title="Погреби"
          renderPos={renderPos}
          additionalProps={additionalProps}
        />
        <SkladPosesList
          skladData={merezhi}
          title="Мережі"
          renderPos={renderPos}
          additionalProps={additionalProps}
        />
      </div>
    </Card>
  );
});
