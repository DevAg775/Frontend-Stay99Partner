import {
  Bell,
  Building2,
  FilePlus2,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = user.fullName
    ? user.fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { to: "/dashboard", icon: <LayoutDashboard className="size-4" />, label: "Dashboard" },
    { to: "/submit-property", icon: <FilePlus2 className="size-4" />, label: "Submit Property" },
    { to: "/my-properties", icon: <Building2 className="size-4" />, label: "My Properties" },
    { to: "/notifications", icon: <Bell className="size-4" />, label: "Notifications" },
    { to: "/profile", icon: <User className="size-4" />, label: "Profile Settings" },
  ];

  return (
    <aside className="shrink-0 bg-white border-r border-neutral-200 flex p-6 flex-col w-60 min-h-screen">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-lg bg-neutral-900 flex justify-center items-center">
          <Building2 className="size-5 text-neutral-50" />
        </div>
        <span className="text-[oklch(0.45_0.22_277)] font-bold text-lg leading-7">
          PropVerify
        </span>
      </div>

      <div className="flex mt-8 items-center gap-2">
        <div className="size-10 font-semibold rounded-full bg-neutral-100 text-neutral-900 text-sm flex justify-center items-center">
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm leading-5">{user.fullName || "User"}</span>
          <span className="text-neutral-500 text-xs leading-4">Property Owner</span>
        </div>
      </div>

      <nav className="flex mt-8 flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-full text-sm leading-5 flex px-4 py-2 items-center gap-2 transition-colors
                ${isActive
                  ? "bg-[oklch(0.45_0.22_277)] text-neutral-50 font-medium"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="rounded-full text-neutral-500 text-sm leading-5 flex mt-auto px-4 py-2 items-center gap-2 hover:text-red-500"
      >
        <LogOut className="size-4" />
        Logout
      </button>
    </aside>
  );
}