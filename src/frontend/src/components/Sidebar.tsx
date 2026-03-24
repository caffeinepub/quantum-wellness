import { Link, useLocation } from "@tanstack/react-router";
import {
  Activity,
  Atom,
  BookOpen,
  LayoutDashboard,
  PlusCircle,
  User,
  Users,
} from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/patients", label: "Patients", icon: Users },
  { path: "/new-session", label: "New Session", icon: PlusCircle },
  { path: "/quantum", label: "Quantum Dx", icon: Atom },
  { path: "/reference-library", label: "Reference Library", icon: BookOpen },
  { path: "/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-5 h-5 text-golden" />
          <span className="font-heading font-bold text-lg text-golden tracking-wide">
            Quantum Wellness
          </span>
        </div>
        <p className="text-xs text-muted-foreground ml-7">
          Bio-Photonic Platform
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              data-ocid={`nav.${label.toLowerCase().replace(/ /g, "_")}.link`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                active
                  ? "bg-golden text-primary-foreground shadow-golden"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Modalities badge */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
          Active Modalities
        </p>
        <p className="text-xs text-golden leading-relaxed">
          PMA · Laser · Thermal · Acupuncture · TCM
        </p>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()}. Built with ♥ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-golden hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </aside>
  );
}
