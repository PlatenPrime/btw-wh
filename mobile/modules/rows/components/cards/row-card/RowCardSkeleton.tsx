import { ThemedBox } from "@/components/themed";
import { ThemedHStack } from "@/components/themed";

export function RowCardSkeleton() {
  return (
    <ThemedBox className="p-2 rounded-lg border border-outline-50 bg-background-0">
      <ThemedHStack className="items-center justify-between">
        <ThemedBox className="flex-1 min-w-0 items-center justify-center">
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ height: 24, width: 120 }}
          />
        </ThemedBox>
        {/* reserve space for menu button */}
        <ThemedBox
          className="rounded-full bg-secondary-300"
          style={{ height: 24, width: 24 }}
        />
      </ThemedHStack>
    </ThemedBox>
  );
}
