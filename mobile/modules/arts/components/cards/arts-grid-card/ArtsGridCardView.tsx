import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getSmallImageUrl } from "@/modules/arts/constants/art-image-url";

interface ArtsGridCardViewProps {
  artikul: string;
  nameukr: string;
  onPress: () => void;
}

export function ArtsGridCardView({
  artikul,
  nameukr,
  onPress,
}: ArtsGridCardViewProps) {
  const colorScheme = useColorScheme() ?? "light";
  const imageUrl = getSmallImageUrl(artikul);

  const bgColor =
    colorScheme === "light" ? "#fff" : "#1f2937";
  const borderColor =
    colorScheme === "light" ? "#d1d5db" : "#4b5563";

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        className="flex-row items-center p-3 rounded-lg border"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 60, height: 60, borderRadius: 8 }}
          contentFit="cover"
          placeholder={{ blurhash: "LGF5]+Yk^6#M@-5c,1J5@[or[Q6." }}
          transition={200}
        />
        <View className="ml-3 flex-1">
          <ThemedText type="defaultSemiBold" className="text-base mb-1">
            {artikul}
          </ThemedText>
          <ThemedText type="default" className="text-sm" numberOfLines={2}>
            {nameukr}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
