import { ArtImageModal } from "@/components/shared/art-image-modal/ArtImageModal";
import { GlassCard } from "@/components/shared/glass-card";
import { SharikImage } from "@/components/shared/sharik-image";
import { ThemedText } from "@/components/themed/themed-text";
import { TouchableOpacity } from "react-native";

interface ArtsGridCardViewProps {
  artikul: string;
  nameukr: string;
  onPress: () => void;
  isModalVisible: boolean;
  onImagePress: () => void;
  onCloseModal: () => void;
}

export function ArtsGridCardView({
  artikul,
  nameukr,
  onPress,
  isModalVisible,
  onImagePress,
  onCloseModal,
}: ArtsGridCardViewProps) {
  return (
    <>
      <GlassCard className="flex-row items-center p-3">
        <TouchableOpacity onPress={onImagePress} activeOpacity={0.7}>
          <SharikImage
            artikul={artikul}
            size="prev"
            style={{ width: 60, height: 60, borderRadius: 8 }}
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
