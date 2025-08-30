import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AuthProvider } from './src/providers/AuthProvider';

import './global.css';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
      <StatusBar style="light" />
    </AuthProvider>
  );
}
