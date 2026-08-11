import { SharikImage } from "@/components/shared/sharik-image";
import { ThemedIcon } from "@/components/themed";
import { SemanticColors } from "@/constants/theme";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

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
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: SemanticColors.shadow.backdropDark }}
        >
          <TouchableWithoutFeedback>
            <View className="relative w-full max-w-md p-4">
              <TouchableOpacity
                onPress={onClose}
                className="absolute top-2 right-2 z-10 p-2 rounded-full"
                style={{ backgroundColor: SemanticColors.shadow.backdrop }}
                activeOpacity={0.7}
              >
                <ThemedIcon
                  family="MaterialIcons"
                  name="close"
                  size={24}
                  lightColor={SemanticColors.white}
                  darkColor={SemanticColors.white}
                />
              </TouchableOpacity>

              <SharikImage
                artikul={artikul}
                size="big"
                style={{ width: "100%", aspectRatio: 1, borderRadius: 12 }}
                contentFit="contain"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
