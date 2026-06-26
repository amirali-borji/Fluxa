import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/tasks";
import TaskModal from "../../components/AddTaskModal/AddTaskModal";

// 🎨 تنظیمات نمایش وضعیت
const STATUS_CONFIG = {
  todo: {
    label: "در صف",
    badgeBg: "bg-[#52525B]/10",
    text: "text-[#A1A1AA]",
    dot: "bg-[#52525B]",
  },
  in_progress: {
    label: "در حال انجام",
    badgeBg: "bg-[#8B5CF6]/10",
    text: "text-[#8B5CF6]",
    dot: "bg-[#8B5CF6]",
  },
  done: {
    label: "انجام شده",
    badgeBg: "bg-[#22C55E]/[0.08]",
    text: "text-[#22C55E]",
    dot: "bg-[#22C55E]",
  },
};

// 🎨 تنظیمات نمایش اولویت
const PRIORITY_CONFIG = {
  low: { label: "پایین", dot: "bg-[#52525B]", opacity: "opacity-40" },
  medium: { label: "متوسط", dot: "bg-[#F59E0B]", opacity: "opacity-80" },
  high: { label: "بالا", dot: "bg-[#EF4444]", opacity: "opacity-80" },
};

// ──────────────────────────────
// 🔹 هوک موقعیت‌یابی دراپ‌داون نسبت به viewport (Portal-based)
// ──────────────────────────────
function useAnchoredPosition(
  anchorRef,
  isOpen,
  { width = 120, height = 110 } = {},
) {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setPos(null);
      return;
    }

    const updatePosition = () => {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      const margin = 8;
      const half = width / 2;

      let left = rect.left + rect.width / 2;
      left = Math.min(
        Math.max(left, half + margin),
        window.innerWidth - half - margin,
      );

      const spaceBelow = window.innerHeight - rect.bottom;
      const top =
        spaceBelow < height + 12 ? rect.top - height - 6 : rect.bottom + 6;

      setPos({ top, left });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, anchorRef, width, height]);

  return pos;
}

// ──────────────────────────────
// 🔹 آیکن‌ها
// ──────────────────────────────
function ChevronIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function PencilIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CalendarIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

// ──────────────────────────────
// 🔹 سلول وضعیت (قابل تغییر) — دراپ‌داون به‌صورت Portal روی body
// ──────────────────────────────
function StatusCell({ task, isOpen, onToggle, onSelect, dropdownRef }) {
  const info = STATUS_CONFIG[task.status] ?? STATUS_CONFIG.todo;
  const anchorRef = useRef(null);
  const position = useAnchoredPosition(anchorRef, isOpen, {
    width: 120,
    height: 100,
  });

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        onClick={onToggle}
        className={`group inline-flex w-fit items-center gap-1 rounded px-1.5 py-0.5 transition-all duration-150 ${info.badgeBg} hover:ring-1 hover:ring-white/[0.08] ${
          isOpen ? "ring-1 ring-white/[0.12]" : ""
        }`}
      >
        <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${info.dot}`} />
        <span className={`whitespace-nowrap text-[10.5px] ${info.text}`}>
          {info.label}
        </span>
        <ChevronIcon
          className={`h-2.5 w-2.5 shrink-0 opacity-0 transition-all duration-150 group-hover:opacity-50 ${
            isOpen ? "rotate-180 opacity-50" : ""
          }`}
        />
      </button>

      {isOpen &&
        position &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              transform: "translateX(-50%)",
            }}
            className="z-[999] w-[120px] overflow-hidden rounded-lg border border-[#27272A] bg-[#18181B] py-1 shadow-2xl shadow-black/50"
          >
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <button
                key={key}
                type="button"
                onClick={() => onSelect(key)}
                className="flex w-full items-center gap-2 px-2.5 py-[7px] text-right text-[11px] text-[#A1A1AA] transition-colors hover:bg-white/[0.06] hover:text-[#FAFAFA]"
              >
                <div
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${cfg.dot}`}
                />
                <span className="flex-1">{cfg.label}</span>
                {key === task.status && (
                  <CheckIcon className="h-3 w-3 shrink-0 text-[#8B5CF6]" />
                )}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

