import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
}: StatCardProps) {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-base-content/70">{title}</p>
            <p className="text-2xl font-bold mt-1 text-base-content">{value}</p>
            {description && (
              <p className="text-xs text-base-content/60 mt-1">
                {description}
              </p>
            )}
          </div>
          <div className="rounded-xl bg-primary/10 p-3 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
