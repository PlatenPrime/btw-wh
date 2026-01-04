import { Switch, type SwitchProps } from "@/components/ui/switch";

export type ThemedSwitchProps = SwitchProps;

// Switch already uses theme internally, so this is just a wrapper for consistency
export function ThemedSwitch(props: ThemedSwitchProps) {
  return <Switch {...props} />;
}
