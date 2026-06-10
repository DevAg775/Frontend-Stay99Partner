import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Clock,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import API from "@/api";
import { useForceLight } from "@/lib/useForceLight";

export default function AdminLogin() {
  const navigate = useNavigate();
  useForceLight();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already signed in as admin? Skip the login page.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === "admin") navigate("/admin/dashboard", { replace: true });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data.user?.role !== "admin") {
        setError("Admin access required. These credentials are not authorized.");
        return;
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-neutral-950 w-full min-h-screen">
      <div className="flex w-full min-h-screen">
        {/* Left panel */}
        <div className="relative w-[55%] bg-[linear-gradient(150deg,#4F46E5_0%,#312E81_55%,#1E1B4B_100%)] text-white flex p-12 flex-col justify-between max-lg:hidden">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-lg bg-white/15 flex justify-center items-center">
              <ShieldCheck className="size-5 text-white" />
            </div>
            <span className="font-bold text-xl leading-7 tracking-tight">PropVerify</span>
          </div>

          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit font-medium rounded-full bg-white/10 text-indigo-100 text-xs px-3 py-1 items-center gap-1.5">
              <ShieldCheck className="size-3.5" />
              Admin Portal Access
            </span>
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-4xl leading-tight tracking-tight">Admin Portal</h1>
              <p className="max-w-md text-indigo-200 text-base leading-6">
                Secure access for PropVerify administrators only. All sessions are
                monitored and audit logged.
              </p>
            </div>

            {/* Properties overview card */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-5 max-w-md">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">Properties Overview</span>
                <span className="text-indigo-200 text-xs">Live</span>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                {[
                  { name: "The Grand Palace Hotel", status: "Approved", color: "bg-emerald-400/20 text-emerald-200", dot: "bg-emerald-400" },
                  { name: "Sunrise Beach Resort", status: "Pending", color: "bg-amber-400/20 text-amber-200", dot: "bg-amber-400" },
                  { name: "Mountain View Inn", status: "Rejected", color: "bg-red-400/20 text-red-200", dot: "bg-red-400" },
                  { name: "City Center Suites", status: "Pending", color: "bg-amber-400/20 text-amber-200", dot: "bg-amber-400" },
                ].map((p) => (
                  <div key={p.name} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${p.dot}`} />
                      <span className="text-sm text-indigo-50">{p.name}</span>
                    </div>
                    <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${p.color}`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/10">
                {[
                  { v: "248", l: "Total", c: "text-white" },
                  { v: "186", l: "Approved", c: "text-emerald-300" },
                  { v: "42", l: "Pending", c: "text-amber-300" },
                  { v: "20", l: "Rejected", c: "text-red-300" },
                ].map((s) => (
                  <div key={s.l} className="flex flex-col">
                    <span className={`font-bold text-lg leading-6 ${s.c}`}>{s.v}</span>
                    <span className="text-[11px] text-indigo-200">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-indigo-100 text-xs flex items-center gap-1.5">
              <Lock className="size-3.5" /> Secure Access
            </div>
            <div className="text-indigo-100 text-xs flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" /> Role-Based Permissions
            </div>
            <div className="text-indigo-100 text-xs flex items-center gap-1.5">
              <Clock className="size-3.5" /> Audit Logged
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[45%] max-lg:w-full bg-white flex p-12 justify-center items-center">
          <div className="max-w-sm flex flex-col gap-6 w-full">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="size-12 rounded-xl bg-indigo-50 flex justify-center items-center">
                <ShieldCheck className="size-6 text-indigo-600" />
              </div>
              <span className="inline-flex font-medium rounded-full bg-indigo-50 text-indigo-600 text-xs px-3 py-1 items-center gap-1.5">
                <ShieldCheck className="size-3.5" />
                Admin Portal
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-slate-900 text-2xl leading-8 tracking-tight">
                  Sign in to Admin Panel
                </h2>
                <p className="text-neutral-500 text-sm leading-5">
                  Restricted access — authorized personnel only
                </p>
              </div>
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
                    placeholder="admin@propverify.com"
                    className="rounded-lg pl-10 h-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-neutral-950 text-sm leading-5">Password</label>
                <div className="relative">
                  <Lock className="top-1/2 size-4 -translate-y-1/2 text-neutral-500 absolute left-3" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
                <a href="#" className="font-medium text-indigo-600 text-sm leading-5">
                  Forgot Password?
                </a>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white w-full h-11 gap-2"
              >
                <LogIn className="size-4" />
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
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.6 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.6 4.5 24 4.5c-7.7 0-14.3 4.4-17.7 10.2z" />
                <path fill="#4CAF50" d="M24 43.5c5.5 0 10.3-1.9 13.8-5.1l-6.4-5.2c-2 1.4-4.6 2.3-7.4 2.3-5.3 0-9.7-3.5-11.3-8.4l-6.5 5C9.4 39 16.1 43.5 24 43.5z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l6.4 5.2C41.5 35.5 43.5 30.2 43.5 24c0-1.2-.1-2.3-.4-3.5z" />
              </svg>
              Continue with Google
            </Button>

            <div className="rounded-lg bg-red-50 border border-red-100 flex p-3 items-start gap-2.5">
              <AlertTriangle className="size-4 shrink-0 text-red-500 mt-0.5" />
              <p className="text-red-600 text-xs leading-4">
                Unauthorized access attempts are logged and reported to the security team.
              </p>
            </div>

            <p className="text-center text-neutral-400 text-xs leading-4">
              Protected by PropVerify Security ·{" "}
              <a href="#" className="underline-offset-2 underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
