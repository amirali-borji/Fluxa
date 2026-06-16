function SidebarItem({
  label,
  tabKey,
  activeTab,
  setActiveTab,
  icon,
  isExpandded,
}) {
  const isActive = activeTab === tabKey;
  return (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`flex items-center w-full p-2 py-3 pr-2.5 transition font-morabba-medium border-r-3  
      ${
        isActive
      ? "bg-fluxa-primary-soft border-r-fluxa-primary text-white"
      : "hover:bg-fluxa-surface border-r-transparent"
      }`}
    >
      <div className="flex items-center w-full">
        {/* icon wrapper */}
        <div className="w-10 flex justify-center flex-shrink-0">{icon}</div>

        {/* label */}
        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out
          ${isExpandded ? "max-w-[200px] opacity-100 ml-2" : "max-w-0 opacity-0 ml-0"}`}
        >
          {label}
        </span>
      </div>
    </button>
  );
}

export default SidebarItem;