// ──────────────────────────────
// 🔹 سلول اولویت (قابل تغییر) — دراپ‌داون به‌صورت Portal روی body
// ──────────────────────────────
function PriorityCell({ task, isOpen, onToggle, onSelect, dropdownRef }) {
  const info = PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG.medium;
  const anchorRef = useRef(null);
  const position = useAnchoredPosition(anchorRef, isOpen, {
    width: 110,
    height: 100,
  });

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        onClick={onToggle}
        className={`group flex items-center gap-1 rounded px-1 py-0.5 transition-all duration-150 hover:bg-white/[0.04] ${
          isOpen ? "bg-white/[0.04]" : ""
        }`}
      >
        <div
          className={`h-2 w-2 shrink-0 rounded-sm ${info.dot} ${info.opacity}`}
        />
        <span className="text-[11px] text-[#A1A1AA]">{info.label}</span>
        <ChevronIcon
          className={`h-2.5 w-2.5 shrink-0 text-[#52525B] opacity-0 transition-all duration-150 group-hover:opacity-60 ${
            isOpen ? "rotate-180 opacity-60" : ""
          }`}
        />
      </button>

      {isOpen &&
        position &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              transform: "translateX(-50%)",
            }}
            className="z-[999] w-[110px] overflow-hidden rounded-lg border border-[#27272A] bg-[#18181B] py-1 shadow-2xl shadow-black/50"
          >
            {Object.entries(PRIORITY_CONFIG).map(([key, cfg]) => (
              <button
                key={key}
                type="button"
                onClick={() => onSelect(key)}
                className="flex w-full items-center gap-2 px-2.5 py-[7px] text-right text-[11px] text-[#A1A1AA] transition-colors hover:bg-white/[0.06] hover:text-[#FAFAFA]"
              >
                <div
                  className={`h-2 w-2 shrink-0 rounded-sm ${cfg.dot} ${cfg.opacity}`}
                />
                <span className="flex-1">{cfg.label}</span>
                {key === task.priority && (
                  <CheckIcon className="h-3 w-3 shrink-0 text-[#8B5CF6]" />
                )}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

// ──────────────────────────────
// 🔹 سلول برچسب (قابل تغییر، تایپ آزاد)
// ──────────────────────────────
function TagCell({
  task,
  isEditing,
  draftValue,
  onStartEdit,
  onChange,
  onSave,
  onCancel,
}) {
  if (isEditing) {
    return (
      <input
        autoFocus
        value={draftValue}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onSave}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
          if (e.key === "Escape") onCancel(e.currentTarget);
        }}
        placeholder="برچسب..."
        className="hidden w-full rounded border border-[#8B5CF6]/50 bg-[#09090B] px-1.5 py-0.5 text-[10.5px] text-[#FAFAFA] outline-none placeholder:text-[#3F3F46] md:block"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={onStartEdit}
      className="group hidden w-full items-center justify-between gap-1 rounded border border-transparent px-1.5 py-0.5 text-right text-[10.5px] text-[#52525B] transition-colors hover:border-[#27272A] hover:bg-white/[0.03] hover:text-[#A1A1AA] md:flex"
    >
      <span className="truncate">{task.tag || "خالی"}</span>
      <PencilIcon className="h-2.5 w-2.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
    </button>
  );
}

// ──────────────────────────────
// 🔹 سلول تاریخ (قابل تغییر) — کلیک = ادیت، نمایش به فرمت جلالی
// ──────────────────────────────
function DateField({ label, value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);

  const formatted = value
    ? new Date(value).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "تعیین نشده";

  if (isEditing) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-wider text-[#52525B]">
          {label}
        </span>
        <input
          type="date"
          autoFocus
          defaultValue={value || ""}
          onChange={(e) => {
            onChange(e.target.value || null);
            setIsEditing(false);
          }}
          onBlur={() => setIsEditing(false)}
          className="rounded border border-[#8B5CF6]/50 bg-[#09090B] px-2 py-1 text-[11px] text-[#FAFAFA] outline-none [color-scheme:dark]"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className="group flex flex-col items-start gap-1 rounded border border-transparent px-1 py-0.5 transition-colors hover:border-[#27272A] hover:bg-white/[0.03]"
    >
      <span className="text-[10px] uppercase tracking-wider text-[#52525B]">
        {label}
      </span>
      <span className="flex items-center gap-1.5 text-[11.5px] text-[#A1A1AA] transition-colors group-hover:text-[#FAFAFA]">
        <CalendarIcon className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-80" />
        {formatted}
      </span>
    </button>
  );
}

function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  // 🔹 کدوم دراپ‌داون باز هست
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // 🔹 کدوم تسک تو حالت ادیت برچسب هست
  const [editingTagId, setEditingTagId] = useState(null);
  const [tagDraft, setTagDraft] = useState("");
  const cancelTagEditRef = useRef(false);

  // 🔹 کدوم تسک باز (expand) شده
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  // 🔹 بستن دراپ‌داون با کلیک بیرون یا Escape
  useEffect(() => {
    if (!openDropdown) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openDropdown]);

  const loadTasks = async () => {
    const { data, error } = await getTasks();

    if (error) {
      console.log(error);
      return;
    }

    setTasks(data);
  };

  const addTaskHandler = async (data) => {
    const { error } = await createTask({ ...data });

    if (error) {
      console.log(error);
      return;
    }

    await loadTasks();
  };

  const deleteTaskHandler = async (taskId) => {
    const { error } = await deleteTask(taskId);
    error ? console.log(error) : null;

    await loadTasks();
  };

  // 🔹 آپدیت یک فیلد از تسک با optimistic update + ریورت در خطا
  const updateTaskField = async (taskId, field, value) => {
    const previousTasks = tasks;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, [field]: value } : t)),
    );

    const { error } = await updateTask(taskId, { [field]: value });

    if (error) {
      console.log(error);
      toast.error("بروزرسانی ناموفق بود");
      setTasks(previousTasks);
    }
  };

  // ── وضعیت ──
  const handleToggleStatus = (taskId) => {
    const key = `${taskId}:status`;
    setOpenDropdown((curr) => (curr === key ? null : key));
  };

  const handleSelectStatus = (taskId, status) => {
    setOpenDropdown(null);
    updateTaskField(taskId, "status", status);
  };

  // ── اولویت ──
  const handleTogglePriority = (taskId) => {
    const key = `${taskId}:priority`;
    setOpenDropdown((curr) => (curr === key ? null : key));
  };

  const handleSelectPriority = (taskId, priority) => {
    setOpenDropdown(null);
    updateTaskField(taskId, "priority", priority);
  };

  // ── برچسب ──
  const handleStartEditTag = (task) => {
    setEditingTagId(task.id);
    setTagDraft(task.tag || "");
  };

  const handleSaveTag = () => {
    if (cancelTagEditRef.current) {
      cancelTagEditRef.current = false;
      setEditingTagId(null);
      return;
    }

    const taskId = editingTagId;
    setEditingTagId(null);

    const original = tasks.find((t) => t.id === taskId)?.tag || "";
    const trimmed = tagDraft.trim();

    if (trimmed === original) return;

    updateTaskField(taskId, "tag", trimmed || null);
  };

  const handleCancelEditTag = (inputEl) => {
    cancelTagEditRef.current = true;
    inputEl?.blur();
  };

  // ── باز/بسته‌شدن تسک ──
  const handleToggleExpand = (taskId) => {
    setExpandedTaskId((curr) => (curr === taskId ? null : taskId));
  };

  // ── تاریخ شروع/پایان (با اعتبارسنجی ترتیب) ──
  const handleUpdateDate = (taskId, field, value) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const nextStart = field === "start_date" ? value : task.start_date;
    const nextEnd = field === "end_date" ? value : task.end_date;

    if (nextStart && nextEnd && new Date(nextEnd) < new Date(nextStart)) {
      toast.error("تاریخ پایان نمی‌تونه قبل از تاریخ شروع باشه");
      return;
    }

    updateTaskField(taskId, field, value);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (data) => {
          await addTaskHandler(data);
        }}
      />

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
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-md bg-[#8B5CF6] px-2.5 py-1 text-[11.5px] text-white transition-opacity hover:opacity-85"
          >
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

      {tasks.map((task, i) => {
        const isExpanded = expandedTaskId === task.id;

        return (
          <div
            key={task.id}
            className={`group grid cursor-default grid-cols-[1fr_100px_64px] items-center gap-2 px-5 py-2.5 transition-colors hover:bg-white/[0.015] md:grid-cols-[1fr_110px_68px_56px] ${
              i < tasks.length - 1 ? "border-b border-[#27272A]/40" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => handleToggleExpand(task.id)}
              className="flex min-w-0 items-center gap-2 text-right"
            >
              <ChevronIcon
                className={`h-3 w-3 shrink-0 text-[#52525B] opacity-0 transition-all duration-150 group-hover:opacity-70 ${
                  isExpanded ? "opacity-70" : "rotate-90"
                }`}
              />
              <span
                className={`min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] ${
                  task.status === "done"
                    ? "text-[#A1A1AA]/50 line-through"
                    : "text-[#FAFAFA]"
                }`}
              >
                {task.title}
              </span>
            </button>

            <StatusCell
              task={task}
              isOpen={openDropdown === `${task.id}:status`}
              onToggle={() => handleToggleStatus(task.id)}
              onSelect={(status) => handleSelectStatus(task.id, status)}
              dropdownRef={
                openDropdown === `${task.id}:status` ? dropdownRef : null
              }
            />

            <PriorityCell
              task={task}
              isOpen={openDropdown === `${task.id}:priority`}
              onToggle={() => handleTogglePriority(task.id)}
              onSelect={(priority) => handleSelectPriority(task.id, priority)}
              dropdownRef={
                openDropdown === `${task.id}:priority` ? dropdownRef : null
              }
            />

            <TagCell
              task={task}
              isEditing={editingTagId === task.id}
              draftValue={tagDraft}
              onStartEdit={() => handleStartEditTag(task)}
              onChange={setTagDraft}
              onSave={handleSaveTag}
              onCancel={handleCancelEditTag}
            />

            {isExpanded && (
              <div className="col-span-full mt-2 flex flex-col gap-3 rounded-lg border border-[#27272A]/60 bg-white/[0.02] p-3.5">
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-wider text-[#52525B]">
                    توضیحات
                  </p>
                  <p className="text-[12px] leading-relaxed text-[#A1A1AA]">
                    {task.description || "توضیحی ثبت نشده"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-5">
                  <DateField
                    label="تاریخ شروع"
                    value={task.start_date}
                    onChange={(value) =>
                      handleUpdateDate(task.id, "start_date", value)
                    }
                  />
                  <DateField
                    label="تاریخ پایان"
                    value={task.end_date}
                    onChange={(value) =>
                      handleUpdateDate(task.id, "end_date", value)
                    }
                  />
                </div>
                <div className="">
                  <button
                    onClick={() => deleteTaskHandler(task.id)}
                    className="rounded-md bg-fluxa-error px-2.5 py-1 text-sm text-white transition-opacity hover:opacity-85"
                  >
                    حذف
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Tasks;
