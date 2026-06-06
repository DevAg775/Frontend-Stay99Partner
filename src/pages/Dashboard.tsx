import {
  Building2,
  CheckCircle2,
  
  Clock,
  Plus,
  Upload,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
interface Property {
  _id: string;
  propertyName: string;
  propertyType: string;
  verificationStatus: "pending" | "under_review" | "approved" | "rejected";
  submissionDate: string;
}

interface Stats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
}

export default function Screen5() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProperties(token);
  }, []);

  const fetchProperties = async (token: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/properties/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) navigate("/login");
        return;
      }

      setProperties(data);
      setStats({
        total: data.length,
        approved: data.filter((p: Property) => p.verificationStatus === "approved").length,
        pending: data.filter((p: Property) => p.verificationStatus === "pending" || p.verificationStatus === "under_review").length,
        rejected: data.filter((p: Property) => p.verificationStatus === "rejected").length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-[oklch(0.6_0.17_150/0.12)] text-[oklch(0.5_0.15_150)] border-0">Approved</Badge>;
      case "pending":
      case "under_review":
        return <Badge className="bg-[oklch(0.78_0.16_75/0.15)] text-[oklch(0.55_0.13_75)] border-0">Pending Review</Badge>;
      case "rejected":
        return <Badge className="bg-[oklch(0.577_0.245_27.325/0.12)] text-[#e7000b] border-0">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div>
      <div className="bg-white text-neutral-950 flex w-full h-fit min-h-screen overflow-visible">
        <Sidebar />
        <main className="bg-[oklch(0.98_0.005_250)] flex flex-col flex-1 overflow-hidden">
          <Header title="Dashboard" />

          <div className="flex p-8 flex-col flex-1 gap-6 overflow-auto">
            {loading ? (
              <div className="text-center text-neutral-500 py-12">Loading...</div>
            ) : (
              <>
                <div className="grid grid-cols-4 gap-6">
                  <Card className="border-l-[oklch(0.45_0.22_277)] shadow-sm border-l-4 p-6 gap-4">
                    <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                      <span className="text-neutral-500 text-sm leading-5">Submitted Properties</span>
                      <div className="size-9 bg-[oklch(0.45_0.22_277/0.1)] rounded-lg flex justify-center items-center">
                        <Building2 className="size-5 text-[oklch(0.45_0.22_277)]" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 gap-1">
                      <span className="font-bold text-3xl leading-9">{stats.total}</span>
                      <p className="text-neutral-500 text-xs leading-4">Total submitted</p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-[oklch(0.6_0.17_150)] shadow-sm border-l-4 p-6 gap-4">
                    <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                      <span className="text-neutral-500 text-sm leading-5">Approved Properties</span>
                      <div className="size-9 bg-[oklch(0.6_0.17_150/0.12)] rounded-lg flex justify-center items-center">
                        <CheckCircle2 className="size-5 text-[oklch(0.6_0.17_150)]" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 gap-1">
                      <span className="font-bold text-3xl leading-9">{stats.approved}</span>
                      <p className="text-neutral-500 text-xs leading-4">
                        {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}% approval rate
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-[oklch(0.78_0.16_75)] shadow-sm border-l-4 p-6 gap-4">
                    <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                      <span className="text-neutral-500 text-sm leading-5">Pending Reviews</span>
                      <div className="size-9 bg-[oklch(0.78_0.16_75/0.15)] rounded-lg flex justify-center items-center">
                        <Clock className="size-5 text-[oklch(0.6_0.14_75)]" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 gap-1">
                      <span className="font-bold text-3xl leading-9">{stats.pending}</span>
                      <p className="text-neutral-500 text-xs leading-4">Awaiting admin review</p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-destructive shadow-sm border-l-4 p-6 gap-4">
                    <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                      <span className="text-neutral-500 text-sm leading-5">Rejected Properties</span>
                      <div className="size-9 bg-[oklch(0.577_0.245_27.325/0.12)] rounded-lg flex justify-center items-center">
                        <XCircle className="size-5 text-[#e7000b]" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 gap-1">
                      <span className="font-bold text-3xl leading-9">{stats.rejected}</span>
                      <p className="text-neutral-500 text-xs leading-4">Requires resubmission</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end">
                  <Link to="/submit-property">
                    <Button className="bg-[oklch(0.45_0.22_277)] text-neutral-50 gap-2">
                      <Plus className="size-4" />
                      Submit New Property
                    </Button>
                  </Link>
                </div>

                <Card className="shadow-sm p-6 gap-4">
                  <CardHeader className="p-0 gap-2">
                    <h2 className="font-bold text-base leading-6">Recent Activity</h2>
                  </CardHeader>
                  <CardContent className="p-0 gap-0">
                    {properties.length === 0 ? (
                      <p className="text-neutral-500 text-sm py-4 text-center">No activity yet. Submit your first property!</p>
                    ) : (
                      properties.slice(0, 5).map((p, i) => (
                        <div key={p._id} className={`flex py-3 items-start gap-4 ${i > 0 ? "border-t border-neutral-200" : ""}`}>
                          <Upload className="size-4 text-[oklch(0.55_0.18_255)] mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm leading-5">Property Submitted</p>
                            <p className="text-[oklch(0.45_0.22_277)] text-sm leading-5">{p.propertyName}</p>
                          </div>
                          <span className="text-neutral-500 text-xs leading-4">
                            {new Date(p.submissionDate).toLocaleDateString("en-IN")}
                          </span>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>

                <Card className="shadow-sm p-6 gap-4">
                  <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                    <h2 className="font-bold text-base leading-6">My Properties</h2>
                  </CardHeader>
                  <CardContent className="p-0 gap-0">
                    {properties.length === 0 ? (
                      <p className="text-neutral-500 text-sm py-4 text-center">
                        No properties submitted yet.{" "}
                        <Link to="/submit-property" className="text-[oklch(0.45_0.22_277)] underline">
                          Submit your first property
                        </Link>
                      </p>
                    ) : (
                      <table className="text-sm leading-5 w-full">
                        <thead>
                          <tr className="text-left text-neutral-500 border-b border-neutral-200">
                            <th className="font-medium pb-2">Property Name</th>
                            <th className="font-medium pb-2">Type</th>
                            <th className="font-medium pb-2">Status</th>
                            <th className="font-medium pb-2">Submitted Date</th>
                            <th className="font-medium text-right pb-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {properties.map((p) => (
                            <tr key={p._id} className="border-b border-neutral-200 last:border-0">
                              <td className="font-medium py-3">{p.propertyName}</td>
                              <td className="text-neutral-500 py-3">{p.propertyType}</td>
                              <td className="py-3">{getStatusBadge(p.verificationStatus)}</td>
                              <td className="text-neutral-500 py-3">
                                {new Date(p.submissionDate).toLocaleDateString("en-IN")}
                              </td>
                              <td className="text-right py-3">
                                <Button variant="ghost" size="sm" className="text-[oklch(0.45_0.22_277)]">
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}