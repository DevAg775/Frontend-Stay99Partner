import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  FileCheck2,
  Lock,
  Mail,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForceLight } from "@/lib/useForceLight";
import API from "@/api";

export default function Screen2() {
  const navigate = useNavigate();
  useForceLight();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already logged in? Skip the login page and go to the user dashboard.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard", { replace: true });
  }, [navigate]);
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const { data } = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/dashboard");
  } catch (err: any) {
    setError(err.response?.data?.message || "Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <div className="bg-white text-neutral-950 w-full min-h-screen">
        <div className="flex w-full min-h-screen">
          <div className="relative w-[55%] max-lg:hidden bg-[linear-gradient(145deg,#4F46E5_0%,#312E81_55%,#1E1B4B_100%)] text-white flex p-12 flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-lg bg-white/15 flex justify-center items-center">
                <Building2 className="size-5 text-white" />
              </div>
              <span className="font-bold text-xl leading-7 tracking-tight">
                PropVerify
              </span>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-4xl leading-tight tracking-tight">
                  Welcome Back,
                  <br />
                  Property Owner
                </h1>
                <p className="max-w-md text-indigo-200 text-base leading-6">
                  Manage your property submissions, track verification status,
                  and stay updated — all in one place.
                </p>
              </div>
              <div className="relative max-w-sm shadow-2xl rounded-2xl bg-white text-neutral-950 p-6">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-neutral-500 text-xs leading-4">
                      Property
                    </span>
                    <span className="font-semibold text-base leading-6">
                      Sunrise Villa, Pune
                    </span>
                  </div>
                  <span className="inline-flex font-semibold rounded-full bg-emerald-100 text-emerald-700 text-xs leading-4 px-2 py-1 items-center gap-1">
                    <CheckCircle2 className="size-3" />
                    Approved
                  </span>
                </div>
                <div className="flex mt-4 flex-col gap-2">
                  <div className="text-neutral-500 text-xs leading-4 flex justify-between items-center">
                    <span>Verification Progress</span>
                    <span className="font-medium text-neutral-950">100%</span>
                  </div>
                  <div className="rounded-full bg-neutral-100 w-full h-2 overflow-hidden">
                    <div className="rounded-full bg-indigo-600 w-full h-full" />
                  </div>
                </div>
                <div className="text-neutral-500 text-xs leading-4 flex mt-4 items-center gap-2">
                  <FileCheck2 className="size-4 text-indigo-600" />
                  <span>All documents verified via DigiLocker</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-indigo-100 text-sm leading-5 flex items-center gap-2">
                <Lock className="size-4" />
                <span>Secure Login</span>
              </div>
              <div className="text-indigo-100 text-sm leading-5 flex items-center gap-2">
                <BadgeCheck className="size-4" />
                <span>DigiLocker Integrated</span>
              </div>
              <div className="text-indigo-100 text-sm leading-5 flex items-center gap-2">
                <Zap className="size-4" />
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>

          <div className="w-[45%] max-lg:w-full bg-white flex p-12 justify-center items-center">
            <div className="max-w-sm flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <Building2 className="size-4 text-indigo-600" />
                  <span className="font-bold text-indigo-600 text-sm leading-5">
                    PropVerify
                  </span>
                </div>
                <span className="text-neutral-500 text-xs leading-4">
                  Property Verification Platform
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-slate-900 text-2xl leading-8 tracking-tight">
                  Sign in to your account
                </h2>
                <p className="text-neutral-500 text-sm leading-5">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="underline-offset-2 underline font-medium text-indigo-600"
                  >
                    Register here
                  </Link>
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-neutral-950 text-sm leading-5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="top-1/2 size-4 -translate-y-1/2 text-neutral-500 absolute left-3" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="rounded-lg pl-10 h-11"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-neutral-950 text-sm leading-5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="top-1/2 size-4 -translate-y-1/2 text-neutral-500 absolute left-3" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="rounded-lg px-10 h-11"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="top-1/2 -translate-y-1/2 absolute right-3"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4 text-neutral-500" />
                      ) : (
                        <Eye className="size-4 text-neutral-500" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-indigo-600 text-sm leading-5"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="font-bold rounded-lg bg-indigo-600 text-white w-full h-11"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="flex items-center gap-4">
                <div className="bg-neutral-200 flex-1 h-px" />
                <span className="text-neutral-500 text-xs leading-4">or</span>
                <div className="bg-neutral-200 flex-1 h-px" />
              </div>
              <Button
                variant="outline"
                className="font-medium rounded-lg bg-white text-neutral-950 border border-neutral-200 gap-2 w-full h-11"
              >
                <svg className="size-4" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.6 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.6 4.5 24 4.5c-7.7 0-14.3 4.4-17.7 10.2z"/>
                  <path fill="#4CAF50" d="M24 43.5c5.5 0 10.3-1.9 13.8-5.1l-6.4-5.2c-2 1.4-4.6 2.3-7.4 2.3-5.3 0-9.7-3.5-11.3-8.4l-6.5 5C9.4 39 16.1 43.5 24 43.5z"/>
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l6.4 5.2C41.5 35.5 43.5 30.2 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
                </svg>
                Continue with Google
              </Button>
              <p className="text-center text-neutral-500 text-xs leading-4">
                By signing in, you agree to our{" "}
                <a href="#" className="underline-offset-2 underline text-indigo-600">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline-offset-2 underline text-indigo-600">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}