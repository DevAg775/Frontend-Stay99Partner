import { useEffect } from "react";

/**
 * Forces light mode while the component is mounted, then restores the user's
 * saved theme on unmount. Use on light-only pages (public landing + auth pages)
 * so an enabled dark theme doesn't turn shadcn token components black / hide text.
 * Does not touch localStorage, so the dashboard/admin keep the user's preference.
 */
export function useForceLight() {
  useEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");
    root.classList.remove("dark");
    return () => {
      if (wasDark) root.classList.add("dark");
    };
  }, []);
}
