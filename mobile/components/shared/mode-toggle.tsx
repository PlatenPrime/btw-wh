import { ThemedText } from "@/components/themed-text";
import {
  HStack,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Pressable,
  VStack,
} from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { useIconColor } from "@/hooks/use-icon-color";
import { useTheme } from "@/providers/theme-provider";
import React, { useCallback, useMemo, useState } from "react";

type ThemeOption = {
  value: "light" | "dark" | "system";
  label: string;
  icon: string;
};

const themeOptions: ThemeOption[] = [
  { value: "light", label: "Світла", icon: "wb-sunny" },
  { value: "dark", label: "Темна", icon: "dark-mode" },
  { value: "system", label: "Системна", icon: "settings-brightness" },
];

export const ModeToggle = React.memo(function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const iconColor = useIconColor();

  const iconName = useMemo(() => {
    if (theme === "system") {
      return "settings-brightness";
    }
    return theme === "dark" ? "dark-mode" : "wb-sunny";
  }, [theme]);

  const handleThemeSelect = useCallback((selectedTheme: "light" | "dark" | "system") => {
    setTheme(selectedTheme);
    setIsModalVisible(false);
  }, [setTheme]);

  const handleOpenModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleLayout = useCallback((e: { nativeEvent: { layout: { height: number } } }) => {
    setContentHeight(e.nativeEvent.layout.height);
  }, []);

  return (
    <>
      <Pressable
        onPress={handleOpenModal}
        className="flex-row items-center justify-between p-4 rounded-lg border border-outline-100 bg-background-0"
      >
        <HStack className="items-center gap-3">
          <Icon
            family="MaterialIcons"
            name={iconName}
            size={24}
            color={iconColor}
          />
          <ThemedText type="defaultSemiBold">Тема</ThemedText>
        </HStack>
        <Icon
          family="MaterialIcons"
          name="chevron-right"
          size={24}
          color={iconColor}
        />
      </Pressable>

      <Modal isOpen={isModalVisible} onClose={handleCloseModal}>
        <ModalBackdrop />
        <ModalContent
          className="rounded-lg p-4 w-[280px] bg-background-0 border border-outline-100"
          onLayout={handleLayout}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: [
              { translateX: -140 },
              { translateY: contentHeight > 0 ? -contentHeight / 2 : -50 },
            ],
          }}
        >
          <ModalHeader>
            <HStack className="items-center justify-between">
              <ThemedText type="subtitle" className="text-lg">
                Виберіть тему
              </ThemedText>
              <ModalCloseButton onPress={handleCloseModal}>
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
            <VStack className="gap-2">
              {themeOptions.map((option) => {
                const isSelected = theme === option.value;
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => handleThemeSelect(option.value)}
                    className={`flex-row items-center gap-3 p-3 rounded-lg ${
                      isSelected ? "bg-background-200" : "bg-background-50"
                    }`}
                  >
                    <Icon
                      family="MaterialIcons"
                      name={option.icon}
                      size={22}
                      color={iconColor}
                    />
                    <ThemedText type="default" className="flex-1">
                      {option.label}
                    </ThemedText>
                    {isSelected && (
                      <Icon
                        family="MaterialIcons"
                        name="check"
                        size={22}
                        color={iconColor}
                      />
                    )}
                  </Pressable>
                );
              })}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
