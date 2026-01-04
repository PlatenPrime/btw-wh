import { ThemedVStack } from "@/components/themed";
import { SkladPosesList } from "./components/sklad-poses-list/SkladPosesList";
import type { PosesByArtikulContainerViewProps } from "./types";

export function PosesByArtikulContainerView({
  data,
  renderPos,
  additionalProps,
}: PosesByArtikulContainerViewProps) {
  const { pogrebi, merezhi } = data;

  return (
    <ThemedVStack className="gap-4">
      {/* Позиции по складам */}
      <ThemedVStack className="gap-4">
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
      </ThemedVStack>
    </ThemedVStack>
  );
}

