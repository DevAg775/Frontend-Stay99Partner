
import {
  ArrowRight,
  Bell,
  Building2,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileCheck2,
  FilePlus2,
  LayoutDashboard,
  LogOut,
  Mail,
  Phone,
  Save,
  Settings,
  ShieldCheck,
  User,
  UserRound,
} from "lucide-react";
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

export default function Screen6() {
  return (
    <div>
      <div className="bg-white text-neutral-950 w-full h-fit min-h-screen min- max- overflow-visible">
        <div className="flex w-full h-239 overflow-hidden">
          <aside className="shrink-0 bg-neutral-50 border-neutral-200 border-t-0 border-r border-b-0 border-l-0 border-solid flex p-6 flex-col gap-8 w-60 h-full">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-neutral-900 flex justify-center items-center">
                <ShieldCheck className="size-5 text-neutral-50" />
              </div>
              <span className="font-bold text-neutral-950 text-lg leading-7 tracking-tight">
                PropVerify
              </span>
            </div>
            <div className="rounded-lg bg-neutral-100 flex p-2 items-center gap-2">
              <div className="size-9 font-semibold rounded-full bg-neutral-900 text-neutral-50 text-sm leading-5 flex justify-center items-center">
                RK
              </div>
              <div className="flex flex-col">
                <span className=" font-semibold text-neutral-950 text-sm leading-5">
                  Rajesh Kumar
                </span>
                <span className=" text-neutral-500 text-xs leading-4">
                  Property Owner
                </span>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              <a className="font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-2">
                <LayoutDashboard className="size-4" />
                Dashboard
              </a>
              <a className="font-semibold rounded-lg bg-neutral-900 text-neutral-50 text-sm leading-5 flex px-3 py-2 items-center gap-2">
                <FilePlus2 className="size-4" />
                Submit Property
              </a>
              <a className="font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-2">
                <Building2 className="size-4" />
                My Properties
              </a>
              <a className="font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-2">
                <FileCheck2 className="size-4" />
                Verifications
              </a>
              <a className="font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-2">
                <CreditCard className="size-4" />
                Billing
              </a>
              <a className="font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-2">
                <Settings className="size-4" />
                Settings
              </a>
            </nav>
            <div className="cursor-pointer font-medium rounded-lg text-neutral-500 text-sm leading-5 flex mt-auto px-3 py-2 items-center gap-2">
              <LogOut className="size-4" />
              Sign Out
            </div>
          </aside>
          <div className="bg-neutral-100 flex flex-col flex-1 h-full">
            <header className="shrink-0 bg-white border-neutral-200 border-t-0 border-r-0 border-b border-l-0 border-solid flex px-8 justify-between items-center h-16">
              <div className="text-sm leading-5 flex items-center gap-2">
                <span className="text-neutral-500">Dashboard</span>
                <ChevronRight className="size-4 text-neutral-500" />
                <span className="font-semibold text-neutral-950">
                  Submit New Property
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Bell className="size-5 text-neutral-500" />
                  <span className="size-2 rounded-full bg-[#e7000b] absolute -right-1 -top-1" />
                </div>
                <div className="size-9 font-semibold rounded-full bg-neutral-900 text-neutral-50 text-sm leading-5 flex justify-center items-center">
                  RK
                </div>
              </div>
            </header>
            <main className="flex p-8 flex-col flex-1 gap-6 overflow-auto">
              <Card className="bg-white p-6 gap-4">
                <CardHeader className="p-0 gap-1">
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-semibold text-neutral-950 text-base leading-6">
                      Onboarding Progress
                    </CardTitle>
                    <span className="font-medium text-neutral-500 text-xs leading-4">
                      14% Complete
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-2">
                  <div className="relative flex justify-between items-start">
                    <div className="bg-neutral-200 absolute inset-x-0 top-5 h-0.5" />
                    <div className="w-[7%] bg-neutral-900 absolute left-0 top-5 h-0.5" />
                    <div className="relative flex flex-col items-center flex-1 gap-2">
                      <div className="size-10 ring-4 ring-primary/15 z-10 font-bold rounded-full bg-neutral-900 text-neutral-50 text-sm leading-5 flex justify-center items-center">
                        1
                      </div>
                      <span className="font-semibold text-center text-neutral-950 text-xs leading-4 px-1">
                        Owner Info
                      </span>
                    </div>
                    <div className="relative flex flex-col items-center flex-1 gap-2">
                      <div className="size-10 z-10 font-semibold rounded-full bg-white text-neutral-500 text-sm leading-5 border-neutral-200 border-2 border-solid flex justify-center items-center">
                        2
                      </div>
                      <span className="font-medium text-center text-neutral-500 text-xs leading-4 px-1">
                        Business Info
                      </span>
                    </div>
                    <div className="relative flex flex-col items-center flex-1 gap-2">
                      <div className="size-10 z-10 font-semibold rounded-full bg-white text-neutral-500 text-sm leading-5 border-neutral-200 border-2 border-solid flex justify-center items-center">
                        3
                      </div>
                      <span className="font-medium text-center text-neutral-500 text-xs leading-4 px-1">
                        Property Info
                      </span>
                    </div>
                    <div className="relative flex flex-col items-center flex-1 gap-2">
                      <div className="size-10 z-10 font-semibold rounded-full bg-white text-neutral-500 text-sm leading-5 border-neutral-200 border-2 border-solid flex justify-center items-center">
                        4
                      </div>
                      <span className="font-medium text-center text-neutral-500 text-xs leading-4 px-1">
                        Property Details
                      </span>
                    </div>
                    <div className="relative flex flex-col items-center flex-1 gap-2">
                      <div className="size-10 z-10 font-semibold rounded-full bg-white text-neutral-500 text-sm leading-5 border-neutral-200 border-2 border-solid flex justify-center items-center">
                        5
                      </div>
                      <span className="font-medium text-center text-neutral-500 text-xs leading-4 px-1">
                        Upload Photos
                      </span>
                    </div>
                    <div className="relative flex flex-col items-center flex-1 gap-2">
                      <div className="size-10 z-10 font-semibold rounded-full bg-white text-neutral-500 text-sm leading-5 border-neutral-200 border-2 border-solid flex justify-center items-center">
                        6
                      </div>
                      <span className="font-medium text-center text-neutral-500 text-xs leading-4 px-1">
                        Documents
                      </span>
                    </div>
                    <div className="relative flex flex-col items-center flex-1 gap-2">
                      <div className="size-10 z-10 font-semibold rounded-full bg-white text-neutral-500 text-sm leading-5 border-neutral-200 border-2 border-solid flex justify-center items-center">
                        7
                      </div>
                      <span className="font-medium text-center text-neutral-500 text-xs leading-4 px-1">
                        Review
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white p-8 flex-1 gap-6">
                <CardHeader className="p-0 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-neutral-900/10 flex justify-center items-center">
                      <UserRound className="size-5 text-neutral-900" />
                    </div>
                    <div className="flex flex-col">
                      <CardTitle className="font-bold text-neutral-950 text-xl leading-7">
                        Owner Information
                      </CardTitle>
                      <CardDescription className="text-neutral-500 text-sm leading-5">
                        Provide your personal and contact details as the
                        property owner.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold uppercase text-neutral-500 text-xs leading-4 tracking-wide">
                        Personal Details
                      </span>
                      <div className="bg-neutral-200 flex-1 h-px" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <Label className="font-medium text-neutral-950 text-sm leading-5">
                          Full Name
                        </Label>
                        <div className="relative">
                          <User className="top-1/2 -translate-y-1/2 size-4 text-neutral-500 absolute left-3" />
                          <Input
                            className="rounded-lg pl-9 h-10"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="font-medium text-neutral-950 text-sm leading-5">
                          Designation
                        </Label>
                        <Select>
                          <SelectTrigger className="rounded-lg w-full h-10">
                            <SelectValue placeholder="Select your designation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="co-owner">Co-Owner</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="authorized">
                              Authorized Representative
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold uppercase text-neutral-500 text-xs leading-4 tracking-wide">
                        Contact Details
                      </span>
                      <div className="bg-neutral-200 flex-1 h-px" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <Label className="font-medium text-neutral-950 text-sm leading-5">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="top-1/2 -translate-y-1/2 size-4 text-neutral-500 absolute left-3" />
                          <Input
                            type="email"
                            className="rounded-lg pl-9 h-10"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="font-medium text-neutral-950 text-sm leading-5">
                          Mobile Number
                        </Label>
                        <div className="flex items-stretch">
                          <div className="border-y font-medium rounded-l-lg bg-neutral-100 text-neutral-950 text-sm leading-5 border-neutral-200 border-t-0 border-r-0 border-b-0 border-l border-solid flex px-3 items-center gap-1 h-10">
                            <span>🇮🇳</span>+91
                            <ChevronDown className="size-3 text-neutral-500" />
                          </div>
                          <Input
                            className="rounded-r-lg h-10"
                            placeholder="98765 43210"
                          />
                        </div>
                      </div>
                      <div className="col-span-2 flex flex-col gap-2">
                        <Label className="font-medium text-neutral-950 text-sm leading-5">
                          Alternate Mobile
                          <span className="font-normal text-neutral-500">
                            (Optional)
                          </span>
                        </Label>
                        <div className="relative">
                          <Phone className="top-1/2 -translate-y-1/2 size-4 text-neutral-500 absolute left-3" />
                          <Input
                            className="rounded-lg pl-9 h-10"
                            placeholder="Optional alternate number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-neutral-200 border-t border-r-0 border-b-0 border-l-0 border-solid flex mt-auto px-0 pt-6 pb-0 justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-neutral-950 text-sm leading-5">
                      Step 1 of 7
                    </span>
                    <span className="text-neutral-500 text-xs leading-4 flex items-center gap-1">
                      <Save className="size-3" />
                      Progress saved automatically
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="rounded-lg">
                      <Save className="size-4" />
                      Save as Draft
                    </Button>
                    <Button className="rounded-lg bg-neutral-900 text-neutral-50">
                      Next: Business Info
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
