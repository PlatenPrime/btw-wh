import { createInput } from '@gluestack-ui/core/input/creator';
import { View, TextInput, Pressable, View as IconView } from 'react-native';

export const Input = createInput({
  Root: View,
  Input: TextInput,
  Slot: View,
  Icon: IconView,
});

export const InputField = Input.Input;
export const InputSlot = Input.Slot;
export const InputIcon = Input.Icon;

export type InputProps = React.ComponentProps<typeof Input>;
export type InputFieldProps = React.ComponentProps<typeof InputField>;
export type InputSlotProps = React.ComponentProps<typeof InputSlot>;
export type InputIconProps = React.ComponentProps<typeof InputIcon>;

