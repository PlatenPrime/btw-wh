import { ScrollView, View } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import { ThemedVStack, ThemedBox } from "@/components/themed";
import { AskDetailsCardSkeleton } from "@/modules/asks/components/cards/ask-details-card/AskDetailsCardSkeleton";
import { useThemeColors } from "@/hooks/use-theme-colors";

export function AskContainerSkeleton() {
  const { card } = useThemeColors();
  const bgColor = card.bg;
  const borderColor = card.border;

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1" contentContainerClassName="gap-4 p-4">
        <ThemedVStack className="gap-4">
          <AskDetailsCardSkeleton />
          
          {/* Skeleton для событий */}
          <ThemedView
            className="p-3 rounded-lg border"
            style={{
              backgroundColor: bgColor,
              borderColor: borderColor,
            }}
          >
            <View className="gap-3">
              <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 128 }} />
              <View className="gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <ThemedBox
                    key={index}
                    className="rounded bg-secondary-300"
                    style={{ height: 48, width: "100%" }}
                  />
                ))}
              </View>
            </View>
          </ThemedView>

          {/* Skeleton для позиций */}
          <View className="gap-2">
            <ThemedBox className="rounded bg-secondary-300" style={{ height: 20, width: 160 }} />
            {Array.from({ length: 2 }).map((_, index) => (
              <ThemedBox
                key={index}
                className="rounded-lg border bg-secondary-300"
                style={{ height: 80, width: "100%" }}
              />
            ))}
          </View>
        </ThemedVStack>
      </ScrollView>
    </ThemedView>
  );
}

