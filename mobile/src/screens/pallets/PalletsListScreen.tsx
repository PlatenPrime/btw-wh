import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import type { PalletsStackParamList } from '../../navigation/types';

type NavigationProp = StackNavigationProp<PalletsStackParamList>;

export function PalletsListScreen() {
  const navigation = useNavigation<NavigationProp>();

  const menuItems: Array<{
    title: string;
    route: 'AddPallet';
    description: string;
  }> = [
    {
      title: 'Додати паллету',
      route: 'AddPallet',
      description: 'Створити нову паллету',
    },
  ];

  const renderMenuItem = ({ item }: { item: (typeof menuItems)[0] }) => (
    <TouchableOpacity
      className="mb-3 rounded-lg bg-slate-800 p-4"
      onPress={() => navigation.navigate(item.route)}>
      <Text className="mb-2 text-lg font-semibold text-slate-50">{item.title}</Text>
      <Text className="text-slate-400">{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-slate-900 p-4">
      <Text className="mb-6 text-2xl font-bold text-slate-50">Паллети</Text>

      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.route}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
