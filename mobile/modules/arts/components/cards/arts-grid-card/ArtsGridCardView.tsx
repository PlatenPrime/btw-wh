import { ArtImageModal } from "@/components/shared/art-image-modal/ArtImageModal";
import { GlassCard } from "@/components/shared/glass-card";
import { ThemedText } from "@/components/themed/themed-text";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";

interface ArtsGridCardViewProps {
  artikul: string;
  nameukr: string;
  onPress: () => void;
  imageUrl: string;
  isModalVisible: boolean;
  onImagePress: () => void;
  onCloseModal: () => void;
}

export function ArtsGridCardView({
  artikul,
  nameukr,
  onPress,
  imageUrl,
  isModalVisible,
  onImagePress,
  onCloseModal,
}: ArtsGridCardViewProps) {
  return (
    <>
      <GlassCard className="flex-row items-center p-3">
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
      </GlassCard>

      <ArtImageModal
        artikul={artikul}
        visible={isModalVisible}
        onClose={onCloseModal}
      />
    </>
  );
}
