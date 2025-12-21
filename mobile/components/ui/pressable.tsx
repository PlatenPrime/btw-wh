import { createPressable } from '@gluestack-ui/core/pressable/creator';
import { Pressable as RNPressable } from 'react-native';

export const Pressable = createPressable({
  Root: RNPressable,
});

export type PressableProps = React.ComponentProps<typeof Pressable>;

