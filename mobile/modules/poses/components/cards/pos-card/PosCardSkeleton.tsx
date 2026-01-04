import { ThemedBox, ThemedHStack } from "@/components/themed";
import { Card } from "@/components/ui/card";

export function PosCardSkeleton() {
  return (
    <Card variant="outlined" className="p-2">
      {/* Header with image, title and menu */}
      <ThemedHStack className="items-start justify-between mb-2">
        <ThemedBox className="flex-1">
          {/* ArtImageLink skeleton: image + text horizontally */}
          <ThemedBox className="flex-row items-start" style={{ gap: 12 }}>
            {/* Image skeleton */}
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ width: 60, height: 60 }}
            />
            {/* Text skeleton */}
            <ThemedBox style={{ flex: 1, minWidth: 0 }}>
              <ThemedBox
                className="rounded bg-secondary-300 mb-1"
                style={{ height: 16, width: 128 }}
              />
              <ThemedBox
                className="rounded bg-secondary-300"
                style={{ height: 14, width: "80%" }}
              />
            </ThemedBox>
          </ThemedBox>
        </ThemedBox>
      </ThemedHStack>

      {/* Content with metrics */}
      <ThemedBox className="flex-row gap-2">
        <ThemedBox className="flex-1">
          {/* PosInfoItem skeleton: icon + text horizontally */}
          <ThemedBox className="flex-row items-center justify-center gap-2 rounded-lg p-1 bg-background-100">
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ width: 16, height: 16 }}
            />
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ height: 14, width: 64 }}
            />
          </ThemedBox>
        </ThemedBox>
        <ThemedBox className="flex-1">
          {/* PosInfoItem skeleton: icon + text horizontally */}
          <ThemedBox className="flex-row items-center justify-center gap-2 rounded-lg p-1 bg-background-100">
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ width: 16, height: 16 }}
            />
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ height: 14, width: 48 }}
            />
          </ThemedBox>
        </ThemedBox>
        <ThemedBox className="flex-1">
          {/* PosInfoItem skeleton: icon + text horizontally */}
          <ThemedBox className="flex-row items-center justify-center gap-2 rounded-lg p-1 bg-background-100">
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ width: 16, height: 16 }}
            />
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ height: 14, width: 48 }}
            />
          </ThemedBox>
        </ThemedBox>
      </ThemedBox>
    </Card>
  );
}
