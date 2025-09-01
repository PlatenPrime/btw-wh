import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../providers/AuthProvider';

export function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 bg-slate-900 p-4">
      <View className="mb-4 rounded-lg bg-slate-800 p-6">
        <Text className="mb-2 text-xl font-bold text-slate-50">Профіль користувача</Text>
        <Text className="mb-4 text-slate-300">{user?.username || 'Невідомий користувач'}</Text>
      </View>

      <TouchableOpacity onPress={logout} className="rounded-lg bg-red-600 p-4">
        <Text className="text-center font-semibold text-white">Вийти</Text>
      </TouchableOpacity>
    </View>
  );
}
