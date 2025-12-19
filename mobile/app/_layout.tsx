import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { SidebarProvider } from '@/components/layout/sidebar/SidebarProvider';
import { AppSidebar } from '@/components/layout/sidebar/AppSidebar';
import { Providers } from '@/providers/providers';
import '@/global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Providers>
      <SafeAreaProvider>
        <GluestackUIProvider mode="dark">
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
              <StatusBar style="auto" />
            </SidebarProvider>
          </ThemeProvider>
        </GluestackUIProvider>
      </SafeAreaProvider>
    </Providers>
  );
}
