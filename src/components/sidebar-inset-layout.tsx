import React from "react";
import { Separator } from "./ui/separator";
import { SidebarInset, SidebarTrigger } from "./ui/sidebar";
import { Vortex } from "./ui/vortex";

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

      <header className="relative flex h-16 shrink-0 items-center gap-2 border-b px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden blur">
          <Vortex
            backgroundColor="black"
            rangeY={800}
            particleCount={500}
            baseHue={210}
            className="absolute inset-0 -z-10 pointer-events-none"
          ></Vortex>
        </div>
        <div className="flex items-center relative z-10 inset-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {headerText && <h1 className="text-2xl font-bold">{headerText}</h1>}
        </div>
      </header>

      <div className="relative z-20">{children}</div>
      {/* Контент после хедера — должен быть поверх всего */}
    </SidebarInset>
  );
}
