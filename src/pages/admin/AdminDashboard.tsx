import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Users,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusPill from "@/components/admin/StatusPill";
import API from "@/api";

interface Stats {
  total: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
  totalUsers: number;
}

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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "admin") {
      navigate("/admin/login");
      return;
    }
    Promise.all([
      API.get("/admin/stats"),
      API.get("/admin/properties", { params: { limit: 5 } }),
    ])
      .then(([s, p]) => {
        setStats(s.data);
        setRecent(p.data.properties || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const cards = [
    { label: "Total Properties", value: stats?.total ?? 0, sub: "All submissions", icon: <Building2 className="size-5 text-indigo-500" />, bg: "bg-indigo-50" },
    { label: "Pending Review", value: stats?.pending ?? 0, sub: "Awaiting action", icon: <Clock className="size-5 text-amber-500" />, bg: "bg-amber-50" },
    { label: "Approved", value: stats?.approved ?? 0, sub: "Successfully verified", icon: <CheckCircle2 className="size-5 text-emerald-500" />, bg: "bg-emerald-50" },
    { label: "Rejected", value: stats?.rejected ?? 0, sub: "Did not qualify", icon: <XCircle className="size-5 text-red-500" />, bg: "bg-red-50" },
    { label: "Total Users", value: stats?.totalUsers ?? 0, sub: "Registered owners", icon: <Users className="size-5 text-blue-500" />, bg: "bg-blue-50" },
  ];

  return (
    <div className="bg-white text-neutral-950 flex w-full min-h-screen">
      <AdminSidebar pendingCount={stats?.pending} />
      <main className="bg-neutral-50 flex flex-col flex-1 overflow-hidden">
        <AdminHeader title="Dashboard" />

        <div className="flex p-8 flex-col flex-1 gap-6 overflow-auto">
          {loading ? (
            <div className="text-center text-neutral-500 py-12">Loading...</div>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-2xl text-neutral-900">Welcome back, Admin</h2>
                <p className="text-neutral-500 text-sm">{today}</p>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-5 gap-4 max-xl:grid-cols-3 max-md:grid-cols-2">
                {cards.map((c) => (
                  <Card key={c.label} className="border border-neutral-200 shadow-sm bg-white p-5 gap-3">
                    <div className="flex justify-between items-start">
                      <span className="text-neutral-500 text-xs uppercase tracking-wide font-medium">
                        {c.label}
                      </span>
                      <div className={`size-9 rounded-lg flex justify-center items-center ${c.bg}`}>
                        {c.icon}
                      </div>
                    </div>
                    <span className="font-bold text-3xl leading-9">{c.value.toLocaleString("en-IN")}</span>
                    <span className="text-neutral-400 text-xs">{c.sub}</span>
                  </Card>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <Link to="/admin/properties?status=pending">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 rounded-lg">
                    <Clock className="size-4" />
                    Review Pending
                  </Button>
                </Link>
                <Link to="/admin/export">
                  <Button variant="outline" className="rounded-lg gap-2 border-neutral-200">
                    <Download className="size-4" />
                    Export Report
                  </Button>
                </Link>
                <Link to="/admin/users">
                  <Button variant="outline" className="rounded-lg gap-2 border-neutral-200">
                    <Users className="size-4" />
                    Manage Users
                  </Button>
                </Link>
              </div>

              {/* Recent submissions */}
              <Card className="border border-neutral-200 shadow-sm bg-white p-6">
                <div className="flex justify-between items-center pb-4">
                  <div className="flex flex-col">
                    <h3 className="font-bold text-base">Recent Submissions</h3>
                    <span className="text-neutral-500 text-xs">Latest 5 property applications</span>
                  </div>
                  <Link
                    to="/admin/properties"
                    className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:underline"
                  >
                    <ExternalLink className="size-4" />
                    View All
                  </Link>
                </div>
                {recent.length === 0 ? (
                  <p className="text-neutral-500 text-sm py-6 text-center">No submissions yet.</p>
                ) : (
                  <table className="text-sm w-full">
                    <thead>
                      <tr className="text-left text-neutral-400 border-b border-neutral-200 text-xs uppercase tracking-wide">
                        <th className="font-medium pb-3">App ID</th>
                        <th className="font-medium pb-3">Property Name</th>
                        <th className="font-medium pb-3">Owner</th>
                        <th className="font-medium pb-3">Type</th>
                        <th className="font-medium pb-3">City</th>
                        <th className="font-medium pb-3">Status</th>
                        <th className="font-medium pb-3">Submitted</th>
                        <th className="font-medium pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recent.map((p) => (
                        <tr key={p._id} className="border-b border-neutral-100 last:border-0">
                          <td className="py-3 text-neutral-500 font-mono text-xs">{p.applicationId}</td>
                          <td className="py-3 font-medium text-neutral-900">{p.propertyName}</td>
                          <td className="py-3 text-neutral-600">{p.ownerFullName}</td>
                          <td className="py-3 text-neutral-600">{p.propertyType}</td>
                          <td className="py-3 text-neutral-600">{p.city}</td>
                          <td className="py-3"><StatusPill status={p.verificationStatus} /></td>
                          <td className="py-3 text-neutral-500">
                            {new Date(p.submissionDate).toLocaleDateString("en-IN")}
                          </td>
                          <td className="py-3 text-right">
                            <Link
                              to={`/admin/properties/${p._id}`}
                              className="text-indigo-600 font-medium hover:underline"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
