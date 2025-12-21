import { Text as RNText, TextProps } from 'react-native';

// Heading is a Text component with heading styles
// Supports size prop which maps to font sizes via className
export const Heading = ({ size, className, style, ...props }: TextProps & { size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'; className?: string }) => {
  const sizeClass = size 
    ? `text-${size}`
    : 'text-xl';
  
  const combinedClassName = className 
    ? `${sizeClass} ${className}` 
    : sizeClass;

  return <RNText className={combinedClassName} style={style} {...props} />;
};

export type HeadingProps = TextProps & { size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'; className?: string };

