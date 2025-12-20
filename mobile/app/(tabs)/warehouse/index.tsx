import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { PageLayout } from '@/components/layout/page-layout';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function WarehouseList() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';

  const navigationItems = [
    {
      title: 'Ряди',
      icon: 'view-list',
      route: 'rows',
    },
    {
      title: 'Стоки',
      icon: 'inventory',
      route: 'stocks',
    },
    {
      title: 'Зони',
      icon: 'location-on',
      route: 'zones',
    },
    {
      title: 'Блоки',
      icon: 'view-module',
      route: 'blocks',
    },
    {
      title: 'Паллети',
      icon: 'layers',
      route: 'pallets',
    },
  ];

  const handleNavigation = (route: string) => {
    router.push(`/(tabs)/warehouse/${route}` as any);
  };

  const iconColor = colorScheme === 'light' ? Colors.light.text : Colors.dark.text;

  return (
    <PageLayout title="Склад">
      <ScrollView className="flex-1 px-4">
        <View className="gap-3 py-4">
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
    </PageLayout>
  );
}