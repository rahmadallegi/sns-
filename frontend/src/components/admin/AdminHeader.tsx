import { Search, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import * as adminApi from "@/lib/adminApi";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/services": "Services",
  "/projects": "Projects",
  "/clients": "Clients",
  "/about": "About / Company",
  "/contact": "Contact Info",
};

export function AdminHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const title = pageTitles[location.pathname] || "Admin Panel";

  const handleLogout = () => {
    adminApi.adminLogout();
    localStorage.removeItem("adminUser");
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
      <h1 className="font-heading text-lg font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="relative w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search... (⌘K)"
            className="pl-9 h-9 bg-background text-sm rounded-pill"
          />
        </div>
        
        <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-pill">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
        
      </div>
    </header>
  );
}
