import { GlassCard } from "@/components/shared/glass-card";
import { ThemedText } from "@/components/themed/themed-text";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskStatusBadge } from "@/modules/asks/components/elements/ask-status-badge/AskStatusBadge";
import { formatDateTime } from "@/modules/asks/utils/format-date";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";

interface AsksByArtikulCardViewProps {
  ask: AskDto;
}

export function AsksByArtikulCardView({ ask }: AsksByArtikulCardViewProps) {
  const router = useRouter();
  const formattedDate = formatDateTime(ask.createdAt);

  const handlePress = () => {
    router.push(`/(tabs)/refiling/asks/${ask._id}` as any);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <GlassCard className="p-4">
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
      </GlassCard>
    </TouchableOpacity>
  );
}
