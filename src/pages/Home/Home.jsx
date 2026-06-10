import { Link } from "react-router-dom";

const FEATURES = [
  {
    title: "تمرکز بدون حواس‌پرتی",
    description:
      "رابط کاربری فلوکسا آنچه را که اهمیت دارد نشان می‌دهد. بدون نوتیفیکیشن‌های اضافه، بدون شلوغی، فقط کار.",
  },
  {
    title: "همکاری روان تیمی",
    description:
      "اعضای تیم در لحظه با یکدیگر هماهنگ می‌شوند. تغییرات بلادرنگ، دیدگاه مشترک، پیشرفت قابل اندازه‌گیری.",
  },
  {
    title: "گزارش‌دهی هوشمند",
    description:
      "بینش‌های واضح درباره عملکرد تیم. بدانید کجا انرژی صرف می‌شود و چه چیزی را باید بهبود داد.",
  },
];

const TASKS = [
  {
    id: 1,
    title: "بازبینی طراحی رابط کاربری",
    status: "در حال انجام",
    statusColor: "text-[#8B5CF6] bg-[#8B5CF6]/10",
    dot: "bg-[#8B5CF6]",
    priority: "بالا",
    priorityColor: "bg-[#EF4444]",
    tag: "طراحی",
    done: false,
  },
  {
    id: 2,
    title: "جلسه هم‌راستایی تیم محصول",
    status: "انجام شد",
    statusColor: "text-[#22C55E] bg-[#22C55E]/[0.08]",
    dot: "bg-[#22C55E]",
    priority: "متوسط",
    priorityColor: "bg-[#F59E0B]",
    tag: "جلسه",
    done: true,
  },
  {
    id: 3,
    title: "مستندسازی API جدید",
    status: "در صف",
    statusColor: "text-[#71717A] bg-[#52525B]/10",
    dot: "bg-[#52525B]",
    priority: "پایین",
    priorityColor: "bg-[#52525B]",
    tag: "توسعه",
    done: false,
  },
  {
    id: 4,
    title: "بهینه‌سازی عملکرد صفحه اصلی",
    status: "در حال انجام",
    statusColor: "text-[#8B5CF6] bg-[#8B5CF6]/10",
    dot: "bg-[#8B5CF6]",
    priority: "بالا",
    priorityColor: "bg-[#EF4444]",
    tag: "توسعه",
    done: false,
  },
  {
    id: 5,
    title: "نوشتن تست‌های یکپارچه‌سازی",
    status: "در صف",
    statusColor: "text-[#71717A] bg-[#52525B]/10",
    dot: "bg-[#52525B]",
    priority: "متوسط",
    priorityColor: "bg-[#F59E0B]",
    tag: "QA",
    done: false,
  },
];

const FOOTER_LINKS = {
  محصول: ["ویژگی‌ها", "قیمت‌گذاری", "چه خبر", "نقشه راه"],
  شرکت: ["درباره ما", "وبلاگ", "مشاغل", "تماس"],
  منابع: ["مستندات", "API", "راهنما", "وضعیت سرور"],
};

