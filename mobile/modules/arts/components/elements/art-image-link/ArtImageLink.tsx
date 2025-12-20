import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Image } from "expo-image";
import { ArtImageModal } from "@/modules/arts/components/dialogs/art-image-modal/ArtImageModal";
import { getSmallImageUrl } from "@/modules/arts/constants/art-image-url";
import type { ArtDto } from "@/modules/arts/api/types/dto";

interface ArtImageLinkProps {
  artikul: ArtDto["artikul"];
  nameukr?: ArtDto["nameukr"];
}

export function ArtImageLink({ artikul, nameukr }: ArtImageLinkProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const imageUrl = getSmallImageUrl(artikul);

  const handleImagePress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <View className="flex-row items-start gap-3">
        <TouchableOpacity onPress={handleImagePress} activeOpacity={0.7}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 60, height: 60, borderRadius: 8 }}
            contentFit="cover"
            placeholder={{ blurhash: "LGF5]+Yk^6#M@-5c,1J5@[or[Q6." }}
            transition={200}
          />
        </TouchableOpacity>
        <View className="flex-1 justify-between">
          <ThemedText type="defaultSemiBold" className="text-sm mb-1">
            {artikul}
          </ThemedText>
          <ThemedText type="default" className="text-xs opacity-70">
            {nameukr ? nameukr.slice(10) : artikul}
          </ThemedText>
        </View>
      </View>

      <ArtImageModal
        artikul={artikul}
        visible={isModalVisible}
        onClose={handleCloseModal}
      />
    </>
  );
}

