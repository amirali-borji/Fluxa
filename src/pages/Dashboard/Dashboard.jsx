import React from "react";
import { supabase } from "../../services/supabase-client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await supabase.auth.signOut();
    toast.success("با موفقیت خارج شدید");
    navigate("/");
  };
  return (
    <section>
      <h1>Dashboard</h1>
      <button onClick={logoutHandler}>Log out</button>
    </section>
  );
}

export default Dashboard;
