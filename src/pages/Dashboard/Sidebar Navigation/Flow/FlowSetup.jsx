// SidebarNavigation/Flow/FlowSetup.jsx

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const DURATIONS = [15, 30, 45, 60, 90, 120];

export default function FlowSetup({ onStart }) {
  const [mainGoal, setMainGoal] = useState("");
  const [duration, setDuration] = useState(null);
  const [subGoals, setSubGoals] = useState([]);
  const [subGoalDraft, setSubGoalDraft] = useState("");

  const isValid =
    mainGoal.trim().length > 0 && duration !== null && subGoals.length > 0;

  const handleAddSubGoal = () => {
    const text = subGoalDraft.trim();
    if (!text) return;
    setSubGoals((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
    setSubGoalDraft("");
  };

  const handleSubGoalKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSubGoal();
    }
  };

  const handleDeleteSubGoal = (id) => {
    setSubGoals((prev) => prev.filter((sg) => sg.id !== id));
  };

  const handleStart = () => {
    if (!isValid) return;
    onStart({ mainGoal: mainGoal.trim(), duration, subGoals });
  };

  return (
    <div className="mx-auto flex min-h-full max-w-[560px] flex-col justify-center px-6 py-5">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-[#FAFAFA]">
          Flow
        </h1>
        <p className="text-[15px] leading-[1.75] text-[#A1A1AA]">
          فضایی برای تمرکز عمیق روی یک هدف، بدون حواس‌پرتی.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Main Goal */}
        <div>
          <label className="mb-2.5 block text-[13px] font-medium text-[#FAFAFA]">
            هدف اصلی
          </label>
          <input
            type="text"
            value={mainGoal}
            onChange={(e) => setMainGoal(e.target.value)}
            placeholder="طراحی صفحه داشبورد"
            className="w-full rounded-lg border border-[#27272A] bg-[#18181B] px-4 py-3 text-[14px] text-[#FAFAFA] placeholder:text-[#52525B] transition-colors focus:border-[#8B5CF6] focus:outline-none"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="mb-2.5 block text-[13px] font-medium text-[#FAFAFA]">
            مدت زمان
          </label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {DURATIONS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDuration(d)}
                className={`rounded-lg border px-3 py-2.5 text-[13px] transition-colors ${
                  duration === d
                    ? "border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#8B5CF6]"
                    : "border-[#27272A] text-[#A1A1AA] hover:border-[#52525B] hover:text-[#FAFAFA]"
                }`}
              >
                {d} دقیقه
              </button>
            ))}
          </div>
        </div>

        {/* Sub Goals */}
        <div>
          <label className="mb-2.5 block text-[13px] font-medium text-[#FAFAFA]">
            زیرهدف‌ها
          </label>

          {subGoals.length > 0 && (
            <div className="mb-3 flex flex-col gap-2">
              {subGoals.map((sg) => (
                <div
                  key={sg.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#27272A] bg-[#18181B] px-4 py-2.5"
                >
                  <span className="text-[13.5px] text-[#FAFAFA]">
                    {sg.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteSubGoal(sg.id)}
                    className="shrink-0 text-[#52525B] transition-colors hover:text-[#EF4444]"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={subGoalDraft}
              onChange={(e) => setSubGoalDraft(e.target.value)}
              onKeyDown={handleSubGoalKeyDown}
              placeholder="افزودن زیرهدف"
              className="flex-1 rounded-lg border border-[#27272A] bg-[#18181B] px-4 py-2.5 text-[13.5px] text-[#FAFAFA] placeholder:text-[#52525B] transition-colors focus:border-[#8B5CF6] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddSubGoal}
              className="flex shrink-0 items-center justify-center rounded-lg border border-[#27272A] px-3.5 text-[#A1A1AA] transition-colors hover:border-[#52525B] hover:text-[#FAFAFA]"
            >
              <Plus size={17} />
            </button>
          </div>
        </div>

        {/* Start Button */}
        <button
          type="button"
          disabled={!isValid}
          onClick={handleStart}
          className={`mt-4 w-full rounded-lg py-3 text-sm font-medium transition-opacity ${
            isValid
              ? "bg-[#8B5CF6] text-white hover:opacity-85"
              : "cursor-not-allowed bg-[#18181B] text-[#52525B]"
          }`}
        >
          شروع Flow
        </button>
      </div>
    </div>
  );
}