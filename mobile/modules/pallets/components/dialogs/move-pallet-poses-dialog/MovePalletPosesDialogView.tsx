import {
  Modal,
  Pressable,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { IPallet } from "@/modules/pallets/api/types";
import { MovePalletPosesForm } from "../../dialogs/move-pallet-poses-form/MovePalletPosesForm";

interface MovePalletPosesDialogViewProps {
  pallet: IPallet;
  visible: boolean;
  onClose: () => void;
  onSubmit: (targetPalletId: string) => Promise<void>;
  isSourceEmpty: boolean;
  mutationError: string | null;
  isMoving: boolean;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export function MovePalletPosesDialogView({
  pallet,
  visible,
  onClose,
  onSubmit,
  isSourceEmpty,
  mutationError,
  isMoving,
  bgColor,
  textColor,
  borderColor,
}: MovePalletPosesDialogViewProps) {
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
                Перемістити позиції
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
              {mutationError && (
                <View className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
                  <ThemedText type="default" style={{ color: "#ef4444" }}>
                    {mutationError}
                  </ThemedText>
                </View>
              )}

              {isSourceEmpty ? (
                <ThemedText type="default" className="text-sm mb-4">
                  На цій паллеті немає позицій для переміщення
                </ThemedText>
              ) : (
                <MovePalletPosesForm
                  fromPallet={pallet}
                  onSuccess={onSubmit}
                  isSubmitting={isMoving}
                  onCancel={onClose}
                />
              )}
            </ScrollView>
          </ThemedView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

