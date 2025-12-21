import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  HStack,
} from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { IPallet } from "@/modules/pallets/api/types";
import { MovePalletPosesForm } from "../../dialogs/move-pallet-poses-form/MovePalletPosesForm";
import { useIconColor } from "@/hooks/use-icon-color";

interface MovePalletPosesDialogViewProps {
  pallet: IPallet;
  visible: boolean;
  onClose: () => void;
  onSubmit: (targetPalletId: string) => Promise<void>;
  isSourceEmpty: boolean;
  mutationError: string | null;
  isMoving: boolean;
}

export function MovePalletPosesDialogView({
  pallet,
  visible,
  onClose,
  onSubmit,
  isSourceEmpty,
  mutationError,
  isMoving,
}: MovePalletPosesDialogViewProps) {
  const iconColor = useIconColor();
  
  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent className="w-full max-w-md mx-4 rounded-xl border border-outline-200 bg-background-0">
        <ModalHeader>
          <HStack className="items-center justify-between">
            <ThemedText type="defaultSemiBold" className="text-lg">
              Перемістити позиції
            </ThemedText>
            <ModalCloseButton onPress={onClose}>
              <Icon 
                family="Ionicons" 
                name="close" 
                size={24} 
                color={iconColor}
              />
            </ModalCloseButton>
          </HStack>
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

