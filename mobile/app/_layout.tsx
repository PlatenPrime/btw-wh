import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { SidebarProvider } from '@/components/layout/sidebar/SidebarProvider';
import { AppSidebar } from '@/components/layout/sidebar/AppSidebar';
import { Providers } from '@/providers/providers';
import { useTheme } from '@/providers/theme-provider';
import '@/global.css';

function AppContent() {
  const { resolvedTheme } = useTheme();

  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode={resolvedTheme === 'dark' ? 'dark' : 'light'}>
        <NavigationThemeProvider value={resolvedTheme === 'dark' ? DarkTheme : DefaultTheme}>
          <SidebarProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
              <Stack.Screen name="unauthorized" options={{ headerShown: false }} />
              <Stack.Screen name="forbidden" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
            <AppSidebar />
            <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} />
          </SidebarProvider>
        </NavigationThemeProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}
