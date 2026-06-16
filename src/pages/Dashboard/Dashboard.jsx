import { supabase } from "../../services/supabase-client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState } from "react";
import Content from "./Content";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tasks");

  const logoutHandler = async () => {
    await supabase.auth.signOut();
    toast.success("با موفقیت خارج شدید");
    navigate("/");
  };

  return (
    <div className="flex  h-[calc(100vh-4rem)]  overflow-hidden ">
      <aside className="">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          logoutHandler={logoutHandler}
        />
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Content activeTab={activeTab} />
      </main>
    </div>
  );
}

export default Dashboard;
