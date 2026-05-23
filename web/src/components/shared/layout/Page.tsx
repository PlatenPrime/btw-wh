import * as React from "react";

import { cn } from "@/lib/utils";

interface PageProps extends React.ComponentProps<"main"> {
  children: React.ReactNode;
}

export function Page({ children, className, ...props }: PageProps) {
  return (
    <main
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6 lg:p-8",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}
