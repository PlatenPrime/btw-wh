import {
  ThemedIcon,
  ThemedModal,
  ThemedModalBackdrop,
  ThemedModalBody,
  ThemedModalContent,
  ThemedModalFooter,
  ThemedModalHeader,
} from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { SemanticColors } from "@/constants/theme";
import { Platform, TouchableOpacity, View } from "react-native";

interface FormDialogViewProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export function FormDialogView({
  visible,
  onClose,
  title,
  children,
  footer,
  bgColor,
  textColor,
  borderColor,
}: FormDialogViewProps) {
  return (
    <ThemedModal
      isOpen={visible}
      onClose={onClose}
      className="items-center justify-center"
    >
      <ThemedModalBackdrop
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: SemanticColors.shadow.backdrop }}
      />
      <ThemedModalContent
        className="w-full max-w-md mx-4 rounded-lg p-6 border gap-4"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          height: "90%",
          maxHeight: "90%",
          minWidth: 280,
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
        <ThemedModalHeader className="flex-col gap-2 shrink-0">
          <View className="flex-row items-center justify-between relative">
            <ThemedText
              type="defaultSemiBold"
              className="text-lg text-center flex-1"
            >
              {title}
            </ThemedText>
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-4 right-4"
              activeOpacity={0.7}
              style={{ opacity: 0.7 }}
            >
              <ThemedIcon
                family="MaterialIcons"
                name="close"
                size={16}
                lightColor={textColor}
                darkColor={textColor}
              />
            </TouchableOpacity>
          </View>
        </ThemedModalHeader>
        <ThemedModalBody className="flex-1 min-h-0">
          {children}
        </ThemedModalBody>
        {footer && <ThemedModalFooter>{footer}</ThemedModalFooter>}
      </ThemedModalContent>
    </ThemedModal>
  );
}
