import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../providers/AuthProvider';

export function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading } = useAuth();

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Помилка', 'Будь ласка, заповніть всі поля');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Помилка', 'Паролі не співпадають');
      return;
    }

    try {
      await register({ username, email, password });
    } catch (error) {
      Alert.alert('Помилка реєстрації', 'Не вдалося зареєструватися');
    }
  };

  return (
    <View className="flex-1 justify-center bg-slate-900 p-6">
      <View className="rounded-lg bg-slate-800 p-6">
        <Text className="mb-6 text-center text-2xl font-bold text-slate-50">Реєстрація</Text>

        <TextInput
          className="mb-4 rounded-lg bg-slate-700 p-4 text-slate-50"
          placeholder="Логін"
          placeholderTextColor="#94a3b8"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          className="mb-4 rounded-lg bg-slate-700 p-4 text-slate-50"
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          className="mb-4 rounded-lg bg-slate-700 p-4 text-slate-50"
          placeholder="Пароль"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          className="mb-6 rounded-lg bg-slate-700 p-4 text-slate-50"
          placeholder="Підтвердіть пароль"
          placeholderTextColor="#94a3b8"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="rounded-lg bg-sky-600 p-4"
          onPress={handleRegister}
          disabled={isLoading}>
          <Text className="text-center text-lg font-semibold text-white">
            {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
