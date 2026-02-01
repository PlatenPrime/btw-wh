import { ThemedBox } from "@/components/themed";
import { ThemedHStack } from "@/components/themed";

export function RowCardSkeleton() {
  return (
    <ThemedBox className="p-2 rounded-2xl border border-outline-100 bg-background-0 shadow-hard-2">
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
