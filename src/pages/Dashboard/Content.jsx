function Content({ activeTab }) {
  return (
    <div className="flex-1 p-6 pr-22 ">
      {activeTab === "tasks" && <h1 className="text-2xl font-bold">Tasks Page</h1>}
      {activeTab === "users" && <h1 className="text-2xl font-bold">Users Page</h1>}
      {activeTab === "settings" && <h1 className="text-2xl font-bold">Settings Page</h1>}
    </div>
  );
}

export default Content;
