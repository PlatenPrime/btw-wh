import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { PalletsStackParamList } from '../../navigation/types';

type NavigationProp = StackNavigationProp<PalletsStackParamList>;

export function AddPalletScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [title, setTitle] = useState('');
  const [sector, setSector] = useState('');

  const handleSubmit = () => {
    // TODO: Implement API call to create pallet
    console.log('Creating pallet:', { title, sector });
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-slate-900 p-4">
      <Text className="mb-6 text-2xl font-bold text-slate-50">Додати паллету</Text>

      <View className="mb-4">
        <Text className="mb-2 text-slate-300">Назва паллети</Text>
        <TextInput
          className="rounded-lg bg-slate-800 p-4 text-slate-50"
          value={title}
          onChangeText={setTitle}
          placeholder="Введіть назву паллети"
          placeholderTextColor="#64748b"
        />
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-slate-300">Сектор (опціонально)</Text>
        <TextInput
          className="rounded-lg bg-slate-800 p-4 text-slate-50"
          value={sector}
          onChangeText={setSector}
          placeholder="Введіть сектор"
          placeholderTextColor="#64748b"
        />
      </View>

      <TouchableOpacity
        className="rounded-lg bg-sky-600 p-4"
        onPress={handleSubmit}
        disabled={!title.trim()}>
        <Text className="text-center font-semibold text-white">
          {title.trim() ? 'Створити паллету' : 'Введіть назву паллети'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
