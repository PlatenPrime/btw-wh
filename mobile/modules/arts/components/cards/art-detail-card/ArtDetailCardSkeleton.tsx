import { ThemedBox } from "@/components/themed";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";

export function ArtDetailCardSkeleton() {
  return (
    <ThemedBox className="p-3 rounded-lg border border-outline-100 bg-background-0">
      <ThemedBox className="gap-3">
        {/* Скелетон для изображения и названия */}
        <ThemedBox className="flex-row items-start gap-3">
          <ThemedBox className="rounded-lg bg-secondary-300" style={{ height: 60, width: 60 }} />
          <ThemedBox className="flex-1 gap-2">
            <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 128 }} />
            <ThemedBox className="rounded bg-secondary-300" style={{ height: 12, width: 192 }} />
          </ThemedBox>
        </ThemedBox>

        {/* Скелетон для зоны, лимита и данных Btrade */}
        <ThemedBox className="gap-2">
          <ThemedBox className="flex-row items-center gap-2">
            <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 16 }} />
            <ThemedBox className="rounded bg-secondary-300" style={{ height: 12, width: 48 }} />
          </ThemedBox>
          <ThemedBox className="flex-row items-center gap-2">
            <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 16 }} />
            <ThemedBox className="rounded bg-secondary-300" style={{ height: 12, width: 48 }} />
          </ThemedBox>
          <BtradeArtDataSkeleton />
        </ThemedBox>
      </ThemedBox>
    </ThemedBox>
  );
}

