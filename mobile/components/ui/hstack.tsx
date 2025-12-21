import { View, ViewProps } from 'react-native';

// HStack is a View with flexDirection row for horizontal stacking
export const HStack = ({ className, ...props }: ViewProps & { className?: string }) => {
  const combinedClassName = className ? `flex-row ${className}` : 'flex-row';
  return <View className={combinedClassName} {...props} />;
};

export type HStackProps = ViewProps & { className?: string };

