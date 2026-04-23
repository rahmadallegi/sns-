import { 
  LayoutDashboard, Wrench, FolderKanban, Building2, 
  Phone, Handshake, ChevronLeft, ChevronRight, MessageSquare
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useSidebarState } from "./SidebarState";

const navItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Services", url: "/admin/services", icon: Wrench },
  { title: "Projects", url: "/admin/projects", icon: FolderKanban },
  { title: "Clients", url: "/admin/clients", icon: Handshake },
  { title: "About", url: "/admin/about", icon: Building2 },
  { title: "Contact", url: "/admin/contact", icon: Phone },
  { title: "Messages", url: "/admin/messages", icon: MessageSquare },

];

export function AdminSidebar() {
  const { collapsed, setCollapsed } = useSidebarState();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-200 z-50 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      {/* Logo area */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">S</span>
            </div>
            <span className="font-heading text-base font-bold text-sidebar-accent-foreground tracking-tight">
              SNS Admin
            </span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-heading font-bold text-sm">S</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-0.5 px-3 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className={`flex items-center gap-3 ${collapsed ? "justify-center px-2" : "px-3"} py-2.5 rounded-lg text-[13px] font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-150`}
            activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-sm"
          >
            <item.icon className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-12 flex items-center justify-center border-t border-sidebar-border text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent transition-all duration-150"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
