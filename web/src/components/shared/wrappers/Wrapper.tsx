import { cn } from "@/lib/utils";

export function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-accent/20 rounded-xl p-2", className)}>
      {children}
    </div>
  );
}
