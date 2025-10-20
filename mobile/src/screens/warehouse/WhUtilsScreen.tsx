import { Text, TouchableOpacity, View } from 'react-native';

export function WhUtilsScreen() {
  return (
    <View className="flex-1 bg-slate-900 p-4">
      <View className="rounded-lg bg-slate-800 p-6">
        <Text className="mb-4 text-2xl font-bold text-slate-50">Утиліти складу</Text>
        <Text className="mb-6 text-slate-300">Корисні інструменти для роботи зі складом</Text>

        <TouchableOpacity className="mb-3 rounded-lg bg-sky-600 p-4">
          <Text className="text-center font-semibold text-white">Експорт даних</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mb-3 rounded-lg bg-sky-600 p-4">
          <Text className="text-center font-semibold text-white">Імпорт даних</Text>
        </TouchableOpacity>

        <TouchableOpacity className="rounded-lg bg-sky-600 p-4">
          <Text className="text-center font-semibold text-white">Аналітика складу</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
