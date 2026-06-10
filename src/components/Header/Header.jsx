

export default function Header() {
  const NAV_LINKS = ["ویژگی‌ها", "قیمت‌گذاری", "درباره ما"];
  return (
    <header className="flex justify-center fixed top-0 right-0 left-0 z-50 border-b border-[#27272A] bg-[#09090B]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-275 w-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="h-[22px] w-[22px] rounded-md bg-[#8B5CF6] opacity-90" />
          <span className="font-inter text-[15px] font-medium tracking-tight text-[#FAFAFA]">
            Fluxa
          </span>
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
          <a
            href="#"
            className="hidden text-sm text-[#A1A1AA] transition-colors duration-200 hover:text-[#FAFAFA] sm:block"
          >
            ورود
          </a>
          <a
            href="#"
            className="rounded-lg bg-[#FAFAFA] px-4 py-1.75 text-[13px] font-medium text-[#09090B] transition-opacity duration-200 hover:opacity-85"
          >
            شروع رایگان
          </a>
        </div>
      </div>
    </header>
  );
}
