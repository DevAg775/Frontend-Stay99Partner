import { useEffect, useState } from "react";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Circle,
  FileText,
  Image as ImageIcon,
  Info,
  MapPin,
  ShieldCheck,
  Sliders,
  User,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusPill from "@/components/admin/StatusPill";
import API from "@/api";

const ORIGIN = "http://localhost:5000";
const fileUrl = (p?: string) =>
  !p ? "" : p.startsWith("http") ? p : `${ORIGIN}/${p.replace(/^\/+/, "")}`;

const AMENITY_LABELS: Record<string, string> = {
  wifi: "Free WiFi",
  parking: "Parking",
  restaurant: "Restaurant",
  airConditioning: "Air Conditioning",
  roomService: "Room Service",
  swimmingPool: "Swimming Pool",
  gym: "Gym/Fitness",
  conferenceHall: "Conference Room",
  spa: "Spa",
  airportPickup: "Airport Pickup",
  petFriendly: "Pet Friendly",
};

interface Property {
  _id: string;
  applicationId: string;
  ownerFullName: string;
  ownerEmail: string;
  ownerMobile: string;
  ownerDesignation: string;
  businessEntityType: string;
  businessName: string;
  businessRegistrationNumber?: string;
  gstNumber?: string;
  panNumber: string;
  propertyName: string;
  propertyType: string;
  propertyDescription?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  totalRooms: number;
  checkInTime: string;
  checkOutTime: string;
  amenities: Record<string, boolean>;
  media: {
    coverImage?: string;
    exteriorPhotos: string[];
    interiorPhotos: string[];
    roomPhotos: string[];
  };
  documents: Record<string, string | undefined>;
  digilocker?: { verified: boolean };
  verificationStatus: string;
  submissionDate: string;
  approvalDate?: string;
  rejectionReason?: string;
  reviewNotes?: string;
}

function Section({
  num,
  icon,
  title,
  children,
}: {
  num: number;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border border-neutral-200 shadow-sm bg-white p-5 gap-4">
      <div className="flex items-center gap-3">
        <div className="size-7 rounded-full bg-neutral-900 text-white text-xs font-semibold flex items-center justify-center">
          {num}
        </div>
        <div className="flex items-center gap-2 text-neutral-900">
          {icon}
          <h3 className="font-semibold text-sm">{title}</h3>
        </div>
      </div>
      {children}
    </Card>
  );
}

function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-neutral-400 text-xs uppercase tracking-wide">{label}</span>
      <span className="text-neutral-900 text-sm font-medium">{value || "—"}</span>
    </div>
  );
}

const DOC_LABELS: { key: string; label: string; required?: boolean }[] = [
  { key: "panCard", label: "PAN Card", required: true },
  { key: "gstCertificate", label: "GST Certificate" },
  { key: "businessRegistrationCertificate", label: "Business Registration Certificate" },
  { key: "propertyOwnershipProof", label: "Ownership Proof", required: true },
  { key: "leaseAgreement", label: "Lease Agreement" },
];

