import { View, ViewProps } from 'react-native';

// Box is essentially a View with gluestack styling support via NativeWind className
export const Box = View;

export type BoxProps = ViewProps & { className?: string };

