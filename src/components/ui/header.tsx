import { Bell, ChevronRight, LogOut, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

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
    <header className="bg-white border-b border-neutral-200 flex px-8 py-4 justify-between items-center relative z-10">
      {/* Left: Title or Breadcrumb */}
      {isSubmitPage ? (
        <div className="flex items-center gap-2 text-sm">
          <Link
            to="/dashboard"
            className="text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="size-4 text-neutral-400" />
          <span className="font-semibold text-neutral-900">
            Submit New Property
          </span>
        </div>
      ) : (
        <h1 className="font-bold text-neutral-950 text-xl leading-7">
          {title}
        </h1>
      )}

      {/* Right: actions */}
      <div className="flex items-center gap-3">
        {/* Theme toggles (shown on submit page per design) */}
        {isSubmitPage && (
          <div className="flex items-center gap-1 border border-neutral-200 rounded-lg p-1">
            <button className="p-1.5 rounded-md bg-neutral-100 text-neutral-700">
              <Sun className="size-4" />
            </button>
            <button className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700">
              <Moon className="size-4" />
            </button>
          </div>
        )}

        {/* Search bar (dashboard only) */}
        {!isSubmitPage && (
          <div className="rounded-lg bg-white border border-neutral-200 flex px-3 py-2 items-center gap-2 w-64">
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
              className="bg-transparent outline-none text-sm leading-5 w-full text-neutral-700 placeholder:text-neutral-400"
              placeholder="Search..."
            />
          </div>
        )}

        {/* Notification bell */}
        <div className="relative cursor-pointer">
          <Bell className="size-5 text-neutral-500" />
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
            <div className="size-8 font-semibold rounded-full bg-neutral-900 text-white text-xs flex justify-center items-center">
              {initials}
            </div>
            {!isSubmitPage && (
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
            )}
          </div>
          {showDropdown && (
            <div className="absolute right-0 top-10 bg-white border border-neutral-200 rounded-xl shadow-lg w-48 py-1 z-50">
              <div className="px-3 py-2.5 border-b border-neutral-100">
                <p className="font-semibold text-sm text-neutral-900">
                  {user.fullName || "User"}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {user.email || ""}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
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