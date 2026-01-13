import { ArtImageModal } from "@/components/shared/art-image-modal/ArtImageModal";
import { ThemedText } from "@/components/themed/themed-text";
import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";

interface ArtsGridCardViewProps {
  artikul: string;
  nameukr: string;
  onPress: () => void;
  imageUrl: string;
  bgColor: string;
  borderColor: string;
  isModalVisible: boolean;
  onImagePress: () => void;
  onCloseModal: () => void;
}

export function ArtsGridCardView({
  artikul,
  nameukr,
  onPress,
  imageUrl,
  bgColor,
  borderColor,
  isModalVisible,
  onImagePress,
  onCloseModal,
}: ArtsGridCardViewProps) {
  return (
    <>
      <View
        className="flex-row items-center p-2 rounded-lg border"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
      >
        <TouchableOpacity onPress={onImagePress} activeOpacity={0.7}>
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
          <ThemedText type="default" className="text-sm text-typography-700" numberOfLines={2}>
            {nameukr}
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ArtImageModal
        artikul={artikul}
        visible={isModalVisible}
        onClose={onCloseModal}
      />
    </>
  );
}
