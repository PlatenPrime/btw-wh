import type { IconFamily } from "@/components/ui/icon";
import { SemanticColors } from "@/constants/theme";

export type QuickAccessTriggerColor = keyof typeof SemanticColors.iconColors;

export interface QuickAccessTrigger {
  id: string;
  title: string;
  icon: string;
  iconFamily?: IconFamily;
  color: QuickAccessTriggerColor;
  onPress?: () => void;
}

