import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/modules/auth/api/hooks/useAuth';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ProfileSidebarCardProps {
  handleLogout: () => void;
  isLoading: boolean;
}

export function ProfileSidebarCard({
  handleLogout,
  isLoading,
}: ProfileSidebarCardProps) {
  const { user } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const textColor = colorScheme === 'light' ? Colors.light.text : Colors.dark.text;
  const borderColor = colorScheme === 'light' ? '#e5e7eb' : '#374151';

  if (isLoading || !user) {
    return null;
  }

  return (
    <View
      className="mt-auto border-t p-4"
      style={{
        borderTopColor: borderColor,
      }}
    >
      <View className="flex-col items-center gap-2">
        {user.photo && (
          <Image
            source={{ uri: user.photo }}
            className="h-12 w-12 rounded-full"
            style={{ width: 48, height: 48, borderRadius: 24 }}
          />
        )}
        <ThemedText type="defaultSemiBold" className="text-sm">
          {user.fullname}
        </ThemedText>
        <ThemedText type="default" className="text-xs opacity-70">
          @{user.username}
        </ThemedText>
        <TouchableOpacity
          onPress={handleLogout}
          className="w-full rounded-lg border p-3 flex-row items-center justify-center mt-2"
          style={{
            borderColor: borderColor,
            backgroundColor: colorScheme === 'light' ? '#fff' : '#1f2937',
          }}
        >
          <MaterialIcons name="logout" size={20} color={textColor} />
          <Text
            className="ml-2 font-semibold"
            style={{ color: textColor }}
          >
            Вийти
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

