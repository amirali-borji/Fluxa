// SidebarNavigation/Flow/FlowSession.jsx
// تغییرات نسبت به نسخه قبلی:

import { useState, useEffect, useRef } from "react";
import { Pause, Play, X, Check } from "lucide-react";
import { useModal } from "../../../../context/ModalContext"; 

export default function FlowSession({ flowData, onComplete }) {
  const totalSeconds = flowData.duration * 60;

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [subGoals, setSubGoals] = useState(flowData.subGoals);

  const { setModalOpen, setModalText, setYesHandler, setNoHandler } = useModal();

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? (clearInterval(intervalRef.current), 0) : prev - 1));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  useEffect(() => {
    if (secondsLeft === 0) {
      const completedCount = subGoals.filter((sg) => sg.completed).length;
      onComplete(completedCount);
    }
  }, [secondsLeft]);

  const completedCount = subGoals.filter((sg) => sg.completed).length;
  const totalCount = subGoals.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const formatTime = (totalSec) => {
    const m = Math.floor(totalSec / 60).toString().padStart(2, "0");
    const s = (totalSec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const toggleSubGoal = (id) => {
    setSubGoals((prev) =>
      prev.map((sg) => (sg.id === id ? { ...sg, completed: !sg.completed } : sg))
    );
  };

  const handleEndSessionClick = () => {
    setModalText("آیا می‌خواهید جلسه را پایان دهید؟");
    setYesHandler(() => () => onComplete(completedCount));
    setNoHandler(null);
    setModalOpen(true);
  };

  return (
    <div className="mx-auto flex min-h-full max-w-[520px] flex-col justify-center px-6 py-16">
      <p className="mb-8 text-center text-[15px] text-[#A1A1AA]">{flowData.mainGoal}</p>

      <div className="mb-3 text-center">
        <span className="text-7xl font-bold tracking-tighter tabular-nums text-[#FAFAFA] md:text-8xl">
          {formatTime(secondsLeft)}
        </span>
      </div>

      <p className="mb-3 text-center text-[13px] text-[#52525B]">{progressPercent}٪ تکمیل شده</p>

      <div className="mb-12 h-1 w-full overflow-hidden rounded-full bg-[#27272A]">
        <div
          className="h-full rounded-full bg-[#8B5CF6] transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mb-12 flex flex-col gap-2">
        {subGoals.map((sg) => (
          <button
            key={sg.id}
            type="button"
            onClick={() => toggleSubGoal(sg.id)}
            className="flex items-center gap-3 rounded-lg border border-[#27272A] bg-[#18181B] px-4 py-3 text-right transition-colors hover:border-[#3F3F46]"
          >
            <div
              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors ${
                sg.completed ? "border-[#8B5CF6] bg-[#8B5CF6]" : "border-[#3F3F46]"
              }`}
            >
              {sg.completed && <Check size={12} className="text-white" />}
            </div>
            <span className={`text-[13.5px] ${sg.completed ? "text-[#52525B] line-through" : "text-[#FAFAFA]"}`}>
              {sg.text}
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#27272A] py-3 text-sm text-[#A1A1AA] transition-colors hover:border-[#52525B] hover:text-[#FAFAFA]"
        >
          {isPaused ? <Play size={15} /> : <Pause size={15} />}
          {isPaused ? "ادامه" : "توقف موقت"}
        </button>

        <button
          type="button"
          onClick={handleEndSessionClick}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#27272A] py-3 text-sm text-[#A1A1AA] transition-colors hover:border-[#EF4444]/40 hover:text-[#EF4444]"
        >
          <X size={15} />
          پایان جلسه
        </button>
      </div>
    </div>
  );
}