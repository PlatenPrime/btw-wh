import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

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
    <SidebarInset className="relative">
      <header className="z-5 bg-background/80 fixed top-0 flex h-10 w-full shrink-0 items-center justify-start gap-2 border-b px-4">
        <div className="flex items-center">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">{headerText ?? ""} </h1>
        </div>
        {burger}
      </header>

      <main className="mt-10">{children}</main>
      <Toaster />
      <footer className="h-10"></footer>
    </SidebarInset>
  );
}
