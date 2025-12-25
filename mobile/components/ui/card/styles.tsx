import { isWeb, tva } from "@/lib/tv";

const baseStyle = isWeb
  ? "flex flex-col relative z-0 box-border border-0 list-none min-w-0 min-h-0 items-stretch m-0 p-0 text-decoration-none"
  : "flex flex-col";

export const cardStyle = tva({
  base: `${baseStyle} bg-background-0`,
  variants: {
    variant: {
      default: "rounded-lg",
      outlined: "rounded-lg border border-outline-100",
      elevated: "rounded-lg shadow-md",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
