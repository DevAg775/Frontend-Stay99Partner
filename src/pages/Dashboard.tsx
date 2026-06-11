import {
  Building2,
  CheckCircle2,
  Clock,
  Plus,
  ShieldCheck,
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
import API from "@/api";

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

interface ActivityItem {
  type: "approved" | "documents_requested" | "submitted" | "rejected" | "verified";
  title: string;
  propertyName?: string;
  description?: string;
  time: string;
}

function getActivityItems(properties: Property[]): ActivityItem[] {
  const items: ActivityItem[] = [];
  properties.forEach((p) => {
    if (p.verificationStatus === "approved") {
      items.push({ type: "approved", title: "Property Approved", propertyName: p.propertyName, time: new Date(p.submissionDate).toLocaleDateString("en-IN") });
    } else if (p.verificationStatus === "rejected") {
      items.push({ type: "rejected", title: "Property Rejected", propertyName: p.propertyName, time: new Date(p.submissionDate).toLocaleDateString("en-IN") });
    } else if (p.verificationStatus === "under_review") {
      items.push({ type: "documents_requested", title: "Documents Requested", propertyName: p.propertyName, time: new Date(p.submissionDate).toLocaleDateString("en-IN") });
    } else {
      items.push({ type: "submitted", title: "Property Submitted", propertyName: p.propertyName, time: new Date(p.submissionDate).toLocaleDateString("en-IN") });
    }
  });
  return items.slice(0, 5);
}

function ActivityIcon({ type }: { type: ActivityItem["type"] }) {
  switch (type) {
    case "approved":
      return (
        <div className="flex items-center gap-2 shrink-0">
          <span className="size-2.5 rounded-full bg-green-500 shrink-0" />
          <div className="size-7 rounded-full border-2 border-green-500 flex items-center justify-center">
            <CheckCircle2 className="size-4 text-green-500" />
          </div>
        </div>
      );
    case "documents_requested":
      return (
        <div className="flex items-center gap-2 shrink-0">
          <span className="size-2.5 rounded-full bg-amber-400 shrink-0" />
          <div className="size-7 rounded-full border-2 border-amber-400 flex items-center justify-center">
            <svg className="size-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      );
    case "submitted":
      return (
        <div className="flex items-center gap-2 shrink-0">
          <span className="size-2.5 rounded-full bg-blue-500 shrink-0" />
          <div className="size-7 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <Upload className="size-4 text-blue-500" />
          </div>
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-center gap-2 shrink-0">
          <span className="size-2.5 rounded-full bg-red-500 shrink-0" />
          <div className="size-7 rounded-full border-2 border-red-400 flex items-center justify-center">
            <XCircle className="size-4 text-red-500" />
          </div>
        </div>
      );
    case "verified":
      return (
        <div className="flex items-center gap-2 shrink-0">
          <span className="size-2.5 rounded-full bg-neutral-400 shrink-0" />
          <div className="size-7 rounded-full border-2 border-neutral-400 flex items-center justify-center">
            <ShieldCheck className="size-4 text-neutral-500" />
          </div>
        </div>
      );
  }
}

export default function Dashboard() {
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
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
  try {
    const { data } = await API.get("/properties/my");

    setProperties(data);
    setStats({
      total: data.length,
      approved: data.filter((p: Property) => p.verificationStatus === "approved").length,
      pending: data.filter(
        (p: Property) =>
          p.verificationStatus === "pending" ||
          p.verificationStatus === "under_review"
      ).length,
      rejected: data.filter((p: Property) => p.verificationStatus === "rejected").length,
    });
  } catch (err: any) {
    if (err.response?.status === 401) navigate("/login");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-50 text-green-700 border-green-100 hover:bg-green-50">
            Approved
          </Badge>
        );
      case "pending":
      case "under_review":
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-50">
            Pending Review
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-50 text-red-600 border-red-100 hover:bg-red-50">
            Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const activityItems = getActivityItems(properties);

  return (
    <div className="bg-white dark:bg-neutral-950 text-neutral-950 dark:text-neutral-100 flex w-full h-fit min-h-screen overflow-visible">
      <Sidebar />
      <main className="bg-neutral-50 dark:bg-neutral-950 flex flex-col flex-1 overflow-hidden">
        <Header title="Dashboard" />

        <div className="flex p-8 flex-col flex-1 gap-6 overflow-auto">
          {loading ? (
            <div className="text-center text-neutral-500 py-12">Loading...</div>
          ) : (
            <>
              {/* ── Stat Cards ── */}
              <div className="grid grid-cols-4 gap-5">
                {/* Submitted */}
                <Card className="shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 gap-3 bg-white dark:bg-neutral-900">
                  <CardHeader className="p-0 gap-0">
                    <div className="flex justify-between items-start">
                      <span className="text-neutral-500 text-sm leading-5">
                        Submitted Properties
                      </span>
                      <div className="size-10 rounded-full bg-indigo-50 flex justify-center items-center">
                        <Building2 className="size-5 text-indigo-500" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 gap-1">
                    <span className="font-bold text-3xl leading-9 dark:text-neutral-100">{stats.total}</span>
                    <p className="text-neutral-500 text-xs leading-4 mt-1">+1 this month</p>
                  </CardContent>
                </Card>

                {/* Approved */}
                <Card className="shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 gap-3 bg-white dark:bg-neutral-900">
                  <CardHeader className="p-0 gap-0">
                    <div className="flex justify-between items-start">
                      <span className="text-neutral-500 text-sm leading-5">
                        Approved Properties
                      </span>
                      <div className="size-10 rounded-full bg-green-50 flex justify-center items-center">
                        <CheckCircle2 className="size-5 text-green-500" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 gap-1">
                    <span className="font-bold text-3xl leading-9 dark:text-neutral-100">{stats.approved}</span>
                    <p className="text-neutral-500 text-xs leading-4 mt-1">
                      {stats.total > 0
                        ? Math.round((stats.approved / stats.total) * 100)
                        : 0}
                      % approval rate
                    </p>
                  </CardContent>
                </Card>

                {/* Pending */}
                <Card className="shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 gap-3 bg-white dark:bg-neutral-900">
                  <CardHeader className="p-0 gap-0">
                    <div className="flex justify-between items-start">
                      <span className="text-neutral-500 text-sm leading-5">
                        Pending Reviews
                      </span>
                      <div className="size-10 rounded-full bg-amber-50 flex justify-center items-center">
                        <Clock className="size-5 text-amber-500" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 gap-1">
                    <span className="font-bold text-3xl leading-9 dark:text-neutral-100">{stats.pending}</span>
                    <p className="text-neutral-500 text-xs leading-4 mt-1">
                      Awaiting admin review
                    </p>
                  </CardContent>
                </Card>

                {/* Rejected */}
                <Card className="shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 gap-3 bg-white dark:bg-neutral-900">
                  <CardHeader className="p-0 gap-0">
                    <div className="flex justify-between items-start">
                      <span className="text-neutral-500 text-sm leading-5">
                        Rejected Properties
                      </span>
                      <div className="size-10 rounded-full bg-red-50 flex justify-center items-center">
                        <XCircle className="size-5 text-red-500" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 gap-1">
                    <span className="font-bold text-3xl leading-9 dark:text-neutral-100">{stats.rejected}</span>
                    <p className="text-neutral-500 text-xs leading-4 mt-1">
                      Requires resubmission
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* ── Submit Button ── */}
              <div className="flex justify-end">
                <Link to="/submit-property">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 px-5 py-2.5 rounded-lg font-medium text-sm">
                    <Plus className="size-4" />
                    Submit New Property
                  </Button>
                </Link>
              </div>

              {/* ── Recent Activity ── */}
              <Card className="shadow-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
                <CardHeader className="p-0 pb-4">
                  <h2 className="font-bold text-base leading-6 dark:text-neutral-100">Recent Activity</h2>
                </CardHeader>
                <CardContent className="p-0">
                  {activityItems.length === 0 ? (
                    <p className="text-neutral-500 text-sm py-4 text-center">
                      No activity yet. Submit your first property!
                    </p>
                  ) : (
                    <div className="flex flex-col">
                      {activityItems.map((item, i) => (
                        <div
                          key={i}
                          className={`flex py-4 items-center gap-4 ${
                            i > 0 ? "border-t border-neutral-100 dark:border-neutral-800" : ""
                          }`}
                        >
                          <ActivityIcon type={item.type} />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm leading-5 text-neutral-900 dark:text-neutral-100">
                              {item.title}
                            </p>
                            {item.propertyName && (
                              <p className="text-indigo-600 text-sm leading-5 truncate">
                                {item.propertyName}
                              </p>
                            )}
                            {item.description && (
                              <p className="text-neutral-500 text-sm leading-5">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <span className="text-neutral-400 text-xs leading-4 shrink-0">
                            {item.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* ── My Properties Table ── */}
              <Card className="shadow-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
                <CardHeader className="p-0 pb-4 flex-row justify-between items-center">
                  <h2 className="font-bold text-base leading-6 dark:text-neutral-100">My Properties</h2>
                  <Link
                    to="/my-properties"
                    className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:underline"
                  >
                    View All
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </CardHeader>
                <CardContent className="p-0">
                  {properties.length === 0 ? (
                    <p className="text-neutral-500 text-sm py-4 text-center">
                      No properties submitted yet.{" "}
                      <Link
                        to="/submit-property"
                        className="text-indigo-600 underline"
                      >
                        Submit your first property
                      </Link>
                    </p>
                  ) : (
                    <table className="text-sm leading-5 w-full">
                      <thead>
                        <tr className="text-left text-neutral-500 border-b border-neutral-200 dark:border-neutral-800">
                          <th className="font-medium pb-3">Property Name</th>
                          <th className="font-medium pb-3">Type</th>
                          <th className="font-medium pb-3">Status</th>
                          <th className="font-medium pb-3">Submitted Date</th>
                          <th className="font-medium text-right pb-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map((p) => (
                          <tr
                            key={p._id}
                            className="border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                          >
                            <td className="font-medium py-3 text-neutral-900 dark:text-neutral-100">
                              {p.propertyName}
                            </td>
                            <td className="text-neutral-500 py-3">{p.propertyType}</td>
                            <td className="py-3">
                              {getStatusBadge(p.verificationStatus)}
                            </td>
                            <td className="text-neutral-500 py-3">
                              {new Date(p.submissionDate).toLocaleDateString("en-IN")}
                            </td>
                            <td className="text-right py-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                              >
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
  );
}