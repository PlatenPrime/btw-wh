import { Text as RNText, TextProps as RNTextProps } from 'react-native';

// Text is essentially a Text component with gluestack styling support via NativeWind className
export const Text = RNText;

export type TextProps = RNTextProps & { className?: string };

