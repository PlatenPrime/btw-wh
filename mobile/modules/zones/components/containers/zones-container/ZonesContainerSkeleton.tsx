import { ThemedBox, ThemedHStack, ThemedVStack } from "@/components/themed";
import { ZoneCardSkeleton } from "@/modules/zones/components/cards/zone-card/ZoneCardSkeleton";

export function ZonesContainerSkeleton() {
  return (
    <ThemedVStack className="flex-1">
      {/* ZonesControls skeleton */}
      <ThemedBox className="p-2 gap-2 border-b border-outline-50">
        {/* SearchPanel skeleton */}
        <ThemedBox className="flex-row items-center rounded-lg border border-outline-50 bg-background-0 px-3 gap-2">
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ height: 20, width: 20 }}
          />
          <ThemedBox
            className="flex-1 rounded bg-secondary-300"
            style={{ height: 48 }}
          />
        </ThemedBox>

        {/* Sort controls skeleton */}
        <ThemedHStack className="items-center justify-between gap-2">
          <ThemedBox className="flex-1 flex-row items-center gap-2 border border-outline-50 rounded-lg p-3 bg-background-0">
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ height: 20, width: 20 }}
            />
            <ThemedBox
              className="flex-1 rounded bg-secondary-300"
              style={{ height: 16 }}
            />
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ height: 20, width: 20 }}
            />
          </ThemedBox>
          <ThemedBox className="border border-outline-50 rounded-lg bg-background-0 px-3 py-2">
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ height: 20, width: 20 }}
            />
          </ThemedBox>
        </ThemedHStack>
      </ThemedBox>

      {/* List skeleton */}
      <ThemedVStack className="flex-1 p-2 gap-2">
        {Array.from({ length: 10 }, (_, index) => index).map((index) => (
          <ZoneCardSkeleton key={index} />
        ))}
      </ThemedVStack>

      {/* Pagination skeleton (reserve space to avoid layout shift) */}
      <ThemedBox className="p-4 border-t border-outline-50">
        <ThemedHStack className="items-center justify-between gap-2">
          <ThemedBox className="flex-1 rounded-lg bg-secondary-300" style={{ height: 40 }} />
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 120 }} />
          <ThemedBox className="flex-1 rounded-lg bg-secondary-300" style={{ height: 40 }} />
        </ThemedHStack>
      </ThemedBox>
    </ThemedVStack>
  );
}

