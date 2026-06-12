import { Link } from "react-router-dom";

export default function Header({ session }) {
  const NAV_LINKS = ["ویژگی‌ها", "قیمت‌گذاری", "درباره ما"];
  return (
    <header className="flex justify-center fixed top-0 right-0 left-0 z-50 border-b border-[#27272A] bg-[#09090B]/20 backdrop-blur-xl">
      <div className="mx-auto my-1 flex h-14 max-w-275 w-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="h-[22px] w-[22px] rounded-md bg-[#8B5CF6] opacity-90" />
          <Link
            to="/"
            className="font-inter text-[15px] font-medium tracking-tight text-[#FAFAFA]"
          >
            Fluxa
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-[#A1A1AA] transition-colors duration-200 hover:text-[#FAFAFA]"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <Link
              to="/dashboard"
              className="rounded-lg bg-[#FAFAFA] px-4 py-1.75 text-[13px] font-medium text-[#09090B] transition-opacity duration-200 hover:opacity-85"
            >
              داشبورد
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-[#FAFAFA] px-4 py-1.75 text-[13px] font-medium text-[#09090B] transition-opacity duration-200 hover:opacity-85"
            >
              ورود
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
