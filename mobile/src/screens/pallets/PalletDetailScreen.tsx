import type { RouteProp, StackNavigationProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import type { PalletsStackParamList } from '../../navigation/types';

type RouteProps = RouteProp<PalletsStackParamList, 'PalletDetail'>;
type NavigationProp = StackNavigationProp<PalletsStackParamList>;

export function PalletDetailScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { title } = route.params;

  const handleViewPoses = () => {
    // Используем title как palletId для демонстрации
    navigation.navigate('Poses', { palletId: title });
  };

  return (
    <View className="flex-1 bg-slate-900 p-4">
      <View className="mb-4 rounded-lg bg-slate-800 p-6">
        <Text className="mb-4 text-2xl font-bold text-slate-50">Деталі паллети</Text>
        <Text className="mb-2 text-lg text-slate-300">Паллета: {title}</Text>
        <Text className="mb-4 text-slate-400">Тут буде детальна інформація про паллету</Text>

        <TouchableOpacity className="rounded-lg bg-sky-600 p-4" onPress={handleViewPoses}>
          <Text className="text-center font-semibold text-white">Переглянути позиції</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