export default function AdminPropertyReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewNotes, setReviewNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "admin") {
      navigate("/admin/login");
      return;
    }
    API.get(`/admin/properties/${id}`)
      .then((res) => {
        setProperty(res.data.property);
        setReviewNotes(res.data.property.reviewNotes || "");
        setRejectionReason(res.data.property.rejectionReason || "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const refresh = async () => {
    const res = await API.get(`/admin/properties/${id}`);
    setProperty(res.data.property);
  };

  const doAction = async (action: "approve" | "reject" | "under-review") => {
    if (action === "reject" && !rejectionReason.trim()) {
      alert("Please provide a rejection reason.");
      return;
    }
    setBusy(true);
    try {
      const body =
        action === "approve"
          ? { reviewNotes }
          : action === "reject"
          ? { rejectionReason, reviewNotes }
          : {};
      await API.patch(`/admin/properties/${id}/${action}`, body);
      await refresh();
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white flex w-full min-h-screen">
        <AdminSidebar />
        <main className="bg-neutral-50 flex-1 flex items-center justify-center text-neutral-500">
          Loading...
        </main>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="bg-white flex w-full min-h-screen">
        <AdminSidebar />
        <main className="bg-neutral-50 flex-1 flex items-center justify-center text-neutral-500">
          Property not found.
        </main>
      </div>
    );
  }

  const photos = [
    property.media?.coverImage,
    ...(property.media?.exteriorPhotos || []),
    ...(property.media?.interiorPhotos || []),
    ...(property.media?.roomPhotos || []),
  ].filter(Boolean) as string[];

  const activeAmenities = Object.entries(property.amenities || {})
    .filter(([, v]) => v)
    .map(([k]) => AMENITY_LABELS[k] || k);

  const verified = (key: string) =>
    property.digilocker?.verified &&
    (key === "panCard" || key === "gstCertificate");

  const timeline = [
    { label: "Submitted", note: "Application submitted by owner", date: property.submissionDate, done: true },
    { label: "Under Review", note: "Assigned to reviewer", date: property.submissionDate, done: property.verificationStatus !== "pending" },
    { label: "Documents Verified", note: "Identity & business checks", date: property.approvalDate, done: property.verificationStatus === "approved" },
    {
      label: property.verificationStatus === "rejected" ? "Rejected" : "Decision",
      note:
        property.verificationStatus === "approved"
          ? "Application approved"
          : property.verificationStatus === "rejected"
          ? property.rejectionReason || "Application rejected"
          : "Awaiting decision",
      date: property.approvalDate,
      done: property.verificationStatus === "approved" || property.verificationStatus === "rejected",
    },
  ];

  return (
    <div className="bg-white text-neutral-950 flex w-full min-h-screen">
      <AdminSidebar />
      <main className="bg-neutral-50 flex flex-col flex-1 overflow-hidden">
        <AdminHeader
          breadcrumb={[
            { label: "Properties", to: "/admin/properties" },
            { label: property.applicationId },
          ]}
        />

        <div className="flex p-8 flex-col flex-1 gap-6 overflow-auto">
          {/* Title row */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-indigo-600 font-medium">
                  {property.applicationId}
                </span>
                <StatusPill status={property.verificationStatus} />
              </div>
              <h1 className="font-bold text-2xl text-neutral-900">{property.propertyName}</h1>
              <p className="text-neutral-500 text-sm">
                Submitted {new Date(property.submissionDate).toLocaleDateString("en-IN")} ·{" "}
                {property.ownerFullName}
              </p>
            </div>
            <Button variant="outline" className="rounded-lg gap-2 border-neutral-200">
              <FileText className="size-4" />
              Export PDF
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
            {/* Left column */}
            <div className="col-span-2 flex flex-col gap-4 max-lg:col-span-1">
              <Section num={1} icon={<User className="size-4" />} title="Owner Information">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Full Name" value={property.ownerFullName} />
                  <Field label="Email Address" value={property.ownerEmail} />
                  <Field label="Mobile Number" value={`+91 ${property.ownerMobile}`} />
                  <Field label="Designation" value={property.ownerDesignation} />
                </div>
              </Section>

              <Section num={2} icon={<Briefcase className="size-4" />} title="Business Information">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Business Type" value={property.businessEntityType} />
                  <Field label="Registration Number" value={property.businessRegistrationNumber} />
                  <Field
                    label="GST Number"
                    value={
                      <span className="flex items-center gap-1.5">
                        {property.gstNumber || "—"}
                        {verified("gstCertificate") && <CheckCircle2 className="size-3.5 text-emerald-500" />}
                      </span>
                    }
                  />
                  <Field
                    label="PAN Number"
                    value={
                      <span className="flex items-center gap-1.5">
                        {property.panNumber}
                        {verified("panCard") && <CheckCircle2 className="size-3.5 text-emerald-500" />}
                      </span>
                    }
                  />
                </div>
              </Section>

              <Section num={3} icon={<Building2 className="size-4" />} title="Property Information">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Property Name" value={property.propertyName} />
                  <Field label="Property Type" value={property.propertyType} />
                </div>
                {property.propertyDescription && (
                  <p className="text-neutral-600 text-sm leading-5">{property.propertyDescription}</p>
                )}
                <div className="flex items-start gap-2 text-neutral-600 text-sm">
                  <MapPin className="size-4 shrink-0 text-neutral-400 mt-0.5" />
                  <span>
                    {property.address}, {property.city}, {property.state} {property.pincode}
                  </span>
                </div>
              </Section>

              <Section num={4} icon={<Sliders className="size-4" />} title="Property Details">
                <div className="grid grid-cols-3 gap-4">
                  <Field label="Total Rooms" value={property.totalRooms} />
                  <Field label="Check-in Time" value={property.checkInTime} />
                  <Field label="Check-out Time" value={property.checkOutTime} />
                </div>
                {activeAmenities.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeAmenities.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </Section>

              <Section num={5} icon={<ImageIcon className="size-4" />} title="Property Photos">
                {photos.length === 0 ? (
                  <p className="text-neutral-400 text-sm">No photos uploaded.</p>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {photos.slice(0, 4).map((p, i) => (
                      <div key={i} className="relative rounded-lg overflow-hidden aspect-square bg-neutral-100">
                        <img src={fileUrl(p)} alt="" className="object-cover w-full h-full" />
                        {i === 3 && photos.length > 4 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-sm">
                            +{photos.length - 4} more
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Section>

              <Section num={6} icon={<ShieldCheck className="size-4" />} title="Verification Documents">
                <div className="flex flex-col gap-2">
                  {DOC_LABELS.map((d) => {
                    const file = property.documents?.[d.key];
                    return (
                      <div
                        key={d.key}
                        className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-2.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="size-4 text-neutral-400" />
                          <span className="text-sm text-neutral-700">{d.label}</span>
                          {d.required && (
                            <span className="text-[10px] font-medium rounded bg-neutral-100 text-neutral-500 px-1.5 py-0.5">
                              Required
                            </span>
                          )}
                        </div>
                        {file ? (
                          <div className="flex items-center gap-3">
                            {verified(d.key) ? (
                              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="size-3.5" /> Verified
                              </span>
                            ) : (
                              <span className="text-xs font-medium text-blue-600">Uploaded</span>
                            )}
                            <a
                              href={fileUrl(file)}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-medium text-indigo-600 hover:underline"
                            >
                              View
                            </a>
                          </div>
                        ) : (
                          <span className="text-xs text-neutral-400">Not Uploaded</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Section>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4">
              <Card className="border border-neutral-200 shadow-sm bg-white p-5 gap-4">
                <h3 className="font-semibold text-sm text-neutral-900">Take Action</h3>
                <div className="flex flex-col gap-1.5">
                  <label className="text-neutral-500 text-xs">Review Notes</label>
                  <Textarea
                    className="rounded-lg min-h-20 resize-none text-sm"
                    placeholder="Add internal review notes..."
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                  />
                </div>
                <Button
                  disabled={busy}
                  onClick={() => doAction("approve")}
                  className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                >
                  <CheckCircle2 className="size-4" />
                  Approve Application
                </Button>
                <Button
                  disabled={busy}
                  onClick={() => doAction("reject")}
                  className="w-full rounded-lg bg-red-600 hover:bg-red-700 text-white gap-2"
                >
                  <XCircle className="size-4" />
                  Reject Application
                </Button>
                <div className="flex flex-col gap-1.5">
                  <label className="text-neutral-500 text-xs">Rejection Reason (required to reject)</label>
                  <Textarea
                    className="rounded-lg min-h-16 resize-none text-sm"
                    placeholder="Provide a reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>
                <Button
                  disabled={busy}
                  onClick={() => doAction("under-review")}
                  variant="outline"
                  className="w-full rounded-lg border-neutral-200 gap-2"
                >
                  <Info className="size-4" />
                  Request More Info
                </Button>
              </Card>

              <Card className="border border-neutral-200 shadow-sm bg-white p-5 gap-4">
                <h3 className="font-semibold text-sm text-neutral-900">Status Timeline</h3>
                <div className="flex flex-col">
                  {timeline.map((t, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        {t.done ? (
                          <CheckCircle2 className="size-4 text-indigo-600" />
                        ) : (
                          <Circle className="size-4 text-neutral-300" />
                        )}
                        {i < timeline.length - 1 && (
                          <div className={`w-px flex-1 my-1 ${t.done ? "bg-indigo-200" : "bg-neutral-200"}`} />
                        )}
                      </div>
                      <div className="flex flex-col pb-4">
                        <span className={`text-sm font-medium ${t.done ? "text-neutral-900" : "text-neutral-400"}`}>
                          {t.label}
                        </span>
                        <span className="text-xs text-neutral-400">{t.note}</span>
                        {t.date && (
                          <span className="text-[11px] text-neutral-400 mt-0.5">
                            {new Date(t.date).toLocaleDateString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
