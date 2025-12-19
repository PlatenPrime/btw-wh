import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useSidebar } from '@/components/layout/sidebar/SidebarProvider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ArtsList() {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  const colorScheme = useColorScheme() ?? 'light';

  const navigationItems = [
    {
      title: 'Дашборд',
      icon: 'dashboard',
      route: 'dashboard',
    },
    {
      title: 'Оновлення',
      icon: 'update',
      route: 'update',
    },
    {
      title: 'Утиліти',
      icon: 'build',
      route: 'utils',
    },
  ];

  const handleNavigation = (route: string) => {
    router.push(`/(tabs)/arts/${route}` as any);
  };

  const iconColor = colorScheme === 'light' ? Colors.light.text : Colors.dark.text;

  return (
    <ThemedView className="flex-1">
      <TouchableOpacity
        onPress={toggleSidebar}
        className="absolute top-[50px] left-4 z-[1000] p-2"
      >
        <MaterialIcons
          name="menu"
          size={24}
          color={colorScheme === 'light' ? Colors.light.text : Colors.dark.text}
        />
      </TouchableOpacity>
      <ScrollView className="flex-1 pt-20 px-4">
        <ThemedText type="title" className="text-center mb-6">
          Артикули
        </ThemedText>
        <View className="gap-3">
          {navigationItems.map((item) => (
            <TouchableOpacity
              key={item.route}
              onPress={() => handleNavigation(item.route)}
              className="flex-row items-center p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              style={{
                backgroundColor: colorScheme === 'light' ? '#fff' : '#1f2937',
                borderColor: colorScheme === 'light' ? '#d1d5db' : '#4b5563',
              }}
            >
              <MaterialIcons name={item.icon as any} size={24} color={iconColor} />
              <ThemedText type="defaultSemiBold" className="ml-3 text-base">
                {item.title}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

