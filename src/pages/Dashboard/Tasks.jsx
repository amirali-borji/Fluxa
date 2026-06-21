import { useEffect, useState } from "react";
import { getTasks, createTask } from "../../services/tasks";
import TaskModal from "../../components/AddTaskModal/AddTaskModal";

// 🎨 تنظیمات نمایش وضعیت - مقدار خام دیتابیس رو به لیبل و رنگ فارسی map می‌کند
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

function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

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
      return; // 👈 می‌توانید اینجا toast خطا اضافه کنید
    }

    await loadTasks(); // 👈 رفرش لیست بعد از ثبت موفق
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (data) => {
          await addTaskHandler(data); // 👈 await اضافه شد تا مودال منتظر نتیجه واقعی بماند
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
          
          className="rounded-md bg-[#8B5CF6] px-2.5 py-1 text-[11.5px] text-white transition-opacity hover:opacity-85">
            ذخیره
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
        const statusInfo = STATUS_CONFIG[task.status] ?? STATUS_CONFIG.todo;
        const priorityInfo =
          PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG.medium;

        return (
          <div
            key={task.id}
            className={`grid cursor-default grid-cols-[1fr_100px_64px] items-center gap-2 px-5 py-2.5 transition-colors hover:bg-white/[0.015] md:grid-cols-[1fr_110px_68px_56px] ${
              i < tasks.length - 1 ? "border-b border-[#27272A]/40" : ""
            }`}
          >
            <span
              className={`overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] ${
                task.status === "done"
                  ? "text-[#A1A1AA]/50 line-through"
                  : "text-[#FAFAFA]"
              }`}
            >
              {task.title}
            </span>

            <div
              className={`inline-flex w-fit items-center gap-1 rounded px-1.5 py-0.5 ${statusInfo.badgeBg}`}
            >
              <div
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusInfo.dot}`}
              />
              <span
                className={`whitespace-nowrap text-[10.5px] ${statusInfo.text}`}
              >
                {statusInfo.label}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <div
                className={`h-2 w-2 shrink-0 rounded-sm ${priorityInfo.dot} ${priorityInfo.opacity}`}
              />
              <span className="text-[11px] text-[#A1A1AA]">
                {priorityInfo.label}
              </span>
            </div>

            <span className="hidden rounded border truncate  border-[#27272A] px-1.5 py-0.5 text-[10.5px] text-[#52525B] md:inline-block">
              {task.tag ? task.tag : "خالی"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Tasks;
