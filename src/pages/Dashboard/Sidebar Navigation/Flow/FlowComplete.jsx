// SidebarNavigation/Flow/FlowComplete.jsx

import { CheckCircle2 } from "lucide-react";

export default function FlowComplete({
  mainGoal,
  duration,
  completedCount,
  totalCount,
  onReturn,
}) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[600px] flex-col items-center justify-center px-6 py-16 text-center">
      {/* Success icon */}
      <div className="mb-8 flex h-8j w-8 items-center justify-center rounded-full border border-[#8B5CF6]/25 bg-[#8B5CF6]/10">
        <CheckCircle2 size={30} className="text-[#8B5CF6]" strokeWidth={1.75} />
      </div>

      {/* Message */}
      <h1 className="mb-3 text-2xl font-bold tracking-tight text-[#FAFAFA]">
        جلسه با موفقیت به پایان رسید.
      </h1>

      <p className="mb-10 text-[15px] leading-[1.75] text-[#A1A1AA]">
        {mainGoal}
      </p>

      {/* Stats */}
      <div className="mb-10 grid w-full grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#27272A] bg-[#27272A]">
        <div className="flex flex-col items-center justify-center bg-[#18181B] p-6">
          <span className="mb-1.5 text-2xl font-bold tracking-tight text-[#FAFAFA]">
            {duration} دقیقه
          </span>
          <span className="text-xs text-[#52525B]">مدت زمان</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#18181B]  p-6">
          <span className="mb-1.5 text-2xl font-bold tracking-tight text-[#FAFAFA]">
            {completedCount} / {totalCount}
          </span>
          <span className="text-xs text-[#52525B]">زیرهدف تکمیل‌شده</span>
        </div>
      </div>

      {/* Return button */}
      <button
        type="button"
        onClick={onReturn}
        className="w-full rounded-lg bg-[#FAFAFA] py-3 text-sm font-medium text-[#09090B] transition-opacity hover:opacity-85"
      >
        بازگشت
      </button>
    </div>
  );
}