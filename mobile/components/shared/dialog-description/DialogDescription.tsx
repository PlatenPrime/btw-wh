import { ThemedText } from "@/components/themed-text";

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogDescription({
  children,
  className,
}: DialogDescriptionProps) {
  return (
    <ThemedText type="default" className={`text-sm opacity-70 ${className || ""}`}>
      {children}
    </ThemedText>
  );
}

