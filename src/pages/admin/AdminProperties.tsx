import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Search,
  SlidersHorizontal,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusPill from "@/components/admin/StatusPill";
import API from "@/api";

interface Property {
  _id: string;
  applicationId: string;
  propertyName: string;
  ownerFullName: string;
  propertyType: string;
  city: string;
  verificationStatus: string;
  submissionDate: string;
}

const FILTERS = [
  { key: "", label: "All", active: "bg-indigo-600 text-white border-indigo-600" },
  { key: "pending", label: "Pending Review", active: "bg-amber-50 text-amber-700 border-amber-300" },
  { key: "under_review", label: "Under Review", active: "bg-blue-50 text-blue-700 border-blue-300" },
  { key: "approved", label: "Approved", active: "bg-emerald-50 text-emerald-700 border-emerald-300" },
  { key: "rejected", label: "Rejected", active: "bg-red-50 text-red-600 border-red-300" },
];

const LIMIT = 8;

export default function AdminProperties() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "";

  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "admin") {
      navigate("/admin/login");
      return;
    }
  }, []);

  const fetchProperties = () => {
    setLoading(true);
    API.get("/admin/properties", {
      params: { status: status || undefined, page, limit: LIMIT },
    })
      .then((res) => {
        setProperties(res.data.properties || []);
        setTotal(res.data.total || 0);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProperties();
  }, [status, page]);

  const setStatus = (key: string) => {
    setPage(1);
    setSearchParams(key ? { status: key } : {});
  };

  const approve = async (id: string) => {
    setBusyId(id);
    try {
      await API.patch(`/admin/properties/${id}/approve`, {});
      fetchProperties();
    } finally {
      setBusyId(null);
    }
  };

  const reject = async (id: string) => {
    const reason = window.prompt("Reason for rejection:");
    if (!reason) return;
    setBusyId(id);
    try {
      await API.patch(`/admin/properties/${id}/reject`, { rejectionReason: reason });
      fetchProperties();
    } finally {
      setBusyId(null);
    }
  };

  const visible = properties.filter(
    (p) =>
      !search ||
      p.propertyName.toLowerCase().includes(search.toLowerCase()) ||
      p.ownerFullName?.toLowerCase().includes(search.toLowerCase())
  );

  const from = total === 0 ? 0 : (page - 1) * LIMIT + 1;
  const to = Math.min(page * LIMIT, total);

  return (
    <div className="bg-white text-neutral-950 flex w-full min-h-screen">
      <AdminSidebar />
      <main className="bg-neutral-50 flex flex-col flex-1 overflow-hidden">
        <AdminHeader title="Properties" />

        <div className="flex p-8 flex-col flex-1 gap-5 overflow-auto">
          {/* Heading */}
          <div className="flex justify-between items-center">
            <div className="flex items-baseline gap-3">
              <h2 className="font-bold text-2xl text-neutral-900">All Properties</h2>
              <span className="text-neutral-500 text-sm">{total} total</span>
            </div>
            <Link to="/admin/export">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 rounded-lg">
                <Download className="size-4" />
                Export
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card className="border border-neutral-200 shadow-sm bg-white p-4 gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="rounded-lg bg-neutral-50 border border-neutral-200 flex px-3 py-2 items-center gap-2 flex-1 min-w-60">
                <Search className="size-4 text-neutral-400" />
                <input
                  className="bg-transparent outline-none text-sm w-full text-neutral-700 placeholder:text-neutral-400"
                  placeholder="Search by property name or owner..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setStatus(f.key)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      status === f.key
                        ? f.active
                        : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
                <button className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 flex items-center gap-1.5 hover:bg-neutral-50">
                  <SlidersHorizontal className="size-3.5" />
                  Filter
                </button>
              </div>
            </div>
          </Card>

          {/* Table */}
          <Card className="border border-neutral-200 shadow-sm bg-white p-0 overflow-hidden">
            {loading ? (
              <div className="text-center text-neutral-500 py-12">Loading...</div>
            ) : visible.length === 0 ? (
              <div className="text-center text-neutral-500 py-12">No properties found.</div>
            ) : (
              <table className="text-sm w-full">
                <thead>
                  <tr className="text-left text-neutral-400 border-b border-neutral-200 text-xs uppercase tracking-wide bg-neutral-50">
                    <th className="font-medium px-6 py-3">App ID</th>
                    <th className="font-medium px-6 py-3">Property Name</th>
                    <th className="font-medium px-6 py-3">Owner</th>
                    <th className="font-medium px-6 py-3">Type</th>
                    <th className="font-medium px-6 py-3">City</th>
                    <th className="font-medium px-6 py-3">Status</th>
                    <th className="font-medium px-6 py-3">Submitted</th>
                    <th className="font-medium px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((p) => (
                    <tr key={p._id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50">
                      <td className="px-6 py-3 text-indigo-600 font-mono text-xs font-medium">{p.applicationId}</td>
                      <td className="px-6 py-3 font-medium text-neutral-900">{p.propertyName}</td>
                      <td className="px-6 py-3 text-neutral-600">{p.ownerFullName}</td>
                      <td className="px-6 py-3 text-neutral-600">{p.propertyType}</td>
                      <td className="px-6 py-3 text-neutral-600">{p.city}</td>
                      <td className="px-6 py-3"><StatusPill status={p.verificationStatus} /></td>
                      <td className="px-6 py-3 text-neutral-500">
                        {new Date(p.submissionDate).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/admin/properties/${p._id}`} title="View" className="text-neutral-400 hover:text-indigo-600">
                            <Eye className="size-4" />
                          </Link>
                          <button
                            title="Approve"
                            disabled={busyId === p._id}
                            onClick={() => approve(p._id)}
                            className="text-neutral-400 hover:text-emerald-600 disabled:opacity-40"
                          >
                            <CheckCircle2 className="size-4" />
                          </button>
                          <button
                            title="Reject"
                            disabled={busyId === p._id}
                            onClick={() => reject(p._id)}
                            className="text-neutral-400 hover:text-red-500 disabled:opacity-40"
                          >
                            <XCircle className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-neutral-200">
              <span className="text-neutral-500 text-sm">
                Showing {from}-{to} of {total} results
              </span>
              <div className="flex items-center gap-1">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="flex items-center gap-1 rounded-md border border-neutral-200 px-2.5 py-1.5 text-sm text-neutral-600 disabled:opacity-40 hover:bg-neutral-50"
                >
                  <ChevronLeft className="size-4" /> Previous
                </button>
                <span className="px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-600 text-white">
                  {page}
                </span>
                <span className="text-neutral-400 text-sm px-1">of {totalPages}</span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="flex items-center gap-1 rounded-md border border-neutral-200 px-2.5 py-1.5 text-sm text-neutral-600 disabled:opacity-40 hover:bg-neutral-50"
                >
                  Next <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
