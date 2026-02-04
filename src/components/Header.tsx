import { Link, useLocation } from "react-router-dom";
import { BarChart3, Plus } from "lucide-react";

export function Header() {
  const location = useLocation();

  return (
    <header className="navbar border-b border-base-300 bg-base-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost gap-2 text-lg font-bold">
            <BarChart3 className="h-6 w-6 text-primary" />
            Ads Manager
          </Link>
        </div>
      </div>
    </header>
  );
}
