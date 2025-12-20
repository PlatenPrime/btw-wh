import {
  Modal,
  Pressable,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { IPallet } from "@/modules/pallets/api/types";

interface ClearPalletDialogViewProps {
  pallet: IPallet;
  visible: boolean;
  onClose: () => void;
  onClear: () => Promise<void>;
  isClearing: boolean;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export function ClearPalletDialogView({
  pallet,
  visible,
  onClose,
  onClear,
  isClearing,
  bgColor,
  textColor,
  borderColor,
}: ClearPalletDialogViewProps) {
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
                Очистити палету "{pallet.title}"?
              </ThemedText>
              <TouchableOpacity
                onPress={onClose}
                className="p-2"
                activeOpacity={0.7}
              >
                <MaterialIcons name="close" size={24} color={textColor} />
              </TouchableOpacity>
            </View>

            <ThemedText type="default" className="mb-6 text-sm">
              Ви впевнені, що хочете очистити палету "{pallet.title}"? Цю дію
              неможливо скасувати, вона також призведе до видалення всіх
              пов'язаних позицій.
            </ThemedText>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 items-center justify-center py-3 rounded-lg border"
                style={{
                  borderColor: borderColor,
                }}
                activeOpacity={0.7}
                disabled={isClearing}
              >
                <ThemedText type="defaultSemiBold">Скасувати</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClear}
                className="flex-1 items-center justify-center py-3 rounded-lg"
                style={{
                  backgroundColor: "#ef4444",
                }}
                activeOpacity={0.7}
                disabled={isClearing}
              >
                {isClearing ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ThemedText
                    type="defaultSemiBold"
                    style={{ color: "#fff" }}
                  >
                    Очистити
                  </ThemedText>
                )}
              </TouchableOpacity>
            </View>
          </ThemedView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

