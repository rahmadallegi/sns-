import { useState, useEffect } from "react";
import { FolderKanban, Wrench, Handshake, ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import * as adminApi from "@/lib/adminApi";

interface Project {
  id: number;
  title: string;
  category: string;
  detail?: string;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clientCount, setClientCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [projectsRes, clientsRes, servicesRes] = await Promise.all([
        adminApi.getProjects(),
        adminApi.getClients(),
        adminApi.getServices(),
      ]);

      setProjects(projectsRes.data); // Show first 4 recent projects
      setClientCount(clientsRes.data.length);
      setServiceCount(servicesRes.data.length);
    } catch (err) {
      console.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Projects" value={projects.length} icon={FolderKanban} />
        <StatCard title="Active Services" value={serviceCount} icon={Wrench} />
        <StatCard title="Clients" value={clientCount} icon={Handshake} />
      </div>

      {/* Recent Projects */}
      <div className="admin-card">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-heading font-semibold text-foreground">Recent Projects</h2>
          <a href="/admin/projects" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="divide-y divide-border">
          {projects.slice(0,4).map((p) => (
            <div key={p.id} className="px-5 py-3.5 flex items-center justify-between admin-table-row-hover">
              <div>
                <p className="text-sm font-medium text-foreground">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-pill bg-primary/10 text-primary">Active</span>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Dashboard;
