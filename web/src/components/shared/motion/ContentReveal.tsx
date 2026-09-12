import { cn } from "@/lib/utils";
import { motion } from "@/lib/motion";
import {
  createContext,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";

const RevealMotionContext = createContext(true);

interface ContentRevealProps {
  children: React.ReactNode;
  className?: string;
  /** When true (overlay / refetch), stagger locks off and stays off. */
  lockMotion?: boolean;
}

export function ContentReveal({
  children,
  className,
  lockMotion = false,
}: ContentRevealProps) {
  const [wasLocked, setWasLocked] = useState(false);
  if (lockMotion && !wasLocked) {
    setWasLocked(true);
  }
  const playMotion = !wasLocked && !lockMotion;

  return (
    <RevealMotionContext.Provider value={playMotion}>
      <div className={cn(motion.revealBlock, className)}>{children}</div>
    </RevealMotionContext.Provider>
  );
}

type ContentRevealStaggerProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function ContentRevealStagger<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContentRevealStaggerProps<T>) {
  const playMotion = useContext(RevealMotionContext);
  const [lockedOff, setLockedOff] = useState(!playMotion);
  if (!playMotion && !lockedOff) {
    setLockedOff(true);
  }
  const shouldAnimate = playMotion && !lockedOff;
  const Component = as ?? "div";

  return (
    <Component
      className={cn(shouldAnimate && "content-reveal-stagger", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
