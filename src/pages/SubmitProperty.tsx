import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileCheck2,
  Mail,
  MapPin,
  Phone,
  Save,
  Upload,
  User,
  UserRound,
  X,
} from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { Link } from "react-router-dom";
import API from "@/api";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1 - Owner Info
  ownerFullName: string;
  ownerDesignation: string;
  ownerEmail: string;
  ownerMobile: string;
  ownerAltMobile: string;
  ownerAltEmail: string;
  // Step 2 - Business Info
  businessEntityType: string;
  businessName: string;
  gstNumber: string;
  panNumber: string;
  businessRegistrationNumber: string;
  // Step 3 - Property Info
  propertyName: string;
  propertyType: string;
  propertyDescription: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  googleMapsLocation: string;
  nearbyLandmark: string;
  // Step 4 - Property Details
  totalRooms: string;
  checkInTime: string;
  checkOutTime: string;
  amenities: {
    wifi: boolean;
    parking: boolean;
    restaurant: boolean;
    airConditioning: boolean;
    roomService: boolean;
    swimmingPool: boolean;
    gym: boolean;
    conferenceHall: boolean;
    spa: boolean;
    airportPickup: boolean;
    petFriendly: boolean;
  };
}

interface UploadedFiles {
  coverImage: File | null;
  exteriorPhotos: File[];
  interiorPhotos: File[];
  roomPhotos: File[];
  panCard: File | null;
  gstCertificate: File | null;
  businessRegistrationCertificate: File | null;
  propertyOwnershipProof: File | null;
  tradeLicense: File | null;
}

// ─── Step Labels ─────────────────────────────────────────────────────────────

const STEPS = [
  "Owner Info",
  "Business Info",
  "Property Info",
  "Property Details",
  "Upload Photos",
  "Documents",
  "Review",
];

