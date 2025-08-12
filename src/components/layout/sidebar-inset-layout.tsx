import React from "react";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarTrigger } from "../ui/sidebar";
import { Toaster } from "@/components/ui/sonner"


interface SidebarInsetLayoutProps {
  headerText?: string;
  children: React.ReactNode;
  burger?: React.ReactNode;
}

export function SidebarInsetLayout({
  headerText,
  children,
  burger
}: SidebarInsetLayoutProps) {
  return (
    <SidebarInset className="relative">
      <header className="fixed top-0 z-5 bg-background/80   w-full  flex h-16 shrink-0 items-center justify-between  gap-2 border-b px-4 ">
        <div className="flex items-center ">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
           <h1 className="text-xl font-bold ">{headerText ?? ""} </h1>
        </div>
        {burger}
      </header>

      <main className="mt-16 ">{children}</main>
      <Toaster />
    </SidebarInset>
  );
}
