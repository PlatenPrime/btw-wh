import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/themed/themed-view";
import { ThemedText } from "@/components/themed/themed-text";
import { useThemeValue } from "@/hooks/use-theme-value";
import { cn } from "@/lib/utils";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskStatusBadge } from "@/modules/asks/components/elements/ask-status-badge/AskStatusBadge";
import { Image } from "expo-image";
import { formatDateTime } from "@/modules/asks/utils/format-date";

interface AsksByArtikulCardViewProps {
  ask: AskDto;
}

export function AsksByArtikulCardView({
  ask,
}: AsksByArtikulCardViewProps) {
  const router = useRouter();
  const theme = useThemeValue();
  const formattedDate = formatDateTime(ask.createdAt);

  const handlePress = () => {
    router.push(`/(tabs)/refiling/asks/${ask._id}` as any);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <ThemedView
        className={cn(
          "p-3 rounded-lg border bg-background-0",
          theme === "dark" ? "border-outline-50" : "border-outline-100"
        )}
      >
        <View className="flex-row items-start justify-between gap-2">
          <View className="flex-1 gap-2">
            <ThemedText className="text-sm opacity-70">
              {formattedDate}
            </ThemedText>
            {ask.askerData && (
              <View className="flex-row items-center gap-2">
                {ask.askerData.photo ? (
                  <Image
                    source={{ uri: ask.askerData.photo }}
                    style={{ width: 20, height: 20, borderRadius: 10 }}
                  />
                ) : null}
                <ThemedText className="text-sm">
                  {ask.askerData.fullname}
                </ThemedText>
              </View>
            )}
          </View>

          <View style={{ alignSelf: "flex-start" }}>
            <AskStatusBadge status={ask.status} />
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}
