import { AppSidebar } from "@/components/layout/sidebar/AppSideBar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />
      <Toaster />
    </SidebarProvider>
  );
}

export default App;
