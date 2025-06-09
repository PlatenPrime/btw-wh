import React from "react";
import { Separator } from "./ui/separator";
import { SidebarInset, SidebarTrigger } from "./ui/sidebar";

export function SidebarInsetLayout({
  headerText,
  children,
}: {
  headerText?: string;
  children: React.ReactNode;
}) {
  return (
    <SidebarInset className="relative">
      {/* Header с фоновым Vortex */}

      <header className="fixed top-0 z-1000 bg-background/90  w-full  flex h-16 shrink-0 items-center gap-2 border-b px-4 overflow-hidden">
        
        <div className="flex items-center ">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
     
          {headerText && <h1 className="text-2xl font-bold ">{headerText}</h1>}
        </div>
      </header>

      <div className="mt-16 ">{children}</div>
      {/* Контент после хедера — должен быть поверх всего */}
    </SidebarInset>
  );
}
