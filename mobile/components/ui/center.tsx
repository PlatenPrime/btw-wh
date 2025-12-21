import { View, ViewProps } from 'react-native';

// Center is a View with centered content
export const Center = ({ className = 'items-center justify-center', ...props }: ViewProps & { className?: string }) => {
  return <View className={className} {...props} />;
};

export type CenterProps = ViewProps & { className?: string };

