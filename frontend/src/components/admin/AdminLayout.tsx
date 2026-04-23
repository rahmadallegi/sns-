import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { SidebarStateProvider, useSidebarState } from "./SidebarState";

function LayoutInner() {
  const { collapsed } = useSidebarState();
  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar />
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${collapsed ? "ml-[72px]" : "ml-64"}`}>
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AdminLayout() {
  return (
    <SidebarStateProvider>
      <LayoutInner />
    </SidebarStateProvider>
  );
}
