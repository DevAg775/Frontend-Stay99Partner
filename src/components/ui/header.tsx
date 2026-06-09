import { Bell, ChevronRight, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifCount] = useState(3);
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

  const isSubmitPage = location.pathname === "/submit-property";

  return (
    <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex px-8 py-4 justify-between items-center relative z-10">
      {/* Left: Title or Breadcrumb */}
      {isSubmitPage ? (
        <div className="flex items-center gap-2 text-sm">
          <Link
            to="/dashboard"
            className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="size-4 text-neutral-400" />
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            Submit New Property
          </span>
        </div>
      ) : (
        <h1 className="font-bold text-neutral-950 dark:text-neutral-100 text-xl leading-7">
          {title}
        </h1>
      )}

      {/* Right: actions */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Search bar (dashboard only) */}
        {!isSubmitPage && (
          <div className="rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex px-3 py-2 items-center gap-2 w-64">
            <svg
              className="size-4 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              className="bg-transparent outline-none text-sm leading-5 w-full text-neutral-700 dark:text-neutral-200 placeholder:text-neutral-400"
              placeholder="Search..."
            />
          </div>
        )}

        {/* Notification bell */}
        <div className="relative cursor-pointer">
          <Bell className="size-5 text-neutral-500 dark:text-neutral-400" />
          {notifCount > 0 && (
            <span className="size-4 font-semibold rounded-full bg-red-500 text-white text-[9px] flex absolute -right-1.5 -top-1.5 justify-center items-center">
              {notifCount}
            </span>
          )}
        </div>

        {/* User avatar + dropdown */}
        <div className="relative">
          <div
            className="flex items-center gap-1.5 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="size-8 font-semibold rounded-full bg-neutral-900 dark:bg-indigo-600 text-white text-xs flex justify-center items-center">
              {initials}
            </div>
            <svg
              className="size-4 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="m6 9 6 6 6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {showDropdown && (
            <div className="absolute right-0 top-10 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg w-48 py-1 z-50">
              <div className="px-3 py-2.5 border-b border-neutral-100 dark:border-neutral-700">
                <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                  {user.fullName || "User"}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                  {user.email || ""}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
