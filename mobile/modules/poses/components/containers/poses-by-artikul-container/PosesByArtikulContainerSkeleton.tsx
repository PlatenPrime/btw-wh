import { ThemedBox, ThemedHStack, ThemedVStack } from "@/components/themed";

export function PosesByArtikulContainerSkeleton() {
  return (
    <ThemedVStack className="gap-4">
      {/* Позиции по складам */}
      <ThemedVStack className="gap-4">
        {/* Погреби */}
        <ThemedBox className="p-4 rounded-lg border border-outline-50 bg-background-0">
          <ThemedVStack className="gap-2">
            <ThemedHStack className="items-center">
              <ThemedBox className="flex-1">
                <ThemedBox
                  className="rounded bg-secondary-300"
                  style={{ height: 16, width: 72 }}
                />
              </ThemedBox>
              <ThemedBox className="flex-1 items-center">
                <ThemedBox
                  className="rounded bg-secondary-300"
                  style={{ height: 16, width: 32 }}
                />
              </ThemedBox>
              <ThemedBox className="flex-1 items-end">
                <ThemedBox
                  className="rounded bg-secondary-300"
                  style={{ height: 16, width: 32 }}
                />
              </ThemedBox>
            </ThemedHStack>
            <ThemedVStack className="gap-2">
              {[1, 2, 3].map((i) => (
                <ThemedBox
                  key={i}
                  className="rounded-md border border-outline-50 bg-secondary-300"
                  style={{ height: 40, width: "100%" }}
                />
              ))}
            </ThemedVStack>
          </ThemedVStack>
        </ThemedBox>

        {/* Мережі */}
        <ThemedBox className="p-4 rounded-lg border border-outline-50 bg-background-0">
          <ThemedVStack className="gap-2">
            <ThemedHStack className="items-center">
              <ThemedBox className="flex-1">
                <ThemedBox
                  className="rounded bg-secondary-300"
                  style={{ height: 16, width: 72 }}
                />
              </ThemedBox>
              <ThemedBox className="flex-1 items-center">
                <ThemedBox
                  className="rounded bg-secondary-300"
                  style={{ height: 16, width: 32 }}
                />
              </ThemedBox>
              <ThemedBox className="flex-1 items-end">
                <ThemedBox
                  className="rounded bg-secondary-300"
                  style={{ height: 16, width: 32 }}
                />
              </ThemedBox>
            </ThemedHStack>
            <ThemedVStack className="gap-2">
              {[1, 2].map((i) => (
                <ThemedBox
                  key={i}
                  className="rounded-md border border-outline-50 bg-secondary-300"
                  style={{ height: 40, width: "100%" }}
                />
              ))}
            </ThemedVStack>
          </ThemedVStack>
        </ThemedBox>
      </ThemedVStack>
    </ThemedVStack>
  );
}

