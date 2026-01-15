import { ThemedBox, ThemedVStack, ThemedHStack } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";

export function PosesByArtikulContainerSkeleton() {
  return (
    <ThemedVStack className="gap-4">
      {/* Позиции по складам */}
      <ThemedVStack className="gap-4">
        {/* Погреби */}
        <ThemedView className="p-4 rounded-lg border border-outline-50">
          <ThemedVStack className="gap-2">
            <ThemedHStack className="items-center justify-between">
              <ThemedBox className="h-5 w-16 bg-background-200 rounded" />
              <ThemedBox className="h-5 w-8 bg-background-200 rounded" />
              <ThemedBox className="h-5 w-8 bg-background-200 rounded" />
            </ThemedHStack>
            <ThemedVStack className="gap-2">
              {[1, 2, 3].map((i) => (
                <ThemedBox key={i} className="h-8 w-full bg-background-200 rounded-md" />
              ))}
            </ThemedVStack>
          </ThemedVStack>
        </ThemedView>

        {/* Мережі */}
        <ThemedView className="p-4 rounded-lg border border-outline-50">
          <ThemedVStack className="gap-2">
            <ThemedHStack className="items-center justify-between">
              <ThemedBox className="h-5 w-16 bg-background-200 rounded" />
              <ThemedBox className="h-5 w-8 bg-background-200 rounded" />
              <ThemedBox className="h-5 w-8 bg-background-200 rounded" />
            </ThemedHStack>
            <ThemedVStack className="gap-2">
              {[1, 2].map((i) => (
                <ThemedBox key={i} className="h-8 w-full bg-background-200 rounded-md" />
              ))}
            </ThemedVStack>
          </ThemedVStack>
        </ThemedView>
      </ThemedVStack>
    </ThemedVStack>
  );
}

