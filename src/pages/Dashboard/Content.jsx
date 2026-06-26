import Tasks from "./Tasks";

function Content({ activeTab }) {
  return (
    <div className="flex-1 p-6 pr-22 ">
      {activeTab === "tasks" && <Tasks />}
    </div>
  );
}

export default Content;
