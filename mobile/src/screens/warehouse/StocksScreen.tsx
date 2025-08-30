import { Text, TouchableOpacity, View } from 'react-native';

export function StocksScreen() {
  return (
    <View className="flex-1 bg-slate-900 p-4">
      <View className="rounded-lg bg-slate-800 p-6">
        <Text className="mb-4 text-2xl font-bold text-slate-50">Залишки товарів</Text>
        <Text className="mb-6 text-slate-300">
          Тут буде функціонал для перегляду залишків товарів на складі
        </Text>

        <TouchableOpacity className="mb-3 rounded-lg bg-sky-600 p-4">
          <Text className="text-center font-semibold text-white">Переглянути залишки</Text>
        </TouchableOpacity>

        <TouchableOpacity className="rounded-lg bg-sky-600 p-4">
          <Text className="text-center font-semibold text-white">Фільтрувати залишки</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
