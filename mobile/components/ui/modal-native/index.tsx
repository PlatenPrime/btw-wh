'use client';
import React from 'react';
import {
  Modal as RNModal,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import type { ViewStyle, ViewProps } from 'react-native';

interface ModalContextType {
  onClose: () => void;
}

const ModalContext = React.createContext<ModalContextType | null>(null);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

interface ModalBackdropProps {
  onPress?: () => void;
  className?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
}

interface ModalContentProps {
  className?: string;
  style?: ViewStyle;
  children: React.ReactNode;
}

interface ModalHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface ModalBodyProps {
  className?: string;
  children: React.ReactNode;
}

interface ModalFooterProps {
  className?: string;
  children: React.ReactNode;
}

interface ModalCloseButtonProps {
  onPress?: () => void;
  className?: string;
  children?: React.ReactNode;
}

function Modal({ isOpen, onClose, children, className }: ModalProps) {
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <ModalContext.Provider value={{ onClose }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className={`flex-1 justify-center items-center ${className || ''}`}
        >
          {children}
        </KeyboardAvoidingView>
      </ModalContext.Provider>
    </RNModal>
  );
}

function ModalBackdrop({ onPress, className, style, children }: ModalBackdropProps) {
  const context = React.useContext(ModalContext);
  const handlePress = onPress || context?.onClose || (() => {});

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        className={`absolute left-0 top-0 right-0 bottom-0 ${className || ''}`}
        style={style}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

function ModalContent({ className, style, children }: ModalContentProps) {
  return (
    <TouchableWithoutFeedback>
      <View
        className={`bg-background-0 rounded-md overflow-hidden border border-outline-100 shadow-hard-2 p-6 ${className || ''}`}
        style={style}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

function ModalHeader({ className, children }: ModalHeaderProps) {
  return (
    <View className={`justify-between items-center flex-row ${className || ''}`}>
      {children}
    </View>
  );
}

function ModalBody({ className, children }: ModalBodyProps) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
      className={`mt-2 mb-6 ${className || ''}`}
    >
      {children}
    </ScrollView>
  );
}

function ModalFooter({ className, children }: ModalFooterProps) {
  return (
    <View className={`flex-row justify-end items-center gap-2 ${className || ''}`}>
      {children}
    </View>
  );
}

function ModalCloseButton({ onPress, className, children }: ModalCloseButtonProps) {
  const context = React.useContext(ModalContext);
  const handlePress = onPress || context?.onClose || (() => {});

  return (
    <Pressable
      onPress={handlePress}
      className={`z-10 rounded ${className || ''}`}
    >
      {children}
    </Pressable>
  );
}

Modal.displayName = 'Modal';
ModalBackdrop.displayName = 'ModalBackdrop';
ModalContent.displayName = 'ModalContent';
ModalHeader.displayName = 'ModalHeader';
ModalBody.displayName = 'ModalBody';
ModalFooter.displayName = 'ModalFooter';
ModalCloseButton.displayName = 'ModalCloseButton';

export {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
};

