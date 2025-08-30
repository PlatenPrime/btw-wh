import { Text, TouchableOpacity, View } from 'react-native';

export function ArtsUpdateScreen() {
  return (
    <View className="flex-1 bg-slate-900 p-4">
      <View className="rounded-lg bg-slate-800 p-6">
        <Text className="mb-4 text-2xl font-bold text-slate-50">Оновити базу артикулів</Text>
        <Text className="mb-6 text-slate-300">
          Тут буде функціонал для оновлення бази артикулів
        </Text>

        <TouchableOpacity className="rounded-lg bg-sky-600 p-4">
          <Text className="text-center font-semibold text-white">Оновити базу</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
