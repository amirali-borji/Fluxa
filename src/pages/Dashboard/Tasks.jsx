import { useEffect, useState } from "react";
import { getTasks, createTask } from "../../services/tasks";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

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

  const handleAddTask = async () => {
    const { error } = await createTask({
      title,
    });

    if (error) {
      console.log(error);
      return;
    }

    console.log("task added");
  };

  return (
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

      {tasks.map((task, i) => (
        <div
          key={task.id}
          className={`grid cursor-default grid-cols-[1fr_100px_64px] items-center gap-2 px-5 py-2.5 transition-colors hover:bg-white/[0.015] md:grid-cols-[1fr_110px_68px_56px] ${i < task.length - 1 ? "border-b border-[#27272A]/40" : ""}`}
        >
          <span
            className={`overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] ${task.done ? "text-[#A1A1AA]/50 line-through" : "text-[#FAFAFA]"}`}
          >
            {task.title}
          </span>
          <div
            className={`inline-flex w-fit items-center gap-1 rounded px-1.5 py-0.5 ${task.statusColor}`}
          >
            <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${task.dot}`} />
            <span className="whitespace-nowrap text-[10.5px]">
              {task.status}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className={`h-2 w-2 shrink-0 rounded-sm ${task.priorityColor} ${task.priority === "پایین" ? "opacity-40" : "opacity-80"}`}
            />
            <span className="text-[11px] text-[#A1A1AA]">{task.priority}</span>
          </div>
          <span className="hidden rounded border border-[#27272A] px-1.5 py-0.5 text-[10.5px] text-[#52525B] md:inline-block">
            {task.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
