import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import type { WarehouseStackParamList } from '../../navigation/types';

type RouteProps = RouteProp<WarehouseStackParamList, 'RowDetail'>;

export function RowDetailScreen() {
  const route = useRoute<RouteProps>();
  const { row } = route.params;

  return (
    <View className="flex-1 bg-slate-900 p-4">
      <View className="rounded-lg bg-slate-800 p-6">
        <Text className="mb-4 text-2xl font-bold text-slate-50">Деталі ряду складу</Text>
        <Text className="mb-2 text-lg text-slate-300">Ряд: {row}</Text>
        <Text className="text-slate-400">Тут буде детальна інформація про ряд складу</Text>
      </View>
    </View>
  );
}
