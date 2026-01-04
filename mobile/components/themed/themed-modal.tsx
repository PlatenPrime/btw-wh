'use client';
import React from 'react';
import {
  Modal as RNModal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedPressable } from './themed-pressable';
import { ThemedScrollView } from './themed-scroll-view';
import type {
  ModalProps,
  ModalBackdropProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseButtonProps,
  ModalContextType,
} from '@/components/types/modal';

const ModalContext = React.createContext<ModalContextType | null>(null);

export type ThemedModalProps = ModalProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedModal({ 
  isOpen, 
  onClose, 
  children, 
  className,
  lightColor,
  darkColor,
}: ThemedModalProps) {
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

export type ThemedModalBackdropProps = ModalBackdropProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedModalBackdrop({ 
  onPress, 
  className, 
  style, 
  children,
  lightColor,
  darkColor,
}: ThemedModalBackdropProps) {
  const context = React.useContext(ModalContext);
  const handlePress = onPress || context?.onClose || (() => {});

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <ThemedView
        lightColor={lightColor}
        darkColor={darkColor}
        className={`absolute left-0 top-0 right-0 bottom-0 ${className || ''}`}
        style={style}
      >
        {children}
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

export type ThemedModalContentProps = ModalContentProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedModalContent({ 
  className, 
  style, 
  children, 
  lightColor,
  darkColor,
  ...viewProps 
}: ThemedModalContentProps) {
  return (
    <TouchableWithoutFeedback>
      <ThemedView
        lightColor={lightColor}
        darkColor={darkColor}
        className={`bg-background-0 rounded-md overflow-hidden border border-outline-100 shadow-hard-2 p-6 ${className || ''}`}
        style={style}
        {...viewProps}
      >
        {children}
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

export type ThemedModalHeaderProps = ModalHeaderProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedModalHeader({ 
  className, 
  children,
  lightColor,
  darkColor,
}: ThemedModalHeaderProps) {
  return (
    <ThemedView 
      lightColor={lightColor}
      darkColor={darkColor}
      className={`justify-between items-center flex-row ${className || ''}`}
    >
      {children}
    </ThemedView>
  );
}

export type ThemedModalBodyProps = ModalBodyProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedModalBody({ 
  className, 
  children, 
  scrollable = true,
  lightColor,
  darkColor,
}: ThemedModalBodyProps) {
  if (!scrollable) {
    return (
      <ThemedView 
        lightColor={lightColor}
        darkColor={darkColor}
        className={`mt-2 mb-6 ${className || ''}`}
      >
        {children}
      </ThemedView>
    );
  }

  return (
    <ThemedScrollView
      lightColor={lightColor}
      darkColor={darkColor}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
      className={`mt-2 mb-6 ${className || ''}`}
    >
      {children}
    </ThemedScrollView>
  );
}

export type ThemedModalFooterProps = ModalFooterProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedModalFooter({ 
  className, 
  children,
  lightColor,
  darkColor,
}: ThemedModalFooterProps) {
  return (
    <ThemedView 
      lightColor={lightColor}
      darkColor={darkColor}
      className={`flex-row justify-end items-center gap-2 ${className || ''}`}
    >
      {children}
    </ThemedView>
  );
}

export type ThemedModalCloseButtonProps = ModalCloseButtonProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedModalCloseButton({ 
  onPress, 
  className, 
  children,
  lightColor,
  darkColor,
}: ThemedModalCloseButtonProps) {
  const context = React.useContext(ModalContext);
  const handlePress = onPress || context?.onClose || (() => {});

  return (
    <ThemedPressable
      lightColor={lightColor}
      darkColor={darkColor}
      onPress={handlePress}
      className={`z-10 rounded ${className || ''}`}
    >
      {children}
    </ThemedPressable>
  );
}

ThemedModal.displayName = 'ThemedModal';
ThemedModalBackdrop.displayName = 'ThemedModalBackdrop';
ThemedModalContent.displayName = 'ThemedModalContent';
ThemedModalHeader.displayName = 'ThemedModalHeader';
ThemedModalBody.displayName = 'ThemedModalBody';
ThemedModalFooter.displayName = 'ThemedModalFooter';
ThemedModalCloseButton.displayName = 'ThemedModalCloseButton';

