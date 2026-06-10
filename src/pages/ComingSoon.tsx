import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.role === "admin";
  const dashboardPath = isAdmin ? "/admin/dashboard" : "/dashboard";

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm">
        <div className="size-20 rounded-full bg-[oklch(0.45_0.22_277/0.1)] flex items-center justify-center">
          <Clock className="size-10 text-[oklch(0.45_0.22_277)]" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl text-neutral-950 dark:text-neutral-100">Coming Soon</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            This feature is under development. Check back soon!
          </p>
        </div>
        <Link
          to={dashboardPath}
          className="flex items-center gap-2 text-sm font-medium text-[oklch(0.45_0.22_277)] hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}