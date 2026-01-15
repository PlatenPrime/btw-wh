import { ThemedText } from "@/components/themed/themed-text";
import {
  ThemedModal,
  ThemedModalBackdrop,
  ThemedModalBody,
  ThemedModalCloseButton,
  ThemedModalContent,
  ThemedModalHeader,
  ThemedHStack,
  ThemedVStack,
  ThemedPressable,
  ThemedIcon,
} from "@/components/themed";
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

  const handleThemeSelect = useCallback(
    (selectedTheme: "light" | "dark" | "system") => {
      setTheme(selectedTheme);
      setIsModalVisible(false);
    },
    [setTheme]
  );

  const handleOpenModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleLayout = useCallback(
    (e: { nativeEvent: { layout: { height: number } } }) => {
      setContentHeight(e.nativeEvent.layout.height);
    },
    []
  );

  return (
    <>
      <ThemedPressable
        onPress={handleOpenModal}
        className="flex-row items-center justify-between p-4 rounded-lg border border-outline-50 bg-background-0"
      >
        <ThemedHStack className="items-center gap-3">
          <ThemedIcon
            family="MaterialIcons"
            name={iconName}
            size={24}
            color={iconColor}
          />
          <ThemedText type="defaultSemiBold">Тема</ThemedText>
        </ThemedHStack>
        <ThemedIcon
          family="MaterialIcons"
          name="chevron-right"
          size={24}
          color={iconColor}
        />
      </ThemedPressable>

      <ThemedModal isOpen={isModalVisible} onClose={handleCloseModal}>
        <ThemedModalBackdrop />
        <ThemedModalContent
          className="rounded-lg p-4 w-[280px] bg-background-0 border border-outline-50"
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
          <ThemedModalHeader>
            <ThemedHStack className="items-center justify-between w-full">
              <ThemedText type="subtitle" className="text-lg">
                Виберіть тему
              </ThemedText>
              <ThemedModalCloseButton onPress={handleCloseModal}>
                <ThemedIcon
                  family="Ionicons"
                  name="close"
                  size={24}
                  color={iconColor}
                />
              </ThemedModalCloseButton>
            </ThemedHStack>
          </ThemedModalHeader>
          <ThemedModalBody>
            <ThemedVStack className="gap-2">
              {themeOptions.map((option) => {
                const isSelected = theme === option.value;
                return (
                  <ThemedPressable
                    key={option.value}
                    onPress={() => handleThemeSelect(option.value)}
                    className={`flex-row items-center gap-3 p-3 rounded-lg ${
                      isSelected ? "bg-background-200" : "bg-background-50"
                    }`}
                  >
                    <ThemedIcon
                      family="MaterialIcons"
                      name={option.icon}
                      size={22}
                      color={iconColor}
                    />
                    <ThemedText type="default" className="flex-1">
                      {option.label}
                    </ThemedText>
                    {isSelected && (
                      <ThemedIcon
                        family="MaterialIcons"
                        name="check"
                        size={22}
                        color={iconColor}
                      />
                    )}
                  </ThemedPressable>
                );
              })}
            </ThemedVStack>
          </ThemedModalBody>
        </ThemedModalContent>
      </ThemedModal>
    </>
  );
});