function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#27272A] bg-[#18181B] shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
      {/* Chrome */}
      <div className="flex items-center gap-1.5 border-b border-[#27272A] bg-[#09090B]/50 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-[#EF4444] opacity-60" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#F59E0B] opacity-60" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#22C55E] opacity-60" />
        <div className="flex-1" />
        <span className="text-[11px] text-[#A1A1AA] opacity-60">
          کارها · بهار ۱۴۰۴
        </span>
      </div>

      <div className="flex min-h-[340px] md:min-h-[400px]">
        {/* Sidebar */}
        <div className="hidden w-44 shrink-0 border-l border-[#27272A] bg-[#09090B]/30 py-4 md:block">
          {[
            { label: "همه کارها", active: true },
            { label: "در حال انجام", active: false },
            { label: "انجام شده", active: false },
            { label: "تیم طراحی", active: false },
            { label: "تیم توسعه", active: false },
          ].map(({ label, active }) => (
            <div
              key={label}
              className={`cursor-default select-none border-r-2 px-4 py-[7px] text-[12.5px] ${active ? "border-[#8B5CF6] bg-[#8B5CF6]/[0.08] text-[#FAFAFA]" : "border-transparent text-[#A1A1AA]"}`}
            >
              {label}
            </div>
          ))}
          <p className="mx-4 mb-2 mt-3 text-[10px] uppercase tracking-widest text-[#3F3F46]">
            پروژه‌ها
          </p>
          {["وبسایت جدید", "اپ موبایل", "داشبورد"].map((p) => (
            <div
              key={p}
              className="flex cursor-default items-center gap-1.5 px-4 py-1.5 text-xs text-[#52525B]"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-[#3F3F46]" />
              {p}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#27272A] px-5 py-3">
            <span className="text-[13px] font-medium text-[#FAFAFA]">
              همه کارها
            </span>
            <div className="flex gap-2">
              <button className="rounded-md border border-[#27272A] px-2.5 py-1 text-[11.5px] text-[#A1A1AA] transition-colors hover:border-[#52525B] hover:text-[#FAFAFA]">
                فیلتر
              </button>
              <button className="hidden rounded-md border border-[#27272A] px-2.5 py-1 text-[11.5px] text-[#A1A1AA] transition-colors hover:border-[#52525B] hover:text-[#FAFAFA] sm:block">
                گروه‌بندی
              </button>
              <button className="rounded-md bg-[#8B5CF6] px-2.5 py-1 text-[11.5px] text-white transition-opacity hover:opacity-85">
                + کار جدید
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_100px_64px] gap-2 border-b border-[#27272A]/50 px-5 py-2 md:grid-cols-[1fr_110px_68px_56px]">
            {["عنوان", "وضعیت", "اولویت"].map((h) => (
              <span
                key={h}
                className="text-[10.5px] uppercase tracking-wider text-[#52525B]"
              >
                {h}
              </span>
            ))}
            <span className="hidden text-[10.5px] uppercase tracking-wider text-[#52525B] md:block">
              برچسب
            </span>
          </div>

          {TASKS.map((task, i) => (
            <div
              key={task.id}
              className={`grid cursor-default grid-cols-[1fr_100px_64px] items-center gap-2 px-5 py-2.5 transition-colors hover:bg-white/[0.015] md:grid-cols-[1fr_110px_68px_56px] ${i < TASKS.length - 1 ? "border-b border-[#27272A]/40" : ""}`}
            >
              <span
                className={`overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] ${task.done ? "text-[#A1A1AA]/50 line-through" : "text-[#FAFAFA]"}`}
              >
                {task.title}
              </span>
              <div
                className={`inline-flex w-fit items-center gap-1 rounded px-1.5 py-0.5 ${task.statusColor}`}
              >
                <div
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${task.dot}`}
                />
                <span className="whitespace-nowrap text-[10.5px]">
                  {task.status}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className={`h-2 w-2 shrink-0 rounded-sm ${task.priorityColor} ${task.priority === "پایین" ? "opacity-40" : "opacity-80"}`}
                />
                <span className="text-[11px] text-[#A1A1AA]">
                  {task.priority}
                </span>
              </div>
              <span className="hidden rounded border border-[#27272A] px-1.5 py-0.5 text-[10.5px] text-[#52525B] md:inline-block">
                {task.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="px-6 pb-24 pt-10 md:pb-32 md:pt-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#8B5CF6]/25 bg-[#8B5CF6]/[0.06] px-4 py-[5px]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6]" />
            <span className="text-xs text-[#8B5CF6]">نسخه ۱.۰ منتشر شد</span>
          </div>
        </div>

        <h1 className="mx-auto mb-5 max-w-[780px] text-center text-5xl font-bold leading-[1.1] tracking-tighter text-[#FAFAFA] md:text-6xl lg:text-7xl">
          از ایده تا اجرا
          <br />
          <span className="mx-auto mb-5 max-w-[780px] text-center text-5xl font-bold leading-[1.1] tracking-tighter text-[#FAFAFA] md:text-6xl lg:text-7xl">
            همگی در
          </span>
          <span> </span>
          <span className="mx-auto mb-5 max-w-[780px] text-center text-5xl font-bold leading-[1.1] tracking-tighter text-fluxa-primary md:text-6xl lg:text-7xl">
            Fluxa
          </span>
        </h1>

        <p className="mx-auto mb-11 max-w-[460px] text-center text-base leading-[1.75] text-[#A1A1AA] md:text-lg">
          فلوکسا فضایی آرام برای تیم‌ها می‌سازد تا تمرکز کنند، پیشرفت کنند و
          کارها را به سرانجام برسانند.
        </p>

        <div className="mb-20 flex flex-wrap justify-center gap-3">
          <a
            href="#"
            className="rounded-lg bg-[#FAFAFA] px-6 py-[11px] text-sm font-medium text-[#09090B] transition-opacity duration-200 hover:opacity-85"
          >
            شروع رایگان
          </a>
          <a
            href="#"
            className="rounded-lg border border-[#27272A] px-6 py-[11px] text-sm text-[#A1A1AA] transition-colors duration-200 hover:border-[#52525B] hover:text-[#FAFAFA]"
          >
            مشاهده دمو
          </a>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="border-t border-[#27272A] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="mb-5 text-[11px] uppercase tracking-[0.12em] text-[#8B5CF6]">
          چرا فلوکسا
        </p>

        <div className="mb-16 flex flex-col gap-4 md:mb-20 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-sm text-[clamp(26px,4vw,40px)] font-bold leading-[1.2] tracking-tight text-[#FAFAFA]">
            ساخته شده برای تیم‌هایی که نتیجه می‌گیرند.
          </h2>
          <p className="max-w-[360px] pt-1 text-[15px] leading-[1.75] text-[#A1A1AA]">
            فلوکسا با ایده‌ای ساده طراحی شد: ابزارهای کاری باید آرامش بیاورند،
            نه استرس.
          </p>
        </div>

        <div className="grid grid-cols-1 divide-y divide-[#27272A] md:grid-cols-3 md:divide-x md:divide-y-0">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`py-8 md:py-0 ${i === 0 ? "md:pl-10" : i === 2 ? "md:pr-10" : "md:px-10"}`}
            >
              <h3 className="mb-3 text-[17px] font-semibold leading-snug tracking-tight text-[#FAFAFA]">
                {f.title}
              </h3>
              <p className="text-sm leading-[1.8] text-[#A1A1AA]">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductPreview() {
  return (
    <section className="border-t border-[#27272A] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 text-[11px] uppercase tracking-[0.12em] text-[#8B5CF6]">
            محصول
          </p>
          <h2 className="mx-auto max-w-lg text-[clamp(24px,4vw,38px)] font-bold leading-[1.2] tracking-tight text-[#FAFAFA]">
            همه چیز در یک فضای آرام
          </h2>
        </div>

        <div className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#27272A] bg-[#27272A] md:grid-cols-4">
          {[
            { value: "۱۲,۰۰۰+", label: "تیم فعال" },
            { value: "۴.۹ ★", label: "امتیاز کاربران" },
            { value: "۹۸٪", label: "رضایت‌مندی" },
            { value: "۲۴/۷", label: "پشتیبانی" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center bg-[#18181B] px-6 py-8 text-center"
            >
              <span className="mb-1.5 text-2xl font-bold tracking-tight text-[#FAFAFA] md:text-3xl">
                {value}
              </span>
              <span className="text-xs text-[#52525B]">{label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[#27272A] bg-[#27272A] md:grid-cols-3">
          {[
            {
              tag: "مدیریت کارها",
              title: "وظایف خود را در یک نگاه ببینید",
              desc: "نمایش لیستی، تخته‌ای، و تقویمی. هر تیم به شکل خودش کار می‌کند.",
            },
            {
              tag: "همکاری",
              title: "تیم‌تان در یک فضا جمع شوند",
              desc: "کامنت، منشن، و اطلاع‌رسانی هوشمند — بدون سروصدای اضافی.",
            },
            {
              tag: "گزارش",
              title: "پیشرفت را به عدد ببینید",
              desc: "نمودارهای ساده، هفتگی و ماهانه. بدون پیچیدگی، فقط شفافیت.",
            },
          ].map(({ tag, title, desc }) => (
            <div
              key={tag}
              className="group flex flex-col gap-4 bg-[#18181B] p-7 transition-colors duration-300 hover:bg-[#1C1C1F]"
            >
              <span className="w-fit rounded-md border border-[#27272A] px-2.5 py-1 text-[11px] text-[#52525B] transition-colors group-hover:border-[#3F3F46] group-hover:text-[#71717A]">
                {tag}
              </span>
              <h3 className="text-[15px] font-semibold leading-snug text-[#FAFAFA]">
                {title}
              </h3>
              <p className="text-[13.5px] leading-[1.75] text-[#A1A1AA]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t border-[#27272A] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[640px] text-center">
        <h2 className="mb-5 text-[clamp(28px,5vw,52px)] font-bold leading-[1.15] tracking-tighter text-[#FAFAFA]">
          آماده‌اید شروع کنید؟
        </h2>
        <p className="mb-11 text-base leading-[1.75] text-[#A1A1AA] md:text-[17px]">
          به هزاران تیمی بپیوندید که با فلوکسا آرام‌تر و هوشمندتر کار می‌کنند.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#"
            className="rounded-lg bg-[#8B5CF6] px-7 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-85"
          >
            شروع رایگان — همین حالا
          </a>
          <a
            href="#"
            className="rounded-lg border border-[#27272A] px-7 py-3 text-sm text-[#A1A1AA] transition-colors duration-200 hover:border-[#52525B] hover:text-[#FAFAFA]"
          >
            صحبت با تیم فروش
          </a>
        </div>
        <p className="mt-9 text-xs tracking-wide text-[#52525B]">
          بیش از ۱۲,۰۰۰ تیم در ایران از فلوکسا استفاده می‌کنند · بدون نیاز به
          کارت اعتباری
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#27272A] px-6 pb-10 pt-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-14 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-5 w-5 rounded-[5px] bg-[#8B5CF6] opacity-85" />
              <span className="font-inter text-sm font-medium text-[#FAFAFA]">
                Fluxa
              </span>
            </div>
            <p className="max-w-[200px] text-[13px] leading-[1.75] text-[#A1A1AA]">
              ابزار مدیریت کار برای تیم‌های ایرانی. آرام، هوشمند، و موثر.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="mb-4 text-[11.5px] font-medium tracking-wide text-[#FAFAFA]">
                {section}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-[#A1A1AA] transition-colors duration-200 hover:text-[#FAFAFA]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#27272A] pt-6">
          <p className="text-xs text-[#52525B]">
            © ۱۴۰۴ فلوکسا. تمامی حقوق محفوظ است.
          </p>
          <div className="flex gap-5">
            {["حریم خصوصی", "شرایط استفاده"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-[#52525B] transition-colors duration-200 hover:text-[#A1A1AA]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA]">
      <Hero />
      <Features />
      <ProductPreview />
      <CTA />
      <Footer />
    </div>
  );
}
