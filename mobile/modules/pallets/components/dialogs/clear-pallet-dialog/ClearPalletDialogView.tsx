import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { DialogDescription } from "@/components/shared/dialog-description/DialogDescription";
import { ThemedText } from "@/components/themed-text";
import { Icon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal-native";
import { SemanticColors } from "@/constants/theme";
import type { IPallet } from "@/modules/pallets/api/types";
import { Platform, TouchableOpacity, View } from "react-native";

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
      isOpen={visible}
      onClose={onClose}
      className="items-center justify-center"
    >
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
            <ThemedText
              type="defaultSemiBold"
              className="text-lg text-center flex-1"
            >
              Видалити всі позиції палети &quot;{pallet.title}&quot;?
            </ThemedText>
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-4 right-4"
              activeOpacity={0.7}
              style={{ opacity: 0.7 }}
            >
              <Icon
                family="MaterialIcons"
                name="close"
                size={16}
                color={textColor}
              />
            </TouchableOpacity>
          </View>
          <DialogDescription>
            Ви впевнені, що хочете видалити всі позиції палети &quot;{pallet.title}&quot;? Цю дію
            неможливо скасувати, вона також призведе до видалення всіх
            пов&apos;язаних позицій.
          </DialogDescription>
        </ModalHeader>
        <ModalFooter className="flex-col-reverse gap-2">
          <DialogActions
            onCancel={onClose}
            onSubmit={onClear}
            cancelText="Скасувати"
            submitText="Видалити"
            isSubmitting={isClearing}
            variant="destructive"
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
