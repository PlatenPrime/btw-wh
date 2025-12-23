import { Modal, Pressable, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Icon } from "@/components/ui/icon";
import { getBigImageUrl } from "@/modules/arts/constants/art-image-url";
import { SemanticColors } from "@/constants/theme";

interface ArtImageModalProps {
  artikul: string;
  visible: boolean;
  onClose: () => void;
}

/**
 * Модальное окно с полноразмерным изображением артикула.
 * Открывается при клике на превью изображение в карточке.
 */
export function ArtImageModal({
  artikul,
  visible,
  onClose,
}: ArtImageModalProps) {
  const imageUrl = getBigImageUrl(artikul);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: SemanticColors.shadow.backdropDark }}
        onPress={onClose}
      >
        <Pressable
          className="w-full h-full justify-center items-center p-4"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="relative w-full max-w-md">
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-2 right-2 z-10 p-2 rounded-full"
              style={{ backgroundColor: SemanticColors.shadow.backdrop }}
              activeOpacity={0.7}
            >
              <Icon family="MaterialIcons" name="close" size={24} color={SemanticColors.white} />
            </TouchableOpacity>

            <Image
              source={{ uri: imageUrl }}
              style={{ width: "100%", aspectRatio: 1, borderRadius: 12 }}
              contentFit="contain"
              placeholder={{ blurhash: "LGF5]+Yk^6#M@-5c,1J5@[or[Q6." }}
              transition={200}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

