import { createModal } from "@gluestack-ui/core/modal/creator";
import { Pressable, Modal as RNModal, View, ScrollView } from "react-native";
import type { ScrollViewProps } from "react-native";

export const Modal = createModal({
  Root: RNModal,
  Backdrop: Pressable,
  Content: View,
  CloseButton: Pressable,
  Header: View,
  Body: View, // Changed from ScrollView to View to avoid nesting VirtualizedLists
  Footer: View,
});

export const ModalBackdrop = Modal.Backdrop;
export const ModalContent = Modal.Content;
export const ModalCloseButton = Modal.CloseButton;
export const ModalHeader = Modal.Header;
export const ModalBody = Modal.Body;
export const ModalFooter = Modal.Footer;

/**
 * Скроллируемый ModalBody для использования в диалогах с формами
 * Оборачивает контент в ScrollView для поддержки скролла при большом количестве инпутов
 */
export function ScrollableModalBody({
  children,
  className,
  ...props
}: ScrollViewProps & { className?: string }) {
  return (
    <ScrollView
      className={className}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

export type ModalProps = React.ComponentProps<typeof Modal>;
export type ModalBackdropProps = React.ComponentProps<typeof ModalBackdrop>;
export type ModalContentProps = React.ComponentProps<typeof ModalContent>;
export type ModalCloseButtonProps = React.ComponentProps<
  typeof ModalCloseButton
>;
export type ModalHeaderProps = React.ComponentProps<typeof ModalHeader>;
export type ModalBodyProps = React.ComponentProps<typeof ModalBody>;
export type ModalFooterProps = React.ComponentProps<typeof ModalFooter>;
