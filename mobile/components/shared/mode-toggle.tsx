import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@/providers/theme-provider';
import { Colors } from '@/constants/theme';

type ThemeOption = {
  value: 'light' | 'dark' | 'system';
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const themeOptions: ThemeOption[] = [
  { value: 'light', label: 'Світла', icon: 'wb-sunny' },
  { value: 'dark', label: 'Темна', icon: 'dark-mode' },
  { value: 'system', label: 'Системна', icon: 'settings-brightness' },
];

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const currentTheme = resolvedTheme;
  const textColor = currentTheme === 'light' ? Colors.light.text : Colors.dark.text;
  const bgColor = currentTheme === 'light' ? Colors.light.background : Colors.dark.background;
  const borderColor = currentTheme === 'light' ? '#e5e7eb' : '#374151';
  const modalBgColor = currentTheme === 'light' ? '#ffffff' : '#1f2937';
  const itemBgColor = currentTheme === 'light' ? '#f9fafb' : '#374151';
  const selectedBgColor = currentTheme === 'light' ? '#e5e7eb' : '#4b5563';

  const getIconName = (): keyof typeof MaterialIcons.glyphMap => {
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
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="flex-row items-center justify-between p-4 rounded-lg border"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
        activeOpacity={0.7}
      >
        <View className="flex-row items-center gap-3">
          <MaterialIcons name={getIconName()} size={24} color={textColor} />
          <Text
            className="text-base font-semibold"
            style={{ color: textColor }}
          >
            Тема
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={textColor} />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onPress={() => setIsModalVisible(false)}
        >
          <Pressable
            className="rounded-lg p-4 w-[280px]"
            style={{ backgroundColor: modalBgColor }}
            onPress={(e) => e.stopPropagation()}
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text
                className="text-lg font-bold"
                style={{ color: textColor }}
              >
                Виберіть тему
              </Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                activeOpacity={0.7}
              >
                <MaterialIcons name="close" size={24} color={textColor} />
              </TouchableOpacity>
            </View>

            <View className="gap-2">
              {themeOptions.map((option) => {
                const isSelected = theme === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleThemeSelect(option.value)}
                    className="flex-row items-center gap-3 p-3 rounded-lg"
                    style={{
                      backgroundColor: isSelected ? selectedBgColor : itemBgColor,
                    }}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons
                      name={option.icon}
                      size={22}
                      color={textColor}
                    />
                    <Text
                      className="flex-1 text-base"
                      style={{ color: textColor }}
                    >
                      {option.label}
                    </Text>
                    {isSelected && (
                      <MaterialIcons name="check" size={22} color={textColor} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

