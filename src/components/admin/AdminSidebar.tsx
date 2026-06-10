import type { ReactNode } from "react";
import {
  Download,
  LayoutDashboard,
  LogOut,
  Building2,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type NavItem = {
  to: string;
  icon: ReactNode;
  label: string;
  badge?: number;
};

export default function AdminSidebar({ pendingCount }: { pendingCount?: number }) {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = user.fullName
    ? user.fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const navItems: NavItem[] = [
    { to: "/admin/dashboard", icon: <LayoutDashboard className="size-4" />, label: "Dashboard" },
    {
      to: "/admin/properties",
      icon: <Building2 className="size-4" />,
      label: "Properties",
      badge: pendingCount,
    },
    { to: "/admin/users", icon: <Users className="size-4" />, label: "Users" },
    { to: "/admin/export", icon: <Download className="size-4" />, label: "Export" },
    { to: "/admin/settings", icon: <Settings className="size-4" />, label: "Settings" },
  ];

  return (
    <aside className="shrink-0 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col p-6 w-60 min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-lg bg-neutral-900 dark:bg-indigo-600 flex items-center justify-center">
          <ShieldCheck className="size-5 text-white" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-bold text-base text-neutral-900 dark:text-neutral-100">PropVerify</span>
          <span className="text-[11px] text-neutral-400 leading-4">Admin</span>
        </div>
      </div>

      {/* Admin identity */}
      <div className="flex mt-8 items-center gap-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl px-3 py-3">
        <div className="size-10 shrink-0 rounded-full bg-neutral-900 dark:bg-indigo-600 flex items-center justify-center text-sm font-semibold text-white">
          {initials}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="truncate text-sm font-semibold leading-5 dark:text-neutral-100">
            {user.fullName || "Admin User"}
          </span>
          <span className="text-xs leading-4 text-neutral-500 dark:text-neutral-400">Administrator</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.to ||
            (item.to === "/admin/properties" &&
              location.pathname.startsWith("/admin/properties"));

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm leading-5 transition-colors ${
                isActive
                  ? "bg-neutral-900 dark:bg-indigo-600 text-white font-medium"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="ml-auto flex min-w-5 h-5 px-1 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2 text-sm leading-5 text-neutral-500 dark:text-neutral-400 transition-colors hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-500"
      >
        <LogOut className="size-4" />
        Sign Out
      </button>
    </aside>
  );
}
