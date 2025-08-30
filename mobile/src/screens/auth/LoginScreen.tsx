import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../providers/AuthProvider';

export function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Помилка', 'Будь ласка, заповніть всі поля');
      return;
    }

    try {
      await login(username, password);
    } catch (error) {
      Alert.alert('Помилка входу', 'Невірний логін або пароль');
    }
  };

  return (
    <View className="flex-1 justify-center bg-slate-900 p-6">
      <View className="rounded-lg bg-slate-800 p-6">
        <Text className="mb-6 text-center text-2xl font-bold text-slate-50">BTW Warehouse</Text>

        <TextInput
          className="mb-4 rounded-lg bg-slate-700 p-4 text-slate-50"
          placeholder="Логін"
          placeholderTextColor="#94a3b8"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          className="mb-6 rounded-lg bg-slate-700 p-4 text-slate-50"
          placeholder="Пароль"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="rounded-lg bg-sky-600 p-4"
          onPress={handleLogin}
          disabled={isLoading}>
          <Text className="text-center text-lg font-semibold text-white">
            {isLoading ? 'Вхід...' : 'Увійти'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
