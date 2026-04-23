import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  positive?: boolean;
}

export function StatCard({ title, value, icon: Icon, change, positive }: StatCardProps) {
  return (
    <div className="stat-card flex items-start justify-between group hover:shadow-md transition-shadow duration-200">
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
        <p className="mt-2 text-3xl font-heading font-bold text-foreground">{value}</p>
        {change && (
          <p className={`mt-1.5 text-xs font-medium ${positive ? "text-success" : "text-destructive"}`}>
            {change}
          </p>
        )}
      </div>
      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors duration-200">
        <Icon className="h-5 w-5 text-primary" />
      </div>
    </div>
  );
}
