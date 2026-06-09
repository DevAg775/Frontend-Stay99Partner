import { Bell, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface Crumb {
  label: string;
  to?: string;
}

interface AdminHeaderProps {
  title?: string;
  breadcrumb?: Crumb[];
}

export default function AdminHeader({ title, breadcrumb }: AdminHeaderProps) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = user.fullName
    ? user.fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  return (
    <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex px-8 py-4 justify-between items-center relative z-10">
      {/* Left: title or breadcrumb */}
      {breadcrumb ? (
        <div className="flex items-center gap-2 text-sm">
          {breadcrumb.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="size-4 text-neutral-400" />}
              {c.to ? (
                <Link
                  to={c.to}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">{c.label}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h1 className="font-bold text-neutral-950 dark:text-neutral-100 text-xl leading-7">{title}</h1>
      )}

      {/* Right: actions */}
      <div className="flex items-center gap-3">
        {/* Theme toggle pills */}
        <ThemeToggle />

        {/* Notification bell */}
        <div className="relative cursor-pointer">
          <Bell className="size-5 text-neutral-500 dark:text-neutral-400" />
          <span className="size-2.5 rounded-full bg-red-500 absolute -right-0.5 -top-0.5 ring-2 ring-white dark:ring-neutral-900" />
        </div>

        {/* Admin avatar */}
        <div className="size-9 font-semibold rounded-full bg-neutral-900 dark:bg-indigo-600 text-white text-xs flex justify-center items-center">
          {initials}
        </div>
      </div>
    </header>
  );
}
