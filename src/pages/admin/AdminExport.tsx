import { useEffect, useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import API from "@/api";

const DATE_PRESETS = ["Last 7 Days", "Last 30 Days", "Last 3 Months", "This Year", "All Time"];

const STATUS_FILTERS = [
  { key: "all", label: "All Statuses", cls: "text-neutral-700" },
  { key: "pending", label: "Pending Review", cls: "text-amber-700" },
  { key: "under_review", label: "Under Review", cls: "text-blue-700" },
  { key: "approved", label: "Approved", cls: "text-emerald-700" },
  { key: "rejected", label: "Rejected", cls: "text-red-600" },
];

const DATA_FIELDS = [
  { key: "properties", label: "Properties Data" },
  { key: "owner", label: "Owner Information" },
  { key: "business", label: "Business Details" },
  { key: "documents", label: "Documents Status" },
  { key: "photos", label: "Photos Count" },
  { key: "timeline", label: "Timeline History" },
];

export default function AdminExport() {
  const navigate = useNavigate();
  const [preset, setPreset] = useState("Last 30 Days");
  const [statusSel, setStatusSel] = useState<Record<string, boolean>>({
    all: true,
    pending: true,
    under_review: true,
    approved: true,
    rejected: true,
  });
  const [fieldSel, setFieldSel] = useState<Record<string, boolean>>({
    properties: true,
    owner: true,
    business: true,
    documents: true,
    photos: false,
    timeline: false,
  });
  const [estimated, setEstimated] = useState(0);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "admin") {
      navigate("/admin/login");
      return;
    }
    API.get("/admin/stats")
      .then((res) => setEstimated(res.data.total || 0))
      .catch(() => {});
  }, []);

  const toggleStatus = (key: string) =>
    setStatusSel((s) => ({ ...s, [key]: !s[key] }));
  const toggleField = (key: string) =>
    setFieldSel((s) => ({ ...s, [key]: !s[key] }));

  const downloadExcel = async () => {
    setDownloading(true);
    try {
      const res = await API.get("/admin/export/properties", { responseType: "blob" });
      const url = URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `propverify-properties.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const downloadCsv = async () => {
    setDownloading(true);
    try {
      const res = await API.get("/admin/properties", { params: { limit: 100000 } });
      const rows = res.data.properties || [];
      const headers = [
        "Application ID",
        "Property Name",
        "Type",
        "Owner",
        "Email",
        "Mobile",
        "City",
        "State",
        "Status",
        "Submitted",
      ];
      const lines = rows.map((p: any) =>
        [
          p.applicationId,
          p.propertyName,
          p.propertyType,
          p.ownerFullName,
          p.ownerEmail,
          p.ownerMobile,
          p.city,
          p.state,
          p.verificationStatus,
          new Date(p.submissionDate).toLocaleDateString("en-IN"),
        ]
          .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
          .join(",")
      );
      const csv = [headers.join(","), ...lines].join("\n");
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = `propverify-properties.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-950 text-neutral-950 dark:text-neutral-100 flex w-full min-h-screen">
      <AdminSidebar />
      <main className="bg-neutral-50 dark:bg-neutral-950 flex flex-col flex-1 overflow-hidden">
        <AdminHeader title="Export Data" />

        <div className="flex p-8 flex-col flex-1 gap-6 overflow-auto">
          {/* Heading */}
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Download className="size-5 text-indigo-600" />
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl text-neutral-900 dark:text-neutral-100">Export Data</h2>
              <p className="text-neutral-500 text-sm">
                Download property and user data as Excel or CSV files
              </p>
            </div>
          </div>

          <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm bg-white dark:bg-neutral-900 p-0 overflow-hidden max-w-4xl">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
              <FileText className="size-5 text-neutral-700 dark:text-neutral-300" />
              <h3 className="font-semibold text-base dark:text-neutral-100">Export Configuration</h3>
            </div>

            <div className="p-6 flex flex-col gap-7">
              {/* Date range */}
              <div className="flex flex-col gap-3">
                <span className="text-neutral-400 text-xs uppercase tracking-wide font-medium">
                  Date Range
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">From Date</label>
                    <input
                      type="date"
                      className="rounded-lg border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-200 outline-none focus:border-indigo-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">To Date</label>
                    <input
                      type="date"
                      className="rounded-lg border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-200 outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {DATE_PRESETS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setPreset(d)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        preset === d
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status filter */}
              <div className="flex flex-col gap-3">
                <span className="text-neutral-400 text-xs uppercase tracking-wide font-medium">
                  Status Filter
                </span>
                <div className="flex flex-wrap gap-2">
                  {STATUS_FILTERS.map((s) => (
                    <label
                      key={s.key}
                      className="flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      <input
                        type="checkbox"
                        checked={!!statusSel[s.key]}
                        onChange={() => toggleStatus(s.key)}
                        className="accent-indigo-600"
                      />
                      <span className={s.cls}>{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Data to export */}
              <div className="flex flex-col gap-3">
                <span className="text-neutral-400 text-xs uppercase tracking-wide font-medium">
                  Data to Export
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {DATA_FIELDS.map((f) => (
                    <label
                      key={f.key}
                      className="flex items-center gap-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-sm cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      <input
                        type="checkbox"
                        checked={!!fieldSel[f.key]}
                        onChange={() => toggleField(f.key)}
                        className="accent-indigo-600 size-4"
                      />
                      <span className="text-neutral-700 dark:text-neutral-300">{f.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
              <span className="text-sm text-neutral-600 dark:text-neutral-300">
                Estimated records: <span className="font-semibold text-neutral-900 dark:text-neutral-100">{estimated} properties</span>
              </span>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800">
                  <RefreshCw className="size-4" />
                  Recalculate
                </button>
                <Button
                  variant="outline"
                  disabled={downloading}
                  onClick={downloadCsv}
                  className="rounded-lg gap-2 border-neutral-200"
                >
                  <FileText className="size-4" />
                  Download CSV
                </Button>
                <Button
                  disabled={downloading}
                  onClick={downloadExcel}
                  className="rounded-lg gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <FileSpreadsheet className="size-4" />
                  {downloading ? "Preparing..." : "Download Excel"}
                </Button>
              </div>
            </div>
          </Card>

          {/* Compliance note */}
          <div className="rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex p-4 items-start gap-2.5 max-w-4xl">
            <ShieldCheck className="size-4 shrink-0 text-neutral-500 mt-0.5" />
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-5">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">All exports are logged for compliance.</span>{" "}
              Data is encrypted in transit. Exports contain personally identifiable information — handle with care.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
