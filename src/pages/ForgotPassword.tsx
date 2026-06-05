
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Mail,
  MailOpen,
  Send,
  ShieldCheck,
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

export default function Screen4() {
  return (
    <div>
      <div className="bg-white text-neutral-950 w-full h-fit min-h-screen min- max- overflow-visible">
        <div className="relative bg-[radial-gradient(oklch(0.85_0_0)_1px,transparent_1px)] bg-slate-100 w-285 h-239 overflow-hidden">
          <div className="flex absolute left-8 top-8 items-center gap-2">
            <div className="size-9 rounded-lg bg-indigo-600 flex justify-center items-center">
              <Building2 className="size-5 text-white" />
            </div>
            <span className="font-bold text-indigo-600 text-xl leading-7 tracking-tight">
              PropVerify
            </span>
          </div>
          <div className="flex absolute inset-0 justify-center items-center">
            <div className="flex flex-col items-center gap-6 w-130">
              <Card className="shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15)] rounded-2xl border-slate-200 border-0 border-solid p-12 gap-6 w-120">
                <CardHeader className="flex p-0 flex-col items-center gap-4">
                  <div className="size-20 rounded-full bg-indigo-50 flex justify-center items-center">
                    <MailOpen className="size-9 text-indigo-600" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CardTitle className="font-bold text-center text-slate-900 text-2xl leading-8">
                      Forgot your password?
                    </CardTitle>
                    <CardDescription className=" text-center text-slate-500 text-[15px] px-2">
                      No worries! Enter your registered email address below and
                      we'll send you a secure link to reset your password.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="email"
                      className="font-medium text-slate-900 text-sm leading-5"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="top-1/2 -translate-y-1/2 size-4 text-slate-400 absolute left-3" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="rounded-lg border-slate-200 border-0 border-solid pl-10 h-12"
                      />
                    </div>
                  </div>
                  <Button className="shadow-sm transition-shadow font-semibold rounded-lg bg-indigo-600 text-white w-full h-12">
                    <Send className="size-4" />
                    Send Reset Link
                  </Button>
                  <a
                    href="#"
                    className="font-medium text-indigo-600 text-sm leading-5 flex justify-center items-center gap-1.5"
                  >
                    <ArrowLeft className="size-4" />
                    Back to Login
                  </a>
                </CardContent>
                <CardFooter className="p-0">
                  <div className="rounded-lg bg-slate-50 border-slate-200 border border-solid flex p-4 items-start gap-2.5 w-full">
                    <ShieldCheck className="size-4 shrink-0 text-slate-500 mt-0.5" />
                    <p className=" text-slate-500 text-xs leading-4">
                      For security, reset links expire after 30 minutes and can
                      only be used once.
                    </p>
                  </div>
                </CardFooter>
              </Card>
              <Card className="shadow-sm rounded-2xl bg-green-50 border-green-200 border-0 border-solid p-8 gap-4 w-120">
                <CardHeader className="flex p-0 flex-col items-center gap-3">
                  <div className="size-14 rounded-full bg-green-100 flex justify-center items-center">
                    <CheckCircle2 className="size-7 text-green-600" />
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <CardTitle className="font-bold text-center text-slate-900 text-lg leading-7">
                      Check your inbox!
                    </CardTitle>
                    <CardDescription className=" text-center text-slate-600 text-sm leading-5 px-2">
                      We've sent a password reset link to rajesh@example.com.
                      The link will expire in 30 minutes.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col items-center gap-3">
                  <Button className="font-semibold rounded-lg bg-indigo-600 text-white w-full h-11">
                    Back to Login
                  </Button>
                  <div className="text-slate-500 text-sm leading-5 flex items-center gap-1.5">
                    Didn't receive it?
                    <a href="#" className="font-medium text-indigo-600">
                      Resend Email
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
