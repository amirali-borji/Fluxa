import Tasks from "./Sidebar Navigation/Tasks";
import Flow from "./Sidebar Navigation/FLow";

function Content({ activeTab }) {
  return (
    <div className="flex-1 p-6 pr-22 ">
      {activeTab === "tasks" && <Tasks />}
      {activeTab === "flow" && <Flow />}
    </div>
  );
}

export default Content;
