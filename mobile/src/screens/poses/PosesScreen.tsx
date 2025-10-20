import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDeletePosMutation, usePosesByPalletQuery } from '../../modules/poses/api';
import type { IPos } from '../../modules/poses/api/types';
import type { PalletsStackParamList } from '../../navigation/types';

type RouteProps = RouteProp<PalletsStackParamList, 'Poses'>;

export function PosesScreen() {
  const route = useRoute<RouteProps>();
  const { palletId } = route.params;

  // Используем реальный API
  const { data: posesData, isLoading, error } = usePosesByPalletQuery(palletId);
  const deletePosMutation = useDeletePosMutation();

  const poses = posesData?.data || [];

  const renderPose = ({ item }: { item: IPos }) => (
    <TouchableOpacity className="mb-3 rounded-lg bg-slate-800 p-4">
      <View className="mb-2 flex-row items-start justify-between">
        <Text className="text-lg font-semibold text-slate-50">{item.nameukr || 'Без назви'}</Text>
        <Text className="font-medium text-slate-300">{item.artikul}</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-slate-400">Кількість: {item.quant}</Text>
        <Text className="text-sm text-slate-400">Коробки: {item.boxes}</Text>
      </View>
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="text-xs text-slate-400">Паллета: {item.palletTitle}</Text>
        <Text className="text-xs text-slate-400">Ряд: {item.rowTitle}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text className="mt-4 text-slate-300">Завантаження позицій...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900 p-4">
        <Text className="mb-4 text-center text-red-400">Помилка завантаження: {error.message}</Text>
        <TouchableOpacity className="rounded-lg bg-sky-600 p-4">
          <Text className="text-center font-semibold text-white">Спробувати знову</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-900 p-4">
      <View className="mb-4 rounded-lg bg-slate-800 p-4">
        <Text className="mb-2 text-xl font-bold text-slate-50">Позиції на паллеті</Text>
        <Text className="text-slate-300">ID паллети: {palletId}</Text>
        <Text className="text-slate-400">Всього позицій: {poses.length}</Text>
      </View>

      {poses.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-center text-slate-400">На цій паллеті немає позицій</Text>
        </View>
      ) : (
        <FlatList
          data={poses}
          renderItem={renderPose}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity className="mt-4 rounded-lg bg-sky-600 p-4">
        <Text className="text-center font-semibold text-white">Додати позицію</Text>
      </TouchableOpacity>
    </View>
  );
}
