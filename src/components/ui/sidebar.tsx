import type { ReactNode } from "react";
import {
  Bell,
  Building2,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type NavItem = {
  to: string;
  icon: ReactNode;
  label: string;
  badge?: number;
};

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const initials = user.fullName
    ? user.fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Dashboard sidebar nav (used on /dashboard)
  const dashboardNav: NavItem[] = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard className="size-4" />,
      label: "Dashboard",
    },
    {
      to: "/my-properties",
      icon: <Building2 className="size-4" />,
      label: "My Properties",
    },
    {
      to: "/submit-property",
      icon: <Plus className="size-4" />,
      label: "Submit Property",
    },
    {
      to: "/notifications",
      icon: <Bell className="size-4" />,
      label: "Notifications",
      badge: 3,
    },
    {
      to: "/profile",
      icon: <Settings className="size-4" />,
      label: "Profile Settings",
    },
  ];

  // Submit Property sidebar nav
  const submitNav: NavItem[] = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard className="size-4" />,
      label: "Dashboard",
    },
    {
      to: "/submit-property",
      icon: <Building2 className="size-4" />,
      label: "Submit Property",
    },
    {
      to: "/my-properties",
      icon: <Building2 className="size-4" />,
      label: "My Properties",
    },
    {
      to: "/verifications",
      icon: <ShieldCheck className="size-4" />,
      label: "Verifications",
    },
    {
      to: "/billing",
      icon: <CreditCard className="size-4" />,
      label: "Billing",
    },
    {
      to: "/settings",
      icon: <Settings className="size-4" />,
      label: "Settings",
    },
  ];

  const isSubmitPage = location.pathname.startsWith("/submit-property");
  const navItems: NavItem[] = isSubmitPage ? submitNav : dashboardNav;

  return (
    <aside className="shrink-0 bg-white border-r border-neutral-200 flex flex-col p-6 w-60 min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-lg bg-neutral-900 flex items-center justify-center">
          <ShieldCheck className="size-5 text-white" />
        </div>
        <span className="font-bold text-lg leading-7 text-indigo-600">
          PropVerify
        </span>
      </div>

      {/* User Info */}
      <div
        className={`flex mt-8 items-center gap-3 ${
          isSubmitPage ? "bg-neutral-100 rounded-xl px-3 py-3" : ""
        }`}
      >
        <div className="size-10 shrink-0 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-semibold text-neutral-900">
          {initials}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="truncate text-sm font-semibold leading-5">
            {user.fullName || "User"}
          </span>
          <span className="text-xs leading-4 text-neutral-500">
            Property Owner
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={`${item.to}-${item.label}`}
              to={item.to}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm leading-5 transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white font-medium"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              {item.icon}

              <span>{item.label}</span>

              {item.badge !== undefined && (
                <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2 text-sm leading-5 text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-500"
      >
        <LogOut className="size-4" />
        {isSubmitPage ? "Sign Out" : "Logout"}
      </button>
    </aside>
  );
}