import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [focused, setFocused] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

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
        <div className="mb-10 flex flex-col items-center gap-3">
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
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#FAFAFA]">
            خوش برگشتید
          </h1>
          <p className="text-sm leading-relaxed text-[#A1A1AA]">
            وارد حساب کاربری خود شوید
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
            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#A1A1AA]">
                نام کاربری
              </label>
              <div
                className={`flex flex-row items-center rounded-lg border px-4 py-3 transition-all duration-200
                  ${
                    focused === "username"
                      ? "border-[#8B5CF6]/50 "
                      : "border-white/[0.06] hover:border-white/[0.10]"
                  }`}
                style={{ background: "rgba(9,9,11,0.5)" }}
              >
                <input
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocused("username")}
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

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between">
                <label className="text-[13px] font-medium text-[#A1A1AA]">
                  رمز عبور
                </label>
                <a
                  href="#"
                  className="text-[12px] text-[#52525B] transition-colors duration-200 hover:text-[#A1A1AA]"
                >
                  فراموشی رمز؟
                </a>
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
            <button
              type="button"
              className="mt-1 w-full rounded-lg bg-[#8B5CF6] py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-85 active:scale-[0.99]"
            >
              ورود به حساب
            </button>
          </div>
        </div>

        {/* Sign up */}
        <p className="mt-6 text-center text-[13px] text-[#52525B]">
          حساب ندارید؟{" "}
          <Link
            to="/register"
            className="text-[#A1A1AA] transition-colors duration-200 hover:text-[#FAFAFA]"
          >
            ثبت‌نام رایگان
          </Link>
        </p>
      </div>
    </div>
  );
}
