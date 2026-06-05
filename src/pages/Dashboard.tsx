
import {
  ArrowRight,
  Bell,
  Building,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Home,
  LogOut,
  Plus,
  Search,
  ShieldCheck,
  Upload,
  User,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Screen5() {
  return (
    <div>
      <div className="bg-white text-neutral-950 flex w-full h-fit min-h-screen min- max- overflow-visible">
        <aside className="shrink-0 bg-white border-neutral-200 border-t-0 border-r border-b-0 border-l-0 border-solid flex p-6 flex-col w-60 h-239">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-neutral-900 flex justify-center items-center">
              <Building2 className="size-5 text-neutral-50" />
            </div>
            <span className="text-[oklch(0.45_0.22_277)] font-bold text-lg leading-7">
              PropVerify
            </span>
          </div>
          <div className="flex mt-8 items-center gap-2">
            <div className="size-10 font-semibold rounded-full bg-neutral-100 text-neutral-900 text-sm leading-5 flex justify-center items-center">
              RK
            </div>
            <div className="flex flex-col">
              <span className=" font-semibold text-sm leading-5">
                Rajesh Kumar
              </span>
              <span className="text-neutral-500 text-xs leading-4">
                Property Owner
              </span>
            </div>
          </div>
          <nav className="flex mt-8 flex-col gap-1">
            <a className="bg-[oklch(0.45_0.22_277)] font-medium rounded-full text-neutral-50 text-sm leading-5 flex px-4 py-2 items-center gap-2">
              <Home className="size-4" />
              Dashboard
            </a>
            <a className="rounded-full text-neutral-500 text-sm leading-5 flex px-4 py-2 items-center gap-2">
              <Building className="size-4" />
              My Properties
            </a>
            <a className="rounded-full text-neutral-500 text-sm leading-5 flex px-4 py-2 items-center gap-2">
              <Plus className="size-4" />
              Submit Property
            </a>
            <a className="rounded-full text-neutral-500 text-sm leading-5 flex px-4 py-2 justify-between items-center">
              <span className="flex items-center gap-2">
                <Bell className="size-4" />
                Notifications
              </span>
              <span className="size-5 font-semibold rounded-full bg-[#e7000b] text-neutral-50 text-[10px] flex justify-center items-center">
                3
              </span>
            </a>
            <a className="rounded-full text-neutral-500 text-sm leading-5 flex px-4 py-2 items-center gap-2">
              <User className="size-4" />
              Profile Settings
            </a>
          </nav>
          <a className="rounded-full text-neutral-500 text-sm leading-5 flex mt-auto px-4 py-2 items-center gap-2">
            <LogOut className="size-4" />
            Logout
          </a>
        </aside>
        <main className="bg-[oklch(0.98_0.005_250)] flex flex-col flex-1 h-239 overflow-hidden">
          <header className="bg-white border-neutral-200 border-t-0 border-r-0 border-b border-l-0 border-solid flex px-8 py-4 justify-between items-center">
            <h1 className="font-bold text-neutral-950 text-xl leading-7">
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-white border-neutral-200 border border-solid flex px-3 py-2 items-center gap-2 w-64">
                <Search className="size-4 text-neutral-500" />
                <input
                  className="bg-transparent outline-none text-sm leading-5 w-full"
                  placeholder="Search..."
                />
              </div>
              <div className="relative">
                <Bell className="size-5 text-neutral-500" />
                <span className="size-4 font-semibold rounded-full bg-[#e7000b] text-neutral-50 text-[9px] flex absolute -right-1 -top-1 justify-center items-center">
                  3
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="size-8 font-semibold rounded-full bg-neutral-100 text-neutral-900 text-xs leading-4 flex justify-center items-center">
                  RK
                </div>
                <ChevronDown className="size-4 text-neutral-500" />
              </div>
            </div>
          </header>
          <div className="flex p-8 flex-col flex-1 gap-6 overflow-auto">
            <div className="grid grid-cols-4 gap-6">
              <Card className="border-l-[oklch(0.45_0.22_277)] shadow-sm border-black/1 border-t-0 border-r-0 border-b-0 border-l-4 border-solid p-6 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                  <span className="text-neutral-500 text-sm leading-5">
                    Submitted Properties
                  </span>
                  <div className="size-9 bg-[oklch(0.45_0.22_277/0.1)] rounded-lg flex justify-center items-center">
                    <Building2 className="size-5 text-[oklch(0.45_0.22_277)]" />
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-1">
                  <span className="font-bold text-3xl leading-9">4</span>
                  <p className="text-neutral-500 text-xs leading-4">
                    +1 this month
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-[oklch(0.6_0.17_150)] shadow-sm border-black/1 border-t-0 border-r-0 border-b-0 border-l-4 border-solid p-6 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                  <span className="text-neutral-500 text-sm leading-5">
                    Approved Properties
                  </span>
                  <div className="size-9 bg-[oklch(0.6_0.17_150/0.12)] rounded-lg flex justify-center items-center">
                    <CheckCircle2 className="size-5 text-[oklch(0.6_0.17_150)]" />
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-1">
                  <span className="font-bold text-3xl leading-9">2</span>
                  <p className="text-neutral-500 text-xs leading-4">
                    50% approval rate
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-[oklch(0.78_0.16_75)] shadow-sm border-black/1 border-t-0 border-r-0 border-b-0 border-l-4 border-solid p-6 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                  <span className="text-neutral-500 text-sm leading-5">
                    Pending Reviews
                  </span>
                  <div className="size-9 bg-[oklch(0.78_0.16_75/0.15)] rounded-lg flex justify-center items-center">
                    <Clock className="size-5 text-[oklch(0.6_0.14_75)]" />
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-1">
                  <span className="font-bold text-3xl leading-9">1</span>
                  <p className="text-neutral-500 text-xs leading-4">
                    Awaiting admin review
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-destructive shadow-sm border-black/1 border-t-0 border-r-0 border-b-0 border-l-4 border-solid p-6 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                  <span className="text-neutral-500 text-sm leading-5">
                    Rejected Properties
                  </span>
                  <div className="size-9 bg-[oklch(0.577_0.245_27.325/0.12)] rounded-lg flex justify-center items-center">
                    <XCircle className="size-5 text-[#e7000b]" />
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-1">
                  <span className="font-bold text-3xl leading-9">1</span>
                  <p className="text-neutral-500 text-xs leading-4">
                    Requires resubmission
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end">
              <Button className="bg-[oklch(0.45_0.22_277)] text-neutral-50 gap-2">
                <Plus className="size-4" />
                Submit New Property
              </Button>
            </div>
            <Card className="shadow-sm p-6 gap-4">
              <CardHeader className="p-0 gap-2">
                <h2 className="font-bold text-base leading-6">
                  Recent Activity
                </h2>
              </CardHeader>
              <CardContent className="p-0 gap-0">
                <div className="flex py-3 items-start gap-4">
                  <span className="size-2.5 bg-[oklch(0.6_0.17_150)] rounded-full mt-1" />
                  <CheckCircle2 className="size-4 text-[oklch(0.6_0.17_150)] mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm leading-5">
                      Property Approved
                    </p>
                    <p className="text-[oklch(0.45_0.22_277)] text-sm leading-5">
                      The Grand Palace Hotel
                    </p>
                  </div>
                  <span className="text-neutral-500 text-xs leading-4">
                    2 hours ago
                  </span>
                </div>
                <div className="border-neutral-200 border-t border-r-0 border-b-0 border-l-0 border-solid flex py-3 items-start gap-4">
                  <span className="size-2.5 bg-[oklch(0.78_0.16_75)] rounded-full mt-1" />
                  <FileText className="size-4 text-[oklch(0.6_0.14_75)] mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm leading-5">
                      Documents Requested
                    </p>
                    <p className="text-[oklch(0.45_0.22_277)] text-sm leading-5">{`Sunset Inn & Suites`}</p>
                  </div>
                  <span className="text-neutral-500 text-xs leading-4">
                    1 day ago
                  </span>
                </div>
                <div className="border-neutral-200 border-t border-r-0 border-b-0 border-l-0 border-solid flex py-3 items-start gap-4">
                  <span className="size-2.5 bg-[oklch(0.55_0.18_255)] rounded-full mt-1" />
                  <Upload className="size-4 text-[oklch(0.55_0.18_255)] mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm leading-5">
                      Property Submitted
                    </p>
                    <p className="text-[oklch(0.45_0.22_277)] text-sm leading-5">
                      Mountain View Resort
                    </p>
                  </div>
                  <span className="text-neutral-500 text-xs leading-4">
                    3 days ago
                  </span>
                </div>
                <div className="border-neutral-200 border-t border-r-0 border-b-0 border-l-0 border-solid flex py-3 items-start gap-4">
                  <span className="size-2.5 rounded-full bg-[#e7000b] mt-1" />
                  <XCircle className="size-4 text-[#e7000b] mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm leading-5">
                      Property Rejected
                    </p>
                    <p className="text-[oklch(0.45_0.22_277)] text-sm leading-5">
                      City Center Lodge
                    </p>
                  </div>
                  <span className="text-neutral-500 text-xs leading-4">
                    5 days ago
                  </span>
                </div>
                <div className="border-neutral-200 border-t border-r-0 border-b-0 border-l-0 border-solid flex py-3 items-start gap-4">
                  <span className="size-2.5 rounded-full bg-neutral-500 mt-1" />
                  <ShieldCheck className="size-4 text-neutral-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm leading-5">
                      Account Verified
                    </p>
                    <p className="text-neutral-500 text-sm leading-5">
                      Your account was successfully verified
                    </p>
                  </div>
                  <span className="text-neutral-500 text-xs leading-4">
                    1 week ago
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm p-6 gap-4">
              <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                <h2 className="font-bold text-base leading-6">My Properties</h2>
                <a className="text-[oklch(0.45_0.22_277)] font-medium text-sm leading-5 flex items-center gap-1">
                  View All
                  <ArrowRight className="size-3.5" />
                </a>
              </CardHeader>
              <CardContent className="p-0 gap-0">
                <table className="text-sm leading-5 w-full">
                  <thead>
                    <tr className="text-left text-neutral-500 border-neutral-200 border-t-0 border-r-0 border-b border-l-0 border-solid">
                      <th className="font-medium pb-2">Property Name</th>
                      <th className="font-medium pb-2">Type</th>
                      <th className="font-medium pb-2">Status</th>
                      <th className="font-medium pb-2">Submitted Date</th>
                      <th className="font-medium text-right pb-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-neutral-200 border-t-0 border-r-0 border-b border-l-0 border-solid">
                      <td className="font-medium py-3">
                        The Grand Palace Hotel
                      </td>
                      <td className="text-neutral-500 py-3">Hotel</td>
                      <td className="py-3">
                        <Badge className="bg-[oklch(0.6_0.17_150/0.12)] text-[oklch(0.5_0.15_150)] border-black/1 border-0 border-solid">
                          Approved
                        </Badge>
                      </td>
                      <td className="text-neutral-500 py-3">Jan 12, 2025</td>
                      <td className="text-right py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[oklch(0.45_0.22_277)]"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-neutral-200 border-t-0 border-r-0 border-b border-l-0 border-solid">
                      <td className="font-medium py-3">{`Sunset Inn & Suites`}</td>
                      <td className="text-neutral-500 py-3">Inn</td>
                      <td className="py-3">
                        <Badge className="bg-[oklch(0.78_0.16_75/0.15)] text-[oklch(0.55_0.13_75)] border-black/1 border-0 border-solid">
                          Pending Review
                        </Badge>
                      </td>
                      <td className="text-neutral-500 py-3">Jan 15, 2025</td>
                      <td className="text-right py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[oklch(0.45_0.22_277)]"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium py-3">City Center Lodge</td>
                      <td className="text-neutral-500 py-3">Lodge</td>
                      <td className="py-3">
                        <Badge className="bg-[oklch(0.577_0.245_27.325/0.12)] text-[#e7000b] border-black/1 border-0 border-solid">
                          Rejected
                        </Badge>
                      </td>
                      <td className="text-neutral-500 py-3">Jan 10, 2025</td>
                      <td className="text-right py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[oklch(0.45_0.22_277)]"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
