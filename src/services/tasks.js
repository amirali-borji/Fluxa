import { supabase } from "./supabase-client";

export async function getTasks() {
  return await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function createTask(taskData) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase.from("tasks").insert([
    {
      user_id: user.id,
      ...taskData,
    },
  ]);
}

export async function updateTask(id, updates) {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

export async function deleteTask(id) {
  const { data, error } = await supabase.from("tasks").delete().eq("id", id);
  return { data, error };
}
