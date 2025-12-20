import { Modal, Pressable, View, TouchableOpacity, ScrollView } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { UpdateArtLimitForm } from "@/modules/arts/components/forms/update-art-limit-form/UpdateArtLimitForm";

interface UpdateArtLimitDialogViewProps {
  artData: ArtDto;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UpdateArtLimitDialogView({
  artData,
  visible,
  onClose,
  onSuccess,
}: UpdateArtLimitDialogViewProps) {
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const textColor = colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onPress={onClose}
      >
        <Pressable
          className="w-full max-w-md mx-4"
          onPress={(e) => e.stopPropagation()}
        >
          <ThemedView
            className="rounded-xl p-6 border"
            style={{
              backgroundColor: bgColor,
              borderColor: borderColor,
            }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <ThemedText type="defaultSemiBold" className="text-lg">
                Артикул: {artData.artikul}
              </ThemedText>
              <TouchableOpacity
                onPress={onClose}
                className="p-2"
                activeOpacity={0.7}
              >
                <MaterialIcons name="close" size={24} color={textColor} />
              </TouchableOpacity>
            </View>

            <ScrollView keyboardShouldPersistTaps="handled">
              <UpdateArtLimitForm
                artData={artData}
                onSuccess={onSuccess}
                onCancel={onClose}
              />
            </ScrollView>
          </ThemedView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

