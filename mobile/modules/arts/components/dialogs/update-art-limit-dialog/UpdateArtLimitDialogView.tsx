import { View, TouchableOpacity, ScrollView, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/themed-text";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@/components/ui";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { UpdateArtLimitForm } from "@/modules/arts/components/forms/update-art-limit-form/UpdateArtLimitForm";

interface UpdateArtLimitDialogViewProps {
  artData: ArtDto;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export function UpdateArtLimitDialogView({
  artData,
  visible,
  onClose,
  onSuccess,
  bgColor,
  textColor,
  borderColor,
}: UpdateArtLimitDialogViewProps) {
  return (
    <Modal isOpen={visible} onClose={onClose} className="items-center justify-center">
      <ModalBackdrop
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      />
      <ModalContent
        className="w-full max-w-md mx-4 rounded-lg p-6 border gap-4"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
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
              Артикул: {artData.artikul}
            </ThemedText>
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-4 right-4"
              activeOpacity={0.7}
              style={{ opacity: 0.7 }}
            >
              <MaterialIcons name="close" size={16} color={textColor} />
            </TouchableOpacity>
          </View>
        </ModalHeader>
        <ModalBody>
          <ScrollView keyboardShouldPersistTaps="handled">
            <UpdateArtLimitForm
              artData={artData}
              onSuccess={onSuccess}
              onCancel={onClose}
            />
          </ScrollView>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

