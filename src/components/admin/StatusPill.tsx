type Status = "pending" | "under_review" | "approved" | "rejected" | string;

const CONFIG: Record<string, { label: string; cls: string }> = {
  pending: { label: "Pending Review", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  under_review: { label: "Under Review", cls: "bg-blue-50 text-blue-700 border-blue-200" },
  approved: { label: "Approved", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rejected: { label: "Rejected", cls: "bg-red-50 text-red-600 border-red-200" },
};

export default function StatusPill({ status }: { status: Status }) {
  const c = CONFIG[status] || { label: status, cls: "bg-neutral-100 text-neutral-600 border-neutral-200" };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${c.cls}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {c.label}
    </span>
  );
}
