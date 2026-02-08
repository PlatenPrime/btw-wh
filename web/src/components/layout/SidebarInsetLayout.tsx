import {
  HeaderActionsMenu,
  HeaderActionsProvider,
} from "@/components/layout/header-actions";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

interface SidebarInsetLayoutProps {
  headerText?: string;
  children: React.ReactNode;
  burger?: React.ReactNode;
  headerExtra?: React.ReactNode;
}

export function SidebarInsetLayout({
  headerText,
  children,
  burger,
  headerExtra,
}: SidebarInsetLayoutProps) {
  return (
    <HeaderActionsProvider>
      <SidebarInset className="relative min-h-0 overflow-hidden">
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 z-10 flex h-10 shrink-0 items-center justify-between gap-2 border-b px-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <h1 className="text-lg font-semibold">{headerText ?? ""}</h1>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            {headerExtra}
            {burger}
            <HeaderActionsMenu />
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-auto">
          <main className="">{children}</main>
          <Toaster />
          <footer className="h-10" />
        </div>
      </SidebarInset>
    </HeaderActionsProvider>
  );
}
