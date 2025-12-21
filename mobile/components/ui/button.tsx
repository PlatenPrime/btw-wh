import { createButton } from '@gluestack-ui/core/button/creator';
import { Pressable, Text as RNText, View, ActivityIndicator } from 'react-native';

export const Button = createButton({
  Root: Pressable,
  Text: RNText,
  Group: View,
  Spinner: ActivityIndicator,
  Icon: View,
});

export const ButtonText = Button.Text;
export const ButtonIcon = Button.Icon;
export const ButtonSpinner = Button.Spinner;
export const ButtonGroup = Button.Group;

export type ButtonProps = React.ComponentProps<typeof Button>;
export type ButtonTextProps = React.ComponentProps<typeof ButtonText>;
export type ButtonIconProps = React.ComponentProps<typeof ButtonIcon>;
export type ButtonSpinnerProps = React.ComponentProps<typeof ButtonSpinner>;
export type ButtonGroupProps = React.ComponentProps<typeof ButtonGroup>;

