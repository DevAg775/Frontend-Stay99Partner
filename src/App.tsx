// import { useEffect } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  FileCheck2,
  Mail,
  Phone,
  ShieldCheck,
  UserPlus,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { FallbackComponent } from "./CustomComponents";

export default function App() {
  return (
    <div>
      <div className="bg-white text-neutral-950 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <nav className="sticky z-50 bg-white border-neutral-200 border-t-0 border-r-0 border-b border-l-0 border-solid top-0 w-full">
          <div className="max-w-[1140px] flex mx-auto px-8 justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-indigo-600 flex justify-center items-center">
                <ShieldCheck className="size-5 text-white" />
              </div>
              <span className="font-bold text-slate-900 text-lg leading-7">
                PropVerify
              </span>
            </div>
            <div className="flex items-center gap-8">
              <a className="font-medium text-neutral-500 text-sm leading-5">
                How It Works
              </a>
              <a className="font-medium text-neutral-500 text-sm leading-5">
                Benefits
              </a>
              <a className="font-medium text-neutral-500 text-sm leading-5">
                FAQs
              </a>
              <a className="font-medium text-neutral-500 text-sm leading-5">
                Contact
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="font-medium text-slate-900 text-sm leading-5"
              >
                Login
              </Button>
              <Button className="font-medium rounded-lg bg-indigo-600 text-white text-sm leading-5">
                Register Your Property
              </Button>
            </div>
          </div>
        </nav>
        <section className="bg-[linear-gradient(135deg,#ffffff_0%,#eef0fc_100%)] w-full">
          <div className="max-w-[1140px] grid grid-cols-2 mx-auto px-8 py-12 items-center gap-12">
            <div className="flex flex-col gap-6">
              <h1 className="leading-tight font-bold text-slate-900 text-5xl leading-12">
                Get Your Property
                <br />
                {`Listed &`}
                <span className="decoration-[#4F46E5] decoration-4 underline-offset-4 underline text-indigo-600">
                  Verified
                </span>
              </h1>
              <p className="max-w-md text-neutral-500 text-base leading-6">
                The fastest way for hotel and property owners to submit, verify,
                and get approved for listing on India's leading hospitality
                platform.
              </p>
              <div className="flex items-center gap-6">
                <Button className="font-semibold rounded-lg bg-indigo-600 text-white text-sm leading-5 px-6 py-5">
                  Register Your Property
                  <ArrowRight className="size-4 ml-1" />
                </Button>
                <a className="cursor-pointer font-medium text-slate-900 text-sm leading-5 flex items-center gap-1">
                  See How It Works
                  <ChevronRight className="size-4" />
                </a>
              </div>
              <div className="flex pt-2 items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span className="text-neutral-500 text-sm leading-5">
                    Free to Register
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-indigo-600" />
                  <span className="text-neutral-500 text-sm leading-5">
                    DigiLocker Verified
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-indigo-600" />
                  <span className="text-neutral-500 text-sm leading-5">
                    Approval in 48 hrs
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="shadow-xl rounded-2xl border-neutral-200 border-0 border-solid p-6 gap-4">
                <CardHeader className="flex p-0 flex-row justify-between items-center gap-0">
                  <span className="font-semibold text-slate-900 text-sm leading-5">
                    Property Dashboard
                  </span>
                  <span className="inline-flex font-semibold rounded-full bg-emerald-50 text-emerald-700 text-xs leading-4 px-3 py-1 items-center gap-1">
                    <Check className="size-3" />
                    Approved
                  </span>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-4">
                  <div className="rounded-xl w-full h-40 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1771293549382-62829fad8f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3RlbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXwwfHx8MTc4MDU4NTQ4NHww&ixlib=rb-4.1.0&q=80&w=400"
                      alt="Hotel"
                      className="object-cover w-full h-full"
                      data-photoid="LPx6qAimByw"
                      data-authorname="Darien Attridge"
                      data-authorurl="https://unsplash.com/@dariendesigns"
                      data-blurhash="L:M7W2IAofjZ_NRjRjj[xuxuRjfR"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-slate-900 text-base leading-6">
                      The Grand Marina Resort
                    </span>
                    <span className="text-neutral-500 text-xs leading-4">
                      Goa, India
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 text-xs leading-4">
                        Verification Progress
                      </span>
                      <span className="font-semibold text-indigo-600 text-xs leading-4">
                        100%
                      </span>
                    </div>
                    <div className="rounded-full bg-neutral-100 w-full h-2">
                      <div className="rounded-full bg-indigo-600 w-full h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="bg-slate-50 w-full">
          <div className="max-w-[1140px] flex mx-auto px-8 py-12 flex-col gap-8">
            <h2 className="font-bold text-center text-slate-900 text-3xl leading-9">
              Why Property Owners Choose Us
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <Card className="shadow-sm rounded-2xl bg-white border-neutral-200 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 gap-2">
                  <div className="size-12 rounded-xl bg-[#eef0fc] flex justify-center items-center">
                    <ShieldCheck className="size-6 text-indigo-600" />
                  </div>
                  <span className="font-bold text-slate-900 text-lg leading-7">
                    Secure Verification
                  </span>
                </CardHeader>
                <CardContent className="p-0 gap-2">
                  <p className="text-neutral-500 text-sm leading-5">
                    DigiLocker-based document verification ensures your
                    credentials are authenticated securely and instantly.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-sm rounded-2xl bg-white border-neutral-200 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 gap-2">
                  <div className="size-12 rounded-xl bg-[#eef0fc] flex justify-center items-center">
                    <Zap className="size-6 text-indigo-600" />
                  </div>
                  <span className="font-bold text-slate-900 text-lg leading-7">
                    Fast Approvals
                  </span>
                </CardHeader>
                <CardContent className="p-0 gap-2">
                  <p className="text-neutral-500 text-sm leading-5">
                    Our streamlined 48-hour review process gets your property
                    approved and live without long delays.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-sm rounded-2xl bg-white border-neutral-200 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 gap-2">
                  <div className="size-12 rounded-xl bg-[#eef0fc] flex justify-center items-center">
                    <BarChart3 className="size-6 text-indigo-600" />
                  </div>
                  <span className="font-bold text-slate-900 text-lg leading-7">
                    Full Transparency
                  </span>
                </CardHeader>
                <CardContent className="p-0 gap-2">
                  <p className="text-neutral-500 text-sm leading-5">
                    Track your submission status in real-time and view admin
                    remarks at every stage of the process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="bg-white w-full">
          <div className="max-w-[1140px] flex mx-auto px-8 py-12 flex-col gap-8">
            <h2 className="font-bold text-center text-slate-900 text-3xl leading-9">
              How It Works
            </h2>
            <div className="grid grid-cols-4 relative gap-2">
              <div className="left-[12%] right-[12%] border-neutral-200 border-t-2 border-r-0 border-b-0 border-l-0 border-dashed absolute top-6" />
              <div className="relative text-center flex px-2 flex-col items-center gap-3">
                <div className="size-12 z-10 font-bold rounded-full bg-indigo-600 text-white text-lg leading-7 flex justify-center items-center">
                  1
                </div>
                <UserPlus className="size-5 text-indigo-600" />
                <span className="font-bold text-slate-900 text-sm leading-5">{`Register & Create Account`}</span>
                <span className="text-neutral-500 text-xs leading-4">
                  Sign up in minutes with your basic details.
                </span>
              </div>
              <div className="relative text-center flex px-2 flex-col items-center gap-3">
                <div className="size-12 z-10 font-bold rounded-full bg-indigo-600 text-white text-lg leading-7 flex justify-center items-center">
                  2
                </div>
                <Building2 className="size-5 text-indigo-600" />
                <span className="font-bold text-slate-900 text-sm leading-5">
                  Submit Property Details
                </span>
                <span className="text-neutral-500 text-xs leading-4">
                  Add your property info and amenities.
                </span>
              </div>
              <div className="relative text-center flex px-2 flex-col items-center gap-3">
                <div className="size-12 z-10 font-bold rounded-full bg-indigo-600 text-white text-lg leading-7 flex justify-center items-center">
                  3
                </div>
                <FileCheck2 className="size-5 text-indigo-600" />
                <span className="font-bold text-slate-900 text-sm leading-5">{`Upload Documents & Verify`}</span>
                <span className="text-neutral-500 text-xs leading-4">
                  Verify securely via DigiLocker.
                </span>
              </div>
              <div className="relative text-center flex px-2 flex-col items-center gap-3">
                <div className="size-12 z-10 font-bold rounded-full bg-indigo-600 text-white text-lg leading-7 flex justify-center items-center">
                  4
                </div>
                <BadgeCheck className="size-5 text-indigo-600" />
                <span className="font-bold text-slate-900 text-sm leading-5">{`Get Approved & Go Live`}</span>
                <span className="text-neutral-500 text-xs leading-4">
                  Your listing goes live for guests.
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#eef0fc] w-full">
          <div className="max-w-[1140px] grid grid-cols-4 mx-auto px-8 py-12 gap-6">
            <div className="text-center flex flex-col items-center gap-1">
              <span className="font-bold text-slate-900 text-3xl leading-9">
                2,400+
              </span>
              <span className="text-neutral-500 text-sm leading-5">
                Properties Listed
              </span>
            </div>
            <div className="text-center flex flex-col items-center gap-1">
              <span className="font-bold text-slate-900 text-3xl leading-9">
                98%
              </span>
              <span className="text-neutral-500 text-sm leading-5">
                Approval Rate
              </span>
            </div>
            <div className="text-center flex flex-col items-center gap-1">
              <span className="font-bold text-slate-900 text-3xl leading-9">
                48hr
              </span>
              <span className="text-neutral-500 text-sm leading-5">
                Avg. Review Time
              </span>
            </div>
            <div className="text-center flex flex-col items-center gap-1">
              <span className="font-bold text-slate-900 text-3xl leading-9">
                100%
              </span>
              <span className="text-neutral-500 text-sm leading-5">{`Secure & Verified`}</span>
            </div>
          </div>
        </section>
        <section className="bg-white w-full">
          <div className="max-w-[1140px] flex mx-auto px-8 py-12 flex-col gap-6">
            <h2 className="font-bold text-slate-900 text-3xl leading-9">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-2">
              <div className="rounded-xl bg-slate-50 border-neutral-200 border border-solid p-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900 text-base leading-6">
                    Is this platform free for property owners to register?
                  </span>
                  <ChevronUp className="size-5 text-indigo-600" />
                </div>
                <p className="text-neutral-500 text-sm leading-5 pt-3">
                  Yes, registration and property submission are completely free.
                  There are no upfront charges.
                </p>
              </div>
              <div className="rounded-xl border-neutral-200 border border-solid p-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900 text-base leading-6">
                    What documents do I need to submit?
                  </span>
                  <ChevronDown className="size-5 text-neutral-500" />
                </div>
              </div>
              <div className="rounded-xl border-neutral-200 border border-solid p-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900 text-base leading-6">
                    How long does the verification process take?
                  </span>
                  <ChevronDown className="size-5 text-neutral-500" />
                </div>
              </div>
              <div className="rounded-xl border-neutral-200 border border-solid p-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900 text-base leading-6">
                    Can I edit my property after submission?
                  </span>
                  <ChevronDown className="size-5 text-neutral-500" />
                </div>
              </div>
              <div className="rounded-xl border-neutral-200 border border-solid p-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900 text-base leading-6">
                    What happens if my property is rejected?
                  </span>
                  <ChevronDown className="size-5 text-neutral-500" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-slate-50 w-full">
          <div className="max-w-[1140px] grid grid-cols-2 mx-auto px-8 py-12 items-start gap-12">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-slate-900 text-3xl leading-9">
                  Get in Touch
                </h2>
                <p className="text-neutral-500 text-base leading-6">
                  Have questions about listing your property? Our team is here
                  to help you every step of the way.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-[#eef0fc] flex justify-center items-center">
                    <Mail className="size-5 text-indigo-600" />
                  </div>
                  <span className="text-slate-900 text-sm leading-5">
                    support@propverify.in
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-[#eef0fc] flex justify-center items-center">
                    <Phone className="size-5 text-indigo-600" />
                  </div>
                  <span className="text-slate-900 text-sm leading-5">
                    1800-XXX-XXXX
                  </span>
                </div>
              </div>
            </div>
            <Card className="shadow-sm rounded-2xl bg-white border-neutral-200 border-0 border-solid p-6 gap-4">
              <CardContent className="flex p-0 flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-slate-900 text-sm leading-5">
                    Name
                  </label>
                  <Input placeholder="Your name" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-slate-900 text-sm leading-5">
                    Email
                  </label>
                  <Input placeholder="you@example.com" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-slate-900 text-sm leading-5">
                    Message
                  </label>
                  <Textarea
                    placeholder="How can we help?"
                    className="min-h-24"
                  />
                </div>
                <Button className="font-semibold rounded-lg bg-indigo-600 text-white text-sm leading-5">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        <footer className="bg-slate-900 text-white w-full">
          <div className="max-w-[1140px] flex mx-auto px-8 py-12 flex-col gap-8">
            <div className="grid grid-cols-3 gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-indigo-600 flex justify-center items-center">
                    <ShieldCheck className="size-5 text-white" />
                  </div>
                  <span className="font-bold text-lg leading-7">
                    PropVerify
                  </span>
                </div>
                <p className="max-w-xs text-slate-400 text-sm leading-5">
                  Simplifying property onboarding for hospitality businesses
                  across India.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-sm leading-5">
                  Quick Links
                </span>
                <a className="text-slate-400 text-sm leading-5">Home</a>
                <a className="text-slate-400 text-sm leading-5">How It Works</a>
                <a className="text-slate-400 text-sm leading-5">Register</a>
                <a className="text-slate-400 text-sm leading-5">Login</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-sm leading-5">Contact</span>
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-slate-400" />
                  <span className="text-slate-400 text-sm leading-5">
                    support@propverify.in
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-slate-400" />
                  <span className="text-slate-400 text-sm leading-5">
                    1800-XXX-XXXX
                  </span>
                </div>
                <div className="flex pt-1 items-center gap-3">
                  <FallbackComponent className="size-5 text-slate-400" />
                  <FallbackComponent className="size-5 text-slate-400" />
                  <FallbackComponent className="size-5 text-slate-400" />
                </div>
              </div>
            </div>
            <div className="border-slate-700 border-t border-r-0 border-b-0 border-l-0 border-solid pt-6">
              <p className="text-center text-slate-500 text-xs leading-4">
                © 2025 PropVerify. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
