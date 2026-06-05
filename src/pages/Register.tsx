
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function Screen3() {
  return (
    <div>
      <div className="bg-white text-neutral-950 w-full h-fit min-h-screen min-w-screen max-w-screen overflow-visible">
        <div className="flex w-full h-239 overflow-hidden">
          <div className="relative w-1/2 bg-[linear-gradient(155deg,#4F46E5_0%,#312E81_55%,#1E1B4B_100%)] text-white flex p-12 flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="size-9 backdrop-blur-sm rounded-xl bg-white/15 flex justify-center items-center">
                <ShieldCheck className="size-5 text-white" />
              </div>
              <span className="font-bold text-white text-xl leading-7 tracking-tight">
                PropVerify
              </span>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h1 className=" font-bold text-white text-4xl leading-10 tracking-tight">
                  Start Your Property Onboarding Journey
                </h1>
                <p className="max-w-md text-indigo-200 text-base leading-6">
                  Join thousands of property owners who have successfully listed
                  their properties through our verified platform.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="size-7 shrink-0 backdrop-blur-sm rounded-full bg-white/15 flex justify-center items-center">
                    <Check className="size-4 text-white" />
                  </div>
                  <span className="font-medium text-white text-sm leading-5">
                    Create your free account
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="size-7 shrink-0 backdrop-blur-sm rounded-full bg-white/15 flex justify-center items-center">
                    <Check className="size-4 text-white" />
                  </div>
                  <span className="font-medium text-white text-sm leading-5">{`Submit property details & documents`}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="size-7 shrink-0 backdrop-blur-sm rounded-full bg-white/15 flex justify-center items-center">
                    <Check className="size-4 text-white" />
                  </div>
                  <span className="font-medium text-white text-sm leading-5">
                    Get verified and go live in 48 hours
                  </span>
                </div>
              </div>
            </div>
            <Card className="backdrop-blur-md bg-white/10 border-white/20 border-0 border-solid p-6 gap-4">
              <CardContent className="flex p-0 flex-col gap-4">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                </div>
                <p className=" text-white text-sm leading-5">
                  “The verification process was smooth and transparent. Got
                  approved within 2 days!”
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-10 ring-2 ring-white/30 rounded-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1655048424687-29c152741a90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBidXNpbmVzc21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXwyfHx8MTc4MDU3NTQyMnww&ixlib=rb-4.1.0&q=80&w=400"
                      alt="Rajesh Kumar"
                      className="object-cover w-full h-full"
                      data-photoid="iFBwCKkF7Ns"
                      data-authorname="Erick Matahine"
                      data-authorurl="https://unsplash.com/@erick_matahine"
                      data-blurhash="L23[VcS60KxA^jWV57s:ngn#Nebd"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-white text-sm leading-5">
                      Rajesh Kumar
                    </span>
                    <span className="text-indigo-200 text-xs leading-4">
                      Hotel Owner
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-1/2 bg-white flex p-12 justify-center items-center">
            <div className="max-w-md flex flex-col gap-6 w-full">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-neutral-900" />
                <span className="font-bold text-neutral-900 text-sm leading-5 tracking-tight">
                  PropVerify
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-neutral-950 text-2xl leading-8 tracking-tight">
                  Create your account
                </h2>
                <p className="text-neutral-500 text-sm leading-5">
  Already have an account?
  <Link to="/login" className="font-medium  text-indigo-600">Sign in</Link>
</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="font-medium text-neutral-950 text-sm leading-5">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="top-1/2 size-4 -translate-y-1/2 text-neutral-500 absolute left-3" />
                    <Input
                      className="rounded-lg bg-neutral-100 border-neutral-200 border-0 border-solid pl-9 h-11"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-medium text-neutral-950 text-sm leading-5">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="top-1/2 size-4 -translate-y-1/2 text-neutral-500 absolute left-3" />
                    <Input
                      className="rounded-lg bg-neutral-100 border-neutral-200 border-0 border-solid pl-9 h-11"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-medium text-neutral-950 text-sm leading-5">
                    Mobile Number
                  </Label>
                  <div className="flex gap-2">
                    <button className="shrink-0 font-medium rounded-lg bg-neutral-100 text-neutral-950 text-sm leading-5 border-neutral-200 border border-solid flex px-3 items-center gap-1.5 h-11">
                      <span className="text-base leading-6">🇮🇳</span>
                      <span>+91</span>
                      <ChevronDown className="size-4 text-neutral-500" />
                    </button>
                    <div className="relative flex-1">
                      <Phone className="top-1/2 size-4 -translate-y-1/2 text-neutral-500 absolute left-3" />
                      <Input
                        className="rounded-lg bg-neutral-100 border-neutral-200 border-0 border-solid pl-9 h-11"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-medium text-neutral-950 text-sm leading-5">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="top-1/2 size-4 -translate-y-1/2 text-neutral-500 absolute left-3" />
                    <Input
                      type="password"
                      className="rounded-lg bg-neutral-100 border-neutral-200 border-0 border-solid px-9 h-11"
                      placeholder="••••••••"
                    />
                    <Eye className="top-1/2 size-4 -translate-y-1/2 cursor-pointer text-neutral-500 absolute right-3" />
                  </div>
                  <div className="flex pt-0.5 items-center gap-2">
                    <div className="flex flex-1 gap-1 h-1.5">
                      <div className="rounded-full bg-emerald-500 flex-1" />
                      <div className="rounded-full bg-emerald-500 flex-1" />
                      <div className="rounded-full bg-emerald-500 flex-1" />
                    </div>
                    <span className="font-medium text-emerald-600 text-xs leading-4">
                      Strong
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-medium text-neutral-950 text-sm leading-5">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="top-1/2 size-4 -translate-y-1/2 text-neutral-500 absolute left-3" />
                    <Input
                      type="password"
                      className="rounded-lg bg-neutral-100 border-neutral-200 border-0 border-solid pl-9 pr-16 h-11"
                      placeholder="••••••••"
                    />
                    <div className="top-1/2 -translate-y-1/2 flex absolute right-3 items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-600" />
                      <Eye className="size-4 cursor-pointer text-neutral-500" />
                    </div>
                  </div>
                </div>
                <div className="flex pt-1 items-start gap-2">
                  <Checkbox className="border-neutral-200 border-0 border-solid mt-0.5" />
<Label className="font-normal text-neutral-500 text-sm leading-5">                    I agree to the
                    <a className="font-medium text-neutral-900">
                      Terms of Service
                    </a>
                    and
                    <a className="font-medium text-neutral-900">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
                <Button className="font-semibold rounded-lg bg-neutral-900 text-neutral-50 text-sm leading-5 w-full h-11">
                  Create Account
                </Button>
                <div className="flex items-center gap-4">
                  <div className="bg-neutral-200 flex-1 h-px" />
                  <span className="text-neutral-500 text-xs leading-4">or</span>
                  <div className="bg-neutral-200 flex-1 h-px" />
                </div>
                <Button
                  variant="outline"
                  className="font-medium rounded-lg bg-white text-neutral-950 text-sm leading-5 border-neutral-200 border-0 border-solid gap-2 w-full h-11"
                >
                  <svg className="size-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.1a6.6 6.6 0 0 1 0-4.22V7.04H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.04L5.84 9.88C6.71 7.31 9.14 5.38 12 5.38Z"
                    />
                  </svg>
                  Continue with Google
                </Button>
                <p className="text-center text-neutral-500 text-xs leading-4">
                  Free to register. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
