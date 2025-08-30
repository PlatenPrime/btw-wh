import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import type { ArtsStackParamList } from '../../navigation/types';

type NavigationProp = StackNavigationProp<ArtsStackParamList>;

export function ArtsListScreen() {
  const navigation = useNavigation<NavigationProp>();

  const menuItems = [
    { title: 'Список артикулів', route: 'ArtsList', description: 'Перегляд всіх артикулів' },
    { title: 'Оновити базу', route: 'ArtsUpdate', description: 'Оновлення бази артикулів' },
    { title: 'Утиліти', route: 'ArtsUtils', description: 'Корисні інструменти' },
  ];

  const renderMenuItem = ({ item }: { item: (typeof menuItems)[0] }) => (
    <TouchableOpacity
      className="mb-3 rounded-lg bg-slate-800 p-4"
      onPress={() => navigation.navigate(item.route as keyof ArtsStackParamList)}>
      <Text className="mb-2 text-lg font-semibold text-slate-50">{item.title}</Text>
      <Text className="text-slate-400">{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-slate-900 p-4">
      <Text className="mb-6 text-2xl font-bold text-slate-50">Артикули</Text>

      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.route}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
