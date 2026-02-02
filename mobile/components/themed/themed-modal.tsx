"use client";
import type {
  ModalBackdropProps,
  ModalBodyProps,
  ModalCloseButtonProps,
  ModalContentProps,
  ModalContextType,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from "@/components/types/modal";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
import { BlurView } from "expo-blur";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Modal as RNModal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { ThemedPressable } from "./themed-pressable";
import { ThemedScrollView } from "./themed-scroll-view";
import { ThemedView } from "./themed-view";

const ModalContext = React.createContext<ModalContextType | null>(null);

export type ThemedModalProps = ModalProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
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
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className={cn("flex-1 justify-center items-center", className)}
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
        className={cn("absolute left-0 top-0 right-0 bottom-0", className)}
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
  glass?: boolean;
};

export function ThemedModalContent({
  className,
  style,
  children,
  lightColor,
  darkColor,
  glass = false,
  ...viewProps
}: ThemedModalContentProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const tint = isDark ? "dark" : "light";

  const baseClassName = cn(
    "rounded-2xl overflow-hidden border border-outline-100/80 shadow-hard-2 p-6",
    className
  );

  if (glass && Platform.OS !== "web") {
    return (
      <TouchableWithoutFeedback>
        <ThemedView
          className={cn(
            "flex flex-col max-w-md w-full mx-4 min-w-[280px]",
            baseClassName
          )}
          style={[{ maxHeight: "90%" }, style]}
          {...viewProps}
        >
          <BlurView
            intensity={50}
            tint={tint}
            style={StyleSheet.absoluteFill}
          />
          <ThemedView className="z-10 flex-1 flex flex-col gap-4">
            {children}
          </ThemedView>
        </ThemedView>
      </TouchableWithoutFeedback>
    );
  }

  if (glass && Platform.OS === "web") {
    return (
      <TouchableWithoutFeedback>
        <ThemedView
          lightColor={lightColor}
          darkColor={darkColor}
          className={cn(
            "flex flex-col gap-4 min-w-[280px]",
            baseClassName,
            "bg-background-0/90"
          )}
          style={[
            {
              maxHeight: "90%",
              backgroundColor: isDark
                ? "rgba(18, 18, 18, 0.9)"
                : "rgba(255, 255, 255, 0.9)",
            },
            style,
          ]}
          {...viewProps}
        >
          {children}
        </ThemedView>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback>
      <ThemedView
        lightColor={lightColor}
        darkColor={darkColor}
        className={cn(
          "flex flex-col bg-background-0 rounded-md overflow-hidden border border-outline-50 shadow-hard-2 p-6",
          className
        )}
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
      className={cn("justify-between items-center flex-row", className)}
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
  style,
  lightColor,
  darkColor,
}: ThemedModalBodyProps) {
  if (!scrollable) {
    return (
      <ThemedView
        lightColor={lightColor}
        darkColor={darkColor}
        className={cn("mt-2 mb-6", className)}
        style={style}
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
      className={cn("flex-1 min-h-0 mt-2 mb-6", className)}
      style={style}
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
      className={cn(
        "flex-row justify-end items-center gap-2 shrink-0",
        className
      )}
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
      className={cn("z-10 rounded", className)}
    >
      {children}
    </ThemedPressable>
  );
}

ThemedModal.displayName = "ThemedModal";
ThemedModalBackdrop.displayName = "ThemedModalBackdrop";
ThemedModalContent.displayName = "ThemedModalContent";
ThemedModalHeader.displayName = "ThemedModalHeader";
ThemedModalBody.displayName = "ThemedModalBody";
ThemedModalFooter.displayName = "ThemedModalFooter";
ThemedModalCloseButton.displayName = "ThemedModalCloseButton";
