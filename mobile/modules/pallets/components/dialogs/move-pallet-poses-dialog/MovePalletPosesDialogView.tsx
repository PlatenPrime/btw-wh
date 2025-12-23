import { TouchableOpacity, View, Platform } from "react-native";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
} from "@/components/ui/modal-native";
import { Icon } from "@/components/ui/icon";
import { ThemedText } from "@/components/themed-text";
import type { IPallet } from "@/modules/pallets/api/types";
import { MovePalletPosesForm } from "../../dialogs/move-pallet-poses-form/MovePalletPosesForm";
import { SemanticColors } from "@/constants/theme";

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
    <Modal isOpen={visible} onClose={onClose} className="items-center justify-center">
      <ModalBackdrop
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: SemanticColors.shadow.backdrop }}
      />
      <ModalContent
        className="w-full max-w-md mx-4 rounded-lg p-6 border gap-4"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          ...Platform.select({
            ios: {
              shadowColor: SemanticColors.shadow.color,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            },
            android: {
              elevation: 8,
            },
          }),
        }}
      >
        <ModalHeader className="flex-col gap-2">
          <View className="flex-row items-center justify-between relative">
            <ThemedText type="defaultSemiBold" className="text-lg text-center flex-1">
              Перемістити позиції
            </ThemedText>
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-4 right-4"
              activeOpacity={0.7}
              style={{ opacity: 0.7 }}
            >
              <Icon family="MaterialIcons" name="close" size={16} color={textColor} />
            </TouchableOpacity>
          </View>
        </ModalHeader>
        <ModalBody>
          {mutationError && (
            <Box className="mb-4 p-3 rounded-lg border border-error-500 bg-error-50">
              <ThemedText type="default" className="text-error-700">
                {mutationError}
              </ThemedText>
            </Box>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

