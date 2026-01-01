import { ThemedText } from "@/components/themed-text";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal-native";
import { Icon } from "@/components/ui/icon";
import { AskPosEditForm } from "@/modules/asks/components/forms/ask-pos-edit-form/AskPosEditForm";
import type { PosResponse } from "@/modules/poses/api/types";
import { TouchableOpacity, View, Platform } from "react-native";
import { useThemeColors } from "@/hooks/use-theme-colors";

interface AskPosEditDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pos: PosResponse;
  askId: string;
  trigger?: React.ReactNode;
  onSuccess: () => void;
  onCancel: () => void;
  initialRemovedQuant?: number;
}

export function AskPosEditDialogView({
  open,
  setOpen,
  pos,
  askId,
  trigger,
  onSuccess,
  onCancel,
  initialRemovedQuant,
}: AskPosEditDialogViewProps) {
  const { dialog, text, static: staticColors } = useThemeColors();
  const bgColor = dialog.bg;
  const textColor = text.primary;
  const borderColor = dialog.border;

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} className="items-center justify-center">
      <ModalBackdrop
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: staticColors.shadow.backdrop }}
      />
      <ModalContent
        className="w-full max-w-md mx-4 rounded-lg p-6 border gap-4"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          maxHeight: "90%",
          ...Platform.select({
            ios: {
              shadowColor: staticColors.shadow.color,
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
              {pos.data?.palletData?.title}
            </ThemedText>
            <TouchableOpacity
              onPress={onCancel}
              className="absolute top-0 right-0 p-1"
              activeOpacity={0.7}
              style={{ opacity: 0.7 }}
            >
              <Icon family="MaterialIcons" name="close" size={16} color={textColor} />
            </TouchableOpacity>
          </View>
        </ModalHeader>
        <ModalBody>
          <AskPosEditForm
            pos={pos}
            askId={askId}
            onSuccess={onSuccess}
            onCancel={onCancel}
            initialRemovedQuant={initialRemovedQuant}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

