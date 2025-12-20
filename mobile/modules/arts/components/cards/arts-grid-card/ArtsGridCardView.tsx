import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ArtImageModal } from "@/modules/arts/components/dialogs/art-image-modal/ArtImageModal";
import { getSmallImageUrl } from "@/modules/arts/constants/art-image-url";
import { Image } from "expo-image";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const colorScheme = useColorScheme() ?? "light";
  const imageUrl = getSmallImageUrl(artikul);

  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";

  const handleImagePress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <View
        className="flex-row items-center p-2 rounded-lg border"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
      >
        <TouchableOpacity onPress={handleImagePress} activeOpacity={0.7}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 60, height: 60, borderRadius: 8 }}
            contentFit="cover"
            placeholder={{ blurhash: "LGF5]+Yk^6#M@-5c,1J5@[or[Q6." }}
            transition={200}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          className="ml-3 flex-1"
        >
          <ThemedText type="defaultSemiBold" className="text-base mb-1">
            {artikul}
          </ThemedText>
          <ThemedText type="default" className="text-sm" numberOfLines={2}>
            {nameukr?.slice(9)}
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ArtImageModal
        artikul={artikul}
        visible={isModalVisible}
        onClose={handleCloseModal}
      />
    </>
  );
}