// ─── Indian States ────────────────────────────────────────────────────────────

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir",
  "Ladakh", "Puducherry", "Chandigarh",
];

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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SubmitProperty() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [_submittedPropertyId, setSubmittedPropertyId] = useState<string | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [form, setForm] = useState<FormData>({
    ownerFullName: user.fullName || "",
    ownerDesignation: "",
    ownerEmail: user.email || "",
    ownerMobile: user.mobile || "",
    ownerAltMobile: "",
    ownerAltEmail: "",
    businessEntityType: "",
    businessName: "",
    gstNumber: "",
    panNumber: "",
    businessRegistrationNumber: "",
    propertyName: "",
    propertyType: "",
    propertyDescription: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    googleMapsLocation: "",
    nearbyLandmark: "",
    totalRooms: "",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    amenities: {
      wifi: false,
      parking: false,
      restaurant: false,
      airConditioning: false,
      roomService: false,
      swimmingPool: false,
      gym: false,
      conferenceHall: false,
      spa: false,
      airportPickup: false,
      petFriendly: false,
    },
  });

  const [files, setFiles] = useState<UploadedFiles>({
    coverImage: null,
    exteriorPhotos: [],
    interiorPhotos: [],
    roomPhotos: [],
    panCard: null,
    gstCertificate: null,
    businessRegistrationCertificate: null,
    propertyOwnershipProof: null,
    tradeLicense: null,
  });

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const updateForm = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateAmenity = (key: keyof typeof form.amenities) => {
    setForm((prev) => ({
      ...prev,
      amenities: { ...prev.amenities, [key]: !prev.amenities[key] },
    }));
  };

  const handleSingleFile = (field: keyof UploadedFiles, file: File | null) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const handleMultiFile = (field: keyof UploadedFiles, newFiles: FileList) => {
    setFiles((prev) => ({
      ...prev,
      [field]: [...(prev[field] as File[]), ...Array.from(newFiles)],
    }));
  };

  const removeFile = (field: keyof UploadedFiles, index?: number) => {
    if (index !== undefined) {
      setFiles((prev) => ({
        ...prev,
        [field]: (prev[field] as File[]).filter((_, i) => i !== index),
      }));
    } else {
      setFiles((prev) => ({ ...prev, [field]: null }));
    }
  };

  // ─── Submit Logic ───────────────────────────────────────────────────────────
  const validateStep = (step: number): boolean => {
    setError("");
    switch (step) {
      case 1:
        if (!form.ownerFullName || !form.ownerDesignation || !form.ownerEmail || !form.ownerMobile) {
          setError("Please fill all required fields in Owner Info.");
          return false;
        }
        return true;
      case 2:
        if (!form.businessEntityType || !form.businessName || !form.panNumber) {
          setError("Please fill all required fields in Business Info.");
          return false;
        }
        return true;
      case 3:
        if (!form.propertyName || !form.propertyType || !form.address || !form.city || !form.state || !form.pincode) {
          setError("Please fill all required fields in Property Info.");
          return false;
        }
        return true;
      case 4:
        if (!form.totalRooms || !form.checkInTime || !form.checkOutTime) {
          setError("Please fill all required fields in Property Details.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      // Step 1: Submit property data
      const propertyData = {
        ...form,
        totalRooms: Number(form.totalRooms),
      };
      const res = await API.post("/properties/submit", propertyData);
      const propertyId = res.data.property._id;
      setSubmittedPropertyId(propertyId);

      // Step 2: Upload media
      const mediaForm = new FormData();
      if (files.coverImage) mediaForm.append("coverImage", files.coverImage);
      files.exteriorPhotos.forEach((f) => mediaForm.append("exteriorPhotos", f));
      files.interiorPhotos.forEach((f) => mediaForm.append("interiorPhotos", f));
      files.roomPhotos.forEach((f) => mediaForm.append("roomPhotos", f));

      if (mediaForm.has("coverImage") || files.exteriorPhotos.length > 0) {
        await API.post(`/properties/${propertyId}/media`, mediaForm, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // Step 3: Upload documents
      const docsForm = new FormData();
      if (files.panCard) docsForm.append("panCard", files.panCard);
      if (files.gstCertificate) docsForm.append("gstCertificate", files.gstCertificate);
      if (files.businessRegistrationCertificate) docsForm.append("businessRegistrationCertificate", files.businessRegistrationCertificate);
      if (files.propertyOwnershipProof) docsForm.append("propertyOwnershipProof", files.propertyOwnershipProof);
      if (files.tradeLicense) docsForm.append("tradeLicense", files.tradeLicense);

      if (docsForm.has("panCard")) {
        await API.post(`/properties/${propertyId}/documents`, docsForm, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setCurrentStep(8); // success screen
    } catch (err: any) {
      setError(err.response?.data?.message || "Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Progress ───────────────────────────────────────────────────────────────

  const progress = Math.round(((currentStep - 1) / 7) * 100);

  // ─── File Upload Box ────────────────────────────────────────────────────────

  const FileUploadBox = ({
    label,
    accept,
    file,
    onUpload,
    onRemove,
    required = false,
  }: {
    label: string;
    accept: string;
    file: File | null;
    onUpload: (f: File) => void;
    onRemove: () => void;
    required?: boolean;
  }) => {
    const ref = useRef<HTMLInputElement>(null);
    return (
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-neutral-950 text-sm leading-5">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        {file ? (
          <div className="rounded-lg border border-neutral-200 flex px-4 py-3 justify-between items-center">
            <div className="flex items-center gap-2">
              <FileCheck2 className="size-4 text-green-600" />
              <span className="text-sm text-neutral-700 truncate max-w-xs">{file.name}</span>
              <span className="text-xs text-neutral-400">({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
            <button onClick={onRemove} className="text-neutral-400 hover:text-red-500">
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => ref.current?.click()}
            className="rounded-lg border-2 border-dashed border-neutral-200 flex flex-col py-6 items-center gap-2 cursor-pointer hover:border-neutral-400 transition-colors"
          >
            <Upload className="size-5 text-neutral-400" />
            <span className="text-neutral-500 text-sm">Click to upload</span>
            <span className="text-neutral-400 text-xs">{accept.replace(/,/g, ", ").toUpperCase()}</span>
          </div>
        )}
        <input
          ref={ref}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
        />
      </div>
    );
  };

  // ─── Multi File Upload Box ──────────────────────────────────────────────────

  const MultiFileUploadBox = ({
    label,
    accept,
    files: uploadedFiles,
    onUpload,
    onRemove,
    maxFiles,
    required = false,
  }: {
    label: string;
    accept: string;
    files: File[];
    onUpload: (files: FileList) => void;
    onRemove: (index: number) => void;
    maxFiles: number;
    required?: boolean;
  }) => {
    const ref = useRef<HTMLInputElement>(null);
    return (
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-neutral-950 text-sm leading-5">
          {label} {required && <span className="text-red-500">*</span>}
          <span className="font-normal text-neutral-400 ml-1">(max {maxFiles})</span>
        </Label>
        <div
          onClick={() => ref.current?.click()}
          className="rounded-lg border-2 border-dashed border-neutral-200 flex flex-col py-6 items-center gap-2 cursor-pointer hover:border-neutral-400 transition-colors"
        >
          <Upload className="size-5 text-neutral-400" />
          <span className="text-neutral-500 text-sm">Click to upload multiple</span>
          <span className="text-neutral-400 text-xs">{uploadedFiles.length}/{maxFiles} uploaded</span>
        </div>
        {uploadedFiles.length > 0 && (
          <div className="flex flex-col gap-1">
            {uploadedFiles.map((f, i) => (
              <div key={i} className="rounded-lg border border-neutral-200 flex px-4 py-2 justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="size-4 text-green-600" />
                  <span className="text-sm text-neutral-700 truncate max-w-xs">{f.name}</span>
                </div>
                <button onClick={() => onRemove(i)} className="text-neutral-400 hover:text-red-500">
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          ref={ref}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={(e) => e.target.files && onUpload(e.target.files)}
        />
      </div>
    );
  };

  // ─── Step Content ───────────────────────────────────────────────────────────

  const renderStep = () => {
    switch (currentStep) {
      // ── Step 1: Owner Info ──────────────────────────────────────────────────
      case 1:
        return (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <SectionHeader title="Personal Details" />
              <div className="grid grid-cols-2 gap-6">
                <FormField label="Full Name" required>
                  <div className="relative">
                    <User className="top-1/2 -translate-y-1/2 size-4 text-neutral-500 absolute left-3" />
                    <Input className="rounded-lg pl-9 h-10" placeholder="Enter your full name"
                      value={form.ownerFullName} onChange={(e) => updateForm("ownerFullName", e.target.value)} />
                  </div>
                </FormField>
                <FormField label="Designation" required>
                  <Select value={form.ownerDesignation} onValueChange={(v) => updateForm("ownerDesignation", v)}>
                    <SelectTrigger className="rounded-lg w-full h-10"><SelectValue placeholder="Select designation" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Owner">Owner</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Authorized Representative">Authorized Representative</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <SectionHeader title="Contact Details" />
              <div className="grid grid-cols-2 gap-6">
                <FormField label="Email Address" required>
                  <div className="relative">
                    <Mail className="top-1/2 -translate-y-1/2 size-4 text-neutral-500 absolute left-3" />
                    <Input type="email" className="rounded-lg pl-9 h-10" placeholder="you@example.com"
                      value={form.ownerEmail} onChange={(e) => updateForm("ownerEmail", e.target.value)} />
                  </div>
                </FormField>
                <FormField label="Mobile Number" required>
                  <div className="flex items-stretch">
                    <div className="border border-neutral-200 font-medium rounded-l-lg bg-neutral-100 text-neutral-950 text-sm flex px-3 items-center gap-1 h-10">
                      <span>🇮🇳</span>+91
                    </div>
                    <Input className="rounded-l-none rounded-r-lg h-10" placeholder="98765 43210"
                      value={form.ownerMobile} onChange={(e) => updateForm("ownerMobile", e.target.value)} />
                  </div>
                </FormField>
                <FormField label="Alternate Mobile (Optional)">
                  <div className="relative">
                    <Phone className="top-1/2 -translate-y-1/2 size-4 text-neutral-500 absolute left-3" />
                    <Input className="rounded-lg pl-9 h-10" placeholder="Optional alternate number"
                      value={form.ownerAltMobile} onChange={(e) => updateForm("ownerAltMobile", e.target.value)} />
                  </div>
                </FormField>
                <FormField label="Alternate Email (Optional)">
                  <div className="relative">
                    <Mail className="top-1/2 -translate-y-1/2 size-4 text-neutral-500 absolute left-3" />
                    <Input type="email" className="rounded-lg pl-9 h-10" placeholder="alternate@example.com"
                      value={form.ownerAltEmail} onChange={(e) => updateForm("ownerAltEmail", e.target.value)} />
                  </div>
                </FormField>
              </div>
            </div>
          </div>
        );

      // ── Step 2: Business Info ───────────────────────────────────────────────
      case 2:
        return (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <SectionHeader title="Business Details" />
              <div className="grid grid-cols-2 gap-6">
                <FormField label="Business Entity Type" required>
                  <Select value={form.businessEntityType} onValueChange={(v) => updateForm("businessEntityType", v)}>
                    <SelectTrigger className="rounded-lg w-full h-10"><SelectValue placeholder="Select entity type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Proprietorship">Proprietorship</SelectItem>
                      <SelectItem value="Partnership">Partnership</SelectItem>
                      <SelectItem value="LLP">LLP</SelectItem>
                      <SelectItem value="Private Limited Company">Private Limited Company</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Business / Company Name" required>
                  <Input className="rounded-lg h-10" placeholder="Enter business name"
                    value={form.businessName} onChange={(e) => updateForm("businessName", e.target.value)} />
                </FormField>
                <FormField label="PAN Number" required>
                  <Input className="rounded-lg h-10 uppercase" placeholder="ABCDE1234F"
                    value={form.panNumber} onChange={(e) => updateForm("panNumber", e.target.value.toUpperCase())} />
                </FormField>
                <FormField label="GST Number (Optional)">
                  <Input className="rounded-lg h-10 uppercase" placeholder="22ABCDE1234F1Z5"
                    value={form.gstNumber} onChange={(e) => updateForm("gstNumber", e.target.value.toUpperCase())} />
                </FormField>
                <FormField label="Business Registration Number (Optional)" className="col-span-2">
                  <Input className="rounded-lg h-10" placeholder="Enter registration number"
                    value={form.businessRegistrationNumber} onChange={(e) => updateForm("businessRegistrationNumber", e.target.value)} />
                </FormField>
              </div>
            </div>
          </div>
        );

      // ── Step 3: Property Info ───────────────────────────────────────────────
      case 3:
        return (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <SectionHeader title="Property Details" />
              <div className="grid grid-cols-2 gap-6">
                <FormField label="Property Name" required>
                  <Input className="rounded-lg h-10" placeholder="e.g. Sunrise Villa"
                    value={form.propertyName} onChange={(e) => updateForm("propertyName", e.target.value)} />
                </FormField>
                <FormField label="Property Type" required>
                  <Select value={form.propertyType} onValueChange={(v) => updateForm("propertyType", v)}>
                    <SelectTrigger className="rounded-lg w-full h-10"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hotel">Hotel</SelectItem>
                      <SelectItem value="Resort">Resort</SelectItem>
                      <SelectItem value="Guest House">Guest House</SelectItem>
                      <SelectItem value="Homestay">Homestay</SelectItem>
                      <SelectItem value="Hostel">Hostel</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Property Description" className="col-span-2">
                  <Textarea className="rounded-lg min-h-24 resize-none" placeholder="Describe your property..."
                    value={form.propertyDescription} onChange={(e) => updateForm("propertyDescription", e.target.value)} />
                </FormField>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <SectionHeader title="Location" />
              <div className="grid grid-cols-2 gap-6">
                <FormField label="Full Address" required className="col-span-2">
                  <div className="relative">
                    <MapPin className="top-1/2 -translate-y-1/2 size-4 text-neutral-500 absolute left-3" />
                    <Input className="rounded-lg pl-9 h-10" placeholder="Street address"
                      value={form.address} onChange={(e) => updateForm("address", e.target.value)} />
                  </div>
                </FormField>
                <FormField label="City" required>
                  <Input className="rounded-lg h-10" placeholder="e.g. Mumbai"
                    value={form.city} onChange={(e) => updateForm("city", e.target.value)} />
                </FormField>
                <FormField label="State" required>
                  <Select value={form.state} onValueChange={(v) => updateForm("state", v)}>
                    <SelectTrigger className="rounded-lg w-full h-10"><SelectValue placeholder="Select state" /></SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Pincode" required>
                  <Input className="rounded-lg h-10" placeholder="e.g. 400001" maxLength={6}
                    value={form.pincode} onChange={(e) => updateForm("pincode", e.target.value.replace(/\D/g, ""))} />
                </FormField>
                <FormField label="Nearby Landmark (Optional)">
                  <Input className="rounded-lg h-10" placeholder="e.g. Near Juhu Beach"
                    value={form.nearbyLandmark} onChange={(e) => updateForm("nearbyLandmark", e.target.value)} />
                </FormField>
                <FormField label="Google Maps Link (Optional)" className="col-span-2">
                  <Input className="rounded-lg h-10" placeholder="https://maps.google.com/..."
                    value={form.googleMapsLocation} onChange={(e) => updateForm("googleMapsLocation", e.target.value)} />
                </FormField>
              </div>
            </div>
          </div>
        );

      // ── Step 4: Property Details ────────────────────────────────────────────
      case 4:
        return (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <SectionHeader title="Room & Timing" />
              <div className="grid grid-cols-3 gap-6">
                <FormField label="Total Rooms" required>
                  <Input type="number" min="1" className="rounded-lg h-10" placeholder="e.g. 20"
                    value={form.totalRooms} onChange={(e) => updateForm("totalRooms", e.target.value)} />
                </FormField>
                <FormField label="Check-in Time" required>
                  <Input type="time" className="rounded-lg h-10"
                    value={form.checkInTime} onChange={(e) => updateForm("checkInTime", e.target.value)} />
                </FormField>
                <FormField label="Check-out Time" required>
                  <Input type="time" className="rounded-lg h-10"
                    value={form.checkOutTime} onChange={(e) => updateForm("checkOutTime", e.target.value)} />
                </FormField>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <SectionHeader title="Amenities" />
              <p className="text-neutral-500 text-sm -mt-2">Select all amenities available at your property</p>
              <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2">
                {(Object.keys(form.amenities) as (keyof typeof form.amenities)[]).map((key) => {
                  const active = form.amenities[key];
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => updateAmenity(key)}
                      className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                        active
                          ? "border-indigo-300 bg-indigo-50 text-indigo-700 font-medium"
                          : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                      }`}
                    >
                      <span className="capitalize">{AMENITY_LABELS[key]}</span>
                      {active && <Check className="size-4 shrink-0 text-indigo-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      // ── Step 5: Upload Photos ───────────────────────────────────────────────
      case 5:
        return (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <SectionHeader title="Required Photos" />
              <div className="grid grid-cols-2 gap-6">
                <FileUploadBox
                  label="Cover Image" accept=".jpg,.jpeg,.png" required
                  file={files.coverImage}
                  onUpload={(f) => handleSingleFile("coverImage", f)}
                  onRemove={() => removeFile("coverImage")}
                />
                <div className="col-span-2">
                  <MultiFileUploadBox
                    label="Exterior Photos" accept=".jpg,.jpeg,.png" required
                    files={files.exteriorPhotos} maxFiles={5}
                    onUpload={(fl) => handleMultiFile("exteriorPhotos", fl)}
                    onRemove={(i) => removeFile("exteriorPhotos", i)}
                  />
                </div>
                <div className="col-span-2">
                  <MultiFileUploadBox
                    label="Interior Photos" accept=".jpg,.jpeg,.png" required
                    files={files.interiorPhotos} maxFiles={5}
                    onUpload={(fl) => handleMultiFile("interiorPhotos", fl)}
                    onRemove={(i) => removeFile("interiorPhotos", i)}
                  />
                </div>
                <div className="col-span-2">
                  <MultiFileUploadBox
                    label="Room Photos" accept=".jpg,.jpeg,.png" required
                    files={files.roomPhotos} maxFiles={10}
                    onUpload={(fl) => handleMultiFile("roomPhotos", fl)}
                    onRemove={(i) => removeFile("roomPhotos", i)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      // ── Step 6: Documents ───────────────────────────────────────────────────
      case 6:
        return (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <SectionHeader title="Identity & Business Verification" />
              <div className="grid grid-cols-2 gap-6">
                <FileUploadBox label="PAN Card" accept=".jpg,.jpeg,.png,.pdf" required
                  file={files.panCard}
                  onUpload={(f) => handleSingleFile("panCard", f)}
                  onRemove={() => removeFile("panCard")} />
                <FileUploadBox label="GST Certificate (Optional)" accept=".jpg,.jpeg,.png,.pdf"
                  file={files.gstCertificate}
                  onUpload={(f) => handleSingleFile("gstCertificate", f)}
                  onRemove={() => removeFile("gstCertificate")} />
                <FileUploadBox label="Business Registration Certificate (Optional)" accept=".jpg,.jpeg,.png,.pdf"
                  file={files.businessRegistrationCertificate}
                  onUpload={(f) => handleSingleFile("businessRegistrationCertificate", f)}
                  onRemove={() => removeFile("businessRegistrationCertificate")} />
                <FileUploadBox label="Property Ownership Proof" accept=".jpg,.jpeg,.png,.pdf" required
                  file={files.propertyOwnershipProof}
                  onUpload={(f) => handleSingleFile("propertyOwnershipProof", f)}
                  onRemove={() => removeFile("propertyOwnershipProof")} />
                <FileUploadBox label="Trade License (Optional)" accept=".jpg,.jpeg,.png,.pdf"
                  file={files.tradeLicense}
                  onUpload={(f) => handleSingleFile("tradeLicense", f)}
                  onRemove={() => removeFile("tradeLicense")} />
              </div>
            </div>
          </div>
        );

      // ── Step 7: Review ──────────────────────────────────────────────────────
      case 7:
        return (
          <div className="flex flex-col gap-6">
            <ReviewSection title="Owner Information">
              <ReviewRow label="Full Name" value={form.ownerFullName} />
              <ReviewRow label="Designation" value={form.ownerDesignation} />
              <ReviewRow label="Email" value={form.ownerEmail} />
              <ReviewRow label="Mobile" value={form.ownerMobile} />
            </ReviewSection>
            <ReviewSection title="Business Information">
              <ReviewRow label="Entity Type" value={form.businessEntityType} />
              <ReviewRow label="Business Name" value={form.businessName} />
              <ReviewRow label="PAN Number" value={form.panNumber} />
              <ReviewRow label="GST Number" value={form.gstNumber || "—"} />
            </ReviewSection>
            <ReviewSection title="Property Information">
              <ReviewRow label="Property Name" value={form.propertyName} />
              <ReviewRow label="Property Type" value={form.propertyType} />
              <ReviewRow label="City" value={form.city} />
              <ReviewRow label="State" value={form.state} />
              <ReviewRow label="Pincode" value={form.pincode} />
            </ReviewSection>
            <ReviewSection title="Property Details">
              <ReviewRow label="Total Rooms" value={form.totalRooms} />
              <ReviewRow label="Check-in" value={form.checkInTime} />
              <ReviewRow label="Check-out" value={form.checkOutTime} />
              <ReviewRow label="Amenities" value={
                Object.entries(form.amenities).filter(([, v]) => v).map(([k]) => k.replace(/([A-Z])/g, " $1").trim()).join(", ") || "None selected"
              } />
            </ReviewSection>
            <ReviewSection title="Uploaded Files">
              <ReviewRow label="Cover Image" value={files.coverImage?.name || "Not uploaded"} />
              <ReviewRow label="Exterior Photos" value={`${files.exteriorPhotos.length} file(s)`} />
              <ReviewRow label="Interior Photos" value={`${files.interiorPhotos.length} file(s)`} />
              <ReviewRow label="Room Photos" value={`${files.roomPhotos.length} file(s)`} />
              <ReviewRow label="PAN Card" value={files.panCard?.name || "Not uploaded"} />
              <ReviewRow label="Ownership Proof" value={files.propertyOwnershipProof?.name || "Not uploaded"} />
            </ReviewSection>
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}
          </div>
        );

      // ── Step 8: Success ─────────────────────────────────────────────────────
      case 8:
        return (
          <div className="flex flex-col items-center gap-6 py-12">
            <div className="size-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="size-10 text-green-600" />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="font-bold text-2xl text-neutral-950">Property Submitted!</h2>
              <p className="text-neutral-500 text-sm max-w-sm">
                Your property has been submitted for verification. You'll be notified once it's reviewed.
              </p>
            </div>
            <Link to="/dashboard">
              <Button className="bg-neutral-900 text-neutral-50 rounded-lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="bg-white dark:bg-neutral-950 text-neutral-950 dark:text-neutral-100 w-full h-fit min-h-screen overflow-visible">
      <div className="flex w-full min-h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main */}
        <div className="bg-neutral-100 dark:bg-neutral-950 flex flex-col flex-1">
          <Header title="Submit New Property" />

          <main className="flex p-8 flex-col flex-1 gap-6 overflow-auto">
            {/* Progress Card */}
            {currentStep <= 7 && (
              <Card className="bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6 gap-4">
                <CardHeader className="p-0 gap-1">
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-semibold text-neutral-950 dark:text-neutral-100 text-base leading-6">
                      Onboarding Progress
                    </CardTitle>
                    <span className="font-medium text-neutral-500 text-xs leading-4">
                      {progress}% Complete
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-2">
                  <div className="w-full bg-neutral-200 rounded-full h-1.5 mb-4">
                    <div className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="relative flex justify-between items-start">
                    <div className="bg-neutral-200 absolute inset-x-0 top-5 h-0.5" />
                    <div
                      className="bg-neutral-900 absolute left-0 top-5 h-0.5 transition-all duration-300"
                      style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                    />
                    {STEPS.map((step, i) => (
                      <div key={i} className="relative flex flex-col items-center flex-1 gap-2">
                        <div className={`size-10 z-10 font-bold rounded-full text-sm leading-5 flex justify-center items-center transition-all
                          ${i + 1 < currentStep ? "bg-neutral-900 text-white" :
                            i + 1 === currentStep ? "bg-indigo-600 text-white ring-4 ring-indigo-600/15" :
                              "bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border-2 border-neutral-200 dark:border-neutral-700"}`}>
                          {i + 1 < currentStep ? <CheckCircle2 className="size-5" /> : i + 1}
                        </div>
                        <span className={`font-medium text-center text-xs leading-4 px-1
                          ${i + 1 === currentStep ? "font-semibold text-neutral-950 dark:text-neutral-100" : "text-neutral-500 dark:text-neutral-400"}`}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step Card */}
            <Card className="bg-white dark:bg-neutral-900 dark:border-neutral-800 p-8 flex-1 gap-6">
              {currentStep <= 7 && (
                <CardHeader className="p-0 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-indigo-50 flex justify-center items-center">
                      <UserRound className="size-5 text-indigo-600" />
                    </div>
                    <div className="flex flex-col">
                      <CardTitle className="font-bold text-neutral-950 dark:text-neutral-100 text-xl leading-7">
                        {currentStep === 1 && "Owner Information"}
                        {currentStep === 2 && "Business Information"}
                        {currentStep === 3 && "Property Information"}
                        {currentStep === 4 && "Property Details"}
                        {currentStep === 5 && "Upload Photos"}
                        {currentStep === 6 && "Verification Documents"}
                        {currentStep === 7 && "Review & Submit"}
                      </CardTitle>
                      <CardDescription className="text-neutral-500 text-sm leading-5">
                        {currentStep === 1 && "Provide your personal and contact details."}
                        {currentStep === 2 && "Enter your business entity details."}
                        {currentStep === 3 && "Tell us about your property and its location."}
                        {currentStep === 4 && "Rooms, timings, and available amenities."}
                        {currentStep === 5 && "Upload photos of your property."}
                        {currentStep === 6 && "Upload required verification documents."}
                        {currentStep === 7 && "Review all information before submitting."}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              )}
              <CardContent className="p-0">
                {error && currentStep < 7 && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200 mb-4">
                    {error}
                  </div>
                )}
                {renderStep()}
              </CardContent>

              {/* Footer Navigation */}
              {currentStep <= 7 && (
                <CardFooter className="border-t border-neutral-200 dark:border-neutral-800 flex mt-auto px-0 pt-6 pb-0 justify-between items-center">
                  <div className="flex flex-col gap-1">
                    {currentStep <= 7 && (
                      <>
                        <span className="font-medium text-neutral-950 dark:text-neutral-100 text-sm leading-5">
                          Step {currentStep} of 7
                        </span>
                        <span className="text-neutral-500 text-xs leading-4 flex items-center gap-1">
                          <Save className="size-3" />Progress saved automatically
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {currentStep > 1 && (
                      <Button variant="outline" className="rounded-lg" onClick={() => setCurrentStep((s) => s - 1)}>
                        <ArrowLeft className="size-4" />Back
                      </Button>
                    )}
                    {
                      currentStep < 7 && (
                        <Button className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => {
                          if (validateStep(currentStep)) setCurrentStep((s) => s + 1);
                        }}>
                          Next: {STEPS[currentStep]}
                          <ArrowRight className="size-4" />
                        </Button>
                      )
                    }
                    {currentStep === 7 && (
                      <Button
                        className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Submit Property"}
                        {!loading && <ArrowRight className="size-4" />}
                      </Button>
                    )}
                  </div>
                </CardFooter>
              )}
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}

// ─── Helper Components ────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-bold uppercase text-neutral-500 dark:text-neutral-400 text-xs leading-4 tracking-wide">{title}</span>
      <div className="bg-neutral-200 dark:bg-neutral-800 flex-1 h-px" />
    </div>
  );
}

function FormField({ label, children, className, required }: {
  label: string; children: React.ReactNode; className?: string; required?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className || ""}`}>
      <Label className="font-medium text-neutral-950 dark:text-neutral-200 text-sm leading-5">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-neutral-950 dark:text-neutral-100 text-sm border-b border-neutral-200 dark:border-neutral-800 pb-2">{title}</h3>
      <div className="grid grid-cols-2 gap-2">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span className="text-neutral-500 dark:text-neutral-400 text-sm">{label}</span>
      <span className="text-neutral-950 dark:text-neutral-100 text-sm font-medium">{value || "—"}</span>
    </>
  );
}