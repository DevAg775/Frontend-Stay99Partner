import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/useTheme";

export default function ThemeToggle() {
  const { isDark, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-1 border border-neutral-200 dark:border-neutral-700 rounded-lg p-1">
      <button
        aria-label="Light mode"
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-md transition-colors ${
          !isDark
            ? "bg-neutral-100 text-neutral-700"
            : "text-neutral-400 hover:text-neutral-200"
        }`}
      >
        <Sun className="size-4" />
      </button>
      <button
        aria-label="Dark mode"
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-md transition-colors ${
          isDark
            ? "bg-neutral-700 text-neutral-100"
            : "text-neutral-400 hover:text-neutral-700"
        }`}
      >
        <Moon className="size-4" />
      </button>
    </div>
  );
}
