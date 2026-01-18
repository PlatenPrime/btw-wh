import { ArtImageModal } from "@/components/shared/art-image-modal/ArtImageModal";
import { ThemedView } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { useThemeValue } from "@/hooks/use-theme-value";
import { cn } from "@/lib/utils";
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
  const theme = useThemeValue();
  return (
    <>
      <ThemedView
        className={cn("flex-row items-center p-2 rounded-lg border bg-background-0", theme === "dark" ? "border-outline-50" : "border-outline-100 ")}

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
      </ThemedView>

      <ArtImageModal
        artikul={artikul}
        visible={isModalVisible}
        onClose={onCloseModal}
      />
    </>
  );
}
