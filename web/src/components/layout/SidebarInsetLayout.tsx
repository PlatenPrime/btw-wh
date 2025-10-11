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
}

export function SidebarInsetLayout({
  headerText,
  children,
  burger,
}: SidebarInsetLayoutProps) {
  return (
    <HeaderActionsProvider>
      <SidebarInset className="relative">
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-10 flex h-10 shrink-0 items-center justify-between gap-2 border-b px-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <h1 className="text-lg font-semibold">{headerText ?? ""}</h1>
          </div>
          <div className="flex items-center gap-2">
            {burger}
            <HeaderActionsMenu />
          </div>
        </header>

        <main className="">{children}</main>
        <Toaster />
        <footer className="h-10"></footer>
      </SidebarInset>
    </HeaderActionsProvider>
  );
}
