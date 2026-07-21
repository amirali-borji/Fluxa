import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../services/supabase-client";
import toast from "react-hot-toast";

export default function Login() {
  const [focused, setFocused] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const signUpHandler = async () => {
    if (loading) return;
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      displayName,
      email,
      password,
      options: {
        data: {
          displayName,
        },
        emailRedirectTo: "https://amirali-borji.github.io/Fluxa/#/",
      },
    });

    if (error) {
      setLoading(false);
      if (error.message === "Password should be at least 6 characters.") {
        toast.error("رمز عبور باید حداقل 6 کاراکتر باشد");
        return;
      }
      if (error.message === "email rate limit exceeded") {
        toast.error(
          "تعداد درخواست‌های ایمیل شما بیش از حد مجاز است. لطفاً بعداً دوباره تلاش کنید.",
        );
        return;
      }

      console.error("Error signing up: ", error);
    } else {
      toast.success("ایمیل خودتون رو چک کنید");
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-56px)] w-full items-center justify-center overflow-hidden bg-[#09090B] px-4">
      {/* ── Animated orb ── */}
      <div
        className="pointer-events-none fixed z-0"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0.08) 55%, transparent 75%)",
          bottom: "-200px",
          left: "-150px",
          transform: mounted
            ? "translate(0px, 0px) scale(1)"
            : "translate(-200px, 200px) scale(0.6)",
          transition: "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
          filter: "blur(1px)",
        }}
      />

      {/* ── Subtle grid ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#FAFAFA 1px, transparent 1px), linear-gradient(90deg, #FAFAFA 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Card ── */}
      <div
        className="relative z-10 flex w-full max-w-[420px] flex-col"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0px)" : "translateY(16px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          transitionDelay: "0.15s",
        }}
      >
        {/* Logo */}
        <div className="mb-2 flex flex-col items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8B5CF6]/10 ring-1 ring-[#8B5CF6]/25">
            <div className="h-5 w-5 rounded-md bg-[#8B5CF6]" />
          </div>
          <span
            className="text-lg font-semibold tracking-tight text-[#FAFAFA]"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              direction: "ltr",
            }}
          >
            Fluxa
          </span>
        </div>

        {/* Heading */}
        <div className="mb-5 flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#FAFAFA]">
            خوش اومدید
          </h1>
          <p className="text-sm leading-relaxed text-[#A1A1AA]">
            حساب کاربری خود را بسازید
          </p>
        </div>

        {/* Glass form card */}
        <div
          className="w-full rounded-2xl border border-white/10 p-8"
          style={{
            background: "rgba(24, 24, 27, 0.55)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04) inset, 0 24px 48px rgba(0,0,0,0.4)",
          }}
        >
          <div className="flex flex-col gap-5">
            {/* displayName */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#A1A1AA]">
                نام نمایشی
              </label>
              <div
                className={`flex flex-row items-center rounded-lg border px-4 py-3 transition-all duration-200
                  ${
                    focused === "displayName"
                      ? "border-[#8B5CF6]/50 "
                      : "border-white/[0.06] hover:border-white/[0.10]"
                  }`}
                style={{ background: "rgba(9,9,11,0.5)" }}
              >
                <input
                  type="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  onFocus={() => setFocused("displayName")}
                  onBlur={() => setFocused(null)}
                  placeholder="fluxa_user"
                  className="w-full bg-transparent text-sm text-[#FAFAFA] outline-none placeholder:text-[#3F3F46]"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    direction: "ltr",
                    textAlign: "right",
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#A1A1AA]">
                ایمیل
              </label>
              <div
                className={`flex flex-row items-center rounded-lg border px-4 py-3 transition-all duration-200
                  ${
                    focused === "email"
                      ? "border-[#8B5CF6]/50 "
                      : "border-white/[0.06] hover:border-white/[0.10]"
                  }`}
                style={{ background: "rgba(9,9,11,0.5)" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="fluxa_user@gmail.com"
                  className="w-full bg-transparent text-sm text-[#FAFAFA] outline-none placeholder:text-[#3F3F46]"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    direction: "ltr",
                    textAlign: "right",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between">
                <label className="text-[13px] font-medium text-[#A1A1AA]">
                  رمز عبور
                </label>
              </div>
              <div
                className={`flex flex-row items-center rounded-lg border px-4 py-3 transition-all duration-200
                  ${
                    focused === "password"
                      ? "border-[#8B5CF6]/50 "
                      : "border-white/[0.06] hover:border-white/[0.10]"
                  }`}
                style={{ background: "rgba(9,9,11,0.5)" }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-[#FAFAFA] outline-none placeholder:text-[#3F3F46]"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    direction: "ltr",
                    textAlign: "right",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-3 shrink-0 text-[#52525B] transition-colors duration-200 hover:text-[#A1A1AA]"
                >
                  {showPassword ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            {/* Submit */}
            <button
              onClick={signUpHandler}
              disabled={loading}
              className="relative mt-1 w-full overflow-hidden rounded-lg bg-[#8B5CF6] py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-85 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {/* shimmer sweep هنگام لودینگ */}
              {loading && (
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
                    animation: "shimmer 1.6s ease infinite",
                  }}
                />
              )}

              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    {/* دو حلقه که در جهت مخالف می‌چرخند */}
                    <span className="relative h-[18px] w-[18px] shrink-0">
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: "1.5px solid transparent",
                          borderTopColor: "rgba(255,255,255,0.9)",
                          borderRightColor: "rgba(255,255,255,0.3)",
                          animation: "spin 0.9s linear infinite",
                        }}
                      />
                      <span
                        className="absolute rounded-full"
                        style={{
                          inset: "4px",
                          border: "1.5px solid transparent",
                          borderBottomColor: "rgba(255,255,255,0.7)",
                          animation: "spin 0.6s linear infinite reverse",
                        }}
                      />
                    </span>
                    <span style={{ transition: "opacity 0.2s" }}>
                      در حال ثبت نام...
                    </span>
                  </>
                ) : (
                  "ثبت نام"
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Sign up */}
        <p className="mt-6 text-center text-[13px] text-[#52525B]">
          حساب دارید؟{" "}
          <Link
            to="/login"
            className="text-[#A1A1AA] transition-colors duration-200 hover:text-[#FAFAFA]"
          >
            ورود
          </Link>
        </p>
      </div>
    </div>
  );
}
