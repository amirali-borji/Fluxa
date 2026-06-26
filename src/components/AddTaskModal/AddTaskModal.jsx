import { useState, useEffect } from "react";

const STATUS_OPTIONS = [
  { value: "todo", label: "در صف" },
  { value: "in_progress", label: "در حال انجام" },
  { value: "done", label: "انجام شده" },
];

const PRIORITY_OPTIONS = [
  { value: "low", label: "پایین" },
  { value: "medium", label: "متوسط" },
  { value: "high", label: "بالا" },
];

export default function AddTaskModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);

  // مودال رو حتی موقع بسته شدن یه مدت کوتاه نگه می‌داریم
  // تا انیمیشن خروج کامل پخش بشه، بعد از DOM حذفش می‌کنیم
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // هر بار مودال باز می‌شه، فرم رو ریست کن (حالت "تسک جدید" تمیز)
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("medium");
      setTag("");
    }
  }, [isOpen]);

  // بستن مودال با کلید Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const handleSubmit = async () => {
    if (!title.trim()) return; // 👈 می‌توانید اینجا یک toast خطا اضافه کنید

    setLoading(true);

    // ============================================================
    // 🔧 نقطه اتصال اصلی شما:
    // داده فرم به onSubmit پاس داده می‌شود. منطق واقعی ثبت
    // (مثلا فراخوانی Supabase / آپدیت state لیست تسک‌ها) را
    // در کامپوننت والد، داخل پراپ onSubmit پیاده‌سازی کنید.
    // ============================================================
    try {
      await onSubmit?.({ title, description, status, priority, tag });
      onClose?.();
    } catch (error) {
      console.error("خطا در ثبت تسک:", error);
      // 🔧 می‌توانید اینجا toast خطا یا پیام مناسب نمایش دهید
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* بک‌دراپ بلور شده */}
      <div
        onClick={() => onClose?.()}
        className={`absolute inset-0 bg-[#09090B]/70 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* کارت مودال */}
      <div
        className={`relative z-10 w-full max-w-[480px] rounded-2xl border border-[#27272A] bg-[#18181B] p-7 shadow-[0_32px_80px_rgba(0,0,0,0.55)] transition-all duration-300 ease-out ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-95 opacity-0"
        }`}
      >
        {/* هدر */}
        <div className="mb-6 flex flex-row items-center justify-between">
          <h2 className="text-[17px] font-bold text-[#FAFAFA]">تسک جدید</h2>
          <button
            type="button"
            onClick={() => onClose?.()}
            aria-label="بستن مودال"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#71717A] transition-colors duration-200 hover:bg-white/[0.06] hover:text-[#FAFAFA]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* بدنه فرم */}
        <div className="flex flex-col gap-5">
          {/* عنوان تسک */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#A1A1AA]">
              عنوان تسک
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلا: بازبینی طراحی صفحه ورود"
              className="w-full rounded-lg border border-[#27272A] bg-[#09090B]/40 px-4 py-3 text-sm text-[#FAFAFA] outline-none transition-colors duration-200 placeholder:text-[#52525B] focus:border-[#8B5CF6]/50"
            />
          </div>

          {/* توضیحات - اختیاری */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#A1A1AA]">
              توضیحات <span className="text-[#52525B]">(اختیاری)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="جزئیات بیشتر درباره این تسک..."
              rows={3}
              className="w-full resize-none rounded-lg border border-[#27272A] bg-[#09090B]/40 px-4 py-3 text-sm text-[#FAFAFA] outline-none transition-colors duration-200 placeholder:text-[#52525B] focus:border-[#8B5CF6]/50"
            />
          </div>

          {/* وضعیت */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#A1A1AA]">
              وضعیت
            </label>
            <div className="flex flex-row gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value)}
                  className={`flex-1 whitespace-nowrap rounded-lg border px-3 py-2 text-[12.5px] transition-colors duration-200 ${
                    status === opt.value
                      ? "border-[#8B5CF6]/50 bg-[#8B5CF6]/10 text-[#FAFAFA]"
                      : "border-[#27272A] text-[#A1A1AA] hover:border-[#3F3F46]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* اولویت */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#A1A1AA]">
              اولویت
            </label>
            <div className="flex flex-row gap-2">
              {PRIORITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPriority(opt.value)}
                  className={`flex-1 whitespace-nowrap rounded-lg border px-3 py-2 text-[12.5px] transition-colors duration-200 ${
                    priority === opt.value
                      ? "border-[#8B5CF6]/50 bg-[#8B5CF6]/10 text-[#FAFAFA]"
                      : "border-[#27272A] text-[#A1A1AA] hover:border-[#3F3F46]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* برچسب */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#A1A1AA]">
              برچسب
            </label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="مثلا: طراحی، توسعه، جلسه"
              className="w-full rounded-lg border border-[#27272A] bg-[#09090B]/40 px-4 py-3 text-sm text-[#FAFAFA] outline-none transition-colors duration-200 placeholder:text-[#52525B] focus:border-[#8B5CF6]/50"
            />
          </div>
        </div>

        {/* دکمه‌های فوتر */}
        <div className="mt-7 flex flex-row gap-3">
          <button
            type="button"
            onClick={() => onClose?.()}
            className="flex-1 rounded-lg border border-[#27272A] py-2.5 text-sm text-[#A1A1AA] transition-colors duration-200 hover:border-[#3F3F46] hover:text-[#FAFAFA]"
          >
            انصراف
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !title.trim()}
            className="relative flex-1 overflow-hidden rounded-lg bg-[#8B5CF6] py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {/* شیمر هنگام لودینگ - از همان انیمیشن shimmer که در index.css تعریف شده استفاده می‌کند */}
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
            <span className="relative">
              {loading ? "در حال ثبت..." : "ثبت تسک"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
