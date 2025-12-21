import { View, ViewProps } from 'react-native';

// VStack is a View with flexDirection column for vertical stacking
export const VStack = ({ className, ...props }: ViewProps & { className?: string }) => {
  const combinedClassName = className ? `flex-col ${className}` : 'flex-col';
  return <View className={combinedClassName} {...props} />;
};

export type VStackProps = ViewProps & { className?: string };

