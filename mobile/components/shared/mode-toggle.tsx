import React, { useState } from 'react';
import { Pressable, Text, Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalCloseButton, VStack, HStack } from '@/components/ui';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/providers/theme-provider';

type ThemeOption = {
  value: 'light' | 'dark' | 'system';
  label: string;
  icon: string;
};

const themeOptions: ThemeOption[] = [
  { value: 'light', label: 'Світла', icon: 'wb-sunny' },
  { value: 'dark', label: 'Темна', icon: 'dark-mode' },
  { value: 'system', label: 'Системна', icon: 'settings-brightness' },
];

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getIconName = (): string => {
    if (theme === 'system') {
      return 'settings-brightness';
    }
    return theme === 'dark' ? 'dark-mode' : 'wb-sunny';
  };

  const handleThemeSelect = (selectedTheme: 'light' | 'dark' | 'system') => {
    setTheme(selectedTheme);
    setIsModalVisible(false);
  };

  return (
    <>
      <Pressable
        onPress={() => setIsModalVisible(true)}
        className="flex-row items-center justify-between p-4 rounded-lg border border-outline-200 bg-background-0"
      >
        <HStack className="items-center gap-3">
          <Icon family="MaterialIcons" name={getIconName()} size={24} color="#1f2937" />
          <Text className="text-base font-semibold text-typography-900">
            Тема
          </Text>
        </HStack>
        <Icon family="MaterialIcons" name="chevron-right" size={24} color="#1f2937" />
      </Pressable>

      <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <ModalBackdrop />
        <ModalContent className="rounded-lg p-4 w-[280px] bg-background-0 border border-outline-200">
          <ModalHeader>
            <HStack className="items-center justify-between">
              <Text className="text-lg font-bold text-typography-900">
                Виберіть тему
              </Text>
              <ModalCloseButton onPress={() => setIsModalVisible(false)}>
                <Icon family="Ionicons" name="close" size={24} color="#1f2937" />
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
                      isSelected ? 'bg-background-200' : 'bg-background-50'
                    }`}
                  >
                    <Icon
                      family="MaterialIcons"
                      name={option.icon}
                      size={22}
                      color="#1f2937"
                    />
                    <Text className="flex-1 text-base text-typography-900">
                      {option.label}
                    </Text>
                    {isSelected && (
                      <Icon family="MaterialIcons" name="check" size={22} color="#1f2937" />
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
}

