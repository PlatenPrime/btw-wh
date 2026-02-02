import type { ViewProps, ViewStyle } from "react-native";

export interface ModalContextType {
  onClose: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface ModalBackdropProps {
  onPress?: () => void;
  className?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export interface ModalContentProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

export interface ModalHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export interface ModalBodyProps {
  className?: string;
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
}

export interface ModalFooterProps {
  className?: string;
  children: React.ReactNode;
}

export interface ModalCloseButtonProps {
  onPress?: () => void;
  className?: string;
  children?: React.ReactNode;
}
