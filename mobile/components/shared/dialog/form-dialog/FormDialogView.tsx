import { ThemedText } from "@/components/themed/themed-text";
import {
  ThemedModal,
  ThemedModalBackdrop,
  ThemedModalContent,
  ThemedModalHeader,
  ThemedModalBody,
  ThemedModalFooter,
  ThemedIcon,
} from "@/components/themed";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "@/hooks/use-theme-colors";

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
  const { static: staticColors } = useThemeColors();
  
  return (
    <ThemedModal isOpen={visible} onClose={onClose} className="items-center justify-center">
      <ThemedModalBackdrop
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: staticColors.shadow.backdrop }}
      />
      <ThemedModalContent
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
        <ThemedModalHeader className="flex-col gap-2">
          <View className="flex-row items-center justify-between relative">
            <ThemedText type="defaultSemiBold" className="text-lg text-center flex-1">
              {title}
            </ThemedText>
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-4 right-4"
              activeOpacity={0.7}
              style={{ opacity: 0.7 }}
            >
              <ThemedIcon family="MaterialIcons" name="close" size={16} color={textColor} />
            </TouchableOpacity>
          </View>
        </ThemedModalHeader>
        <ThemedModalBody>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={true}>
            {children}
          </ScrollView>
        </ThemedModalBody>
        {footer && (
          <ThemedModalFooter>
            {footer}
          </ThemedModalFooter>
        )}
      </ThemedModalContent>
    </ThemedModal>
  );
}

