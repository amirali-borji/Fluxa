import { useState } from "react";
import { ChevronRightIcon } from "../../services/icons";
import SidebarItem from "../SidebarItem/SidebarItem";
import { BriefcaseIcon } from "../../services/icons";
import { useModal } from "../../context/ModalContext";

const Sidebar = ({ activeTab, setActiveTab, logoutHandler }) => {
  const [isExpandded, setIsExpanded] = useState(false);
  const { setModalOpen, setModalText, setYesHandler } = useModal();

  return (
    <div
      className={`
    fixed right-0 top-16
    h-[calc(100vh-4rem)]
    z-40
    flex flex-col py-4
    transition-all duration-300

    bg-white/10
    backdrop-blur-md
    border-r border-white/10

    ${isExpandded ? "w-64" : "w-16"}
  `}
    >
      {/* Top toggle button */}
      <div className="flex px-4">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="ms-auto rounded-lg bg-fluxa-primary hover:bg-fluxa-primary-hover p-1 transition"
        >
          <ChevronRightIcon
            className={`w-5 h-5 transition-transform duration-300 ${
              isExpandded ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex flex-col flex-1 mt-5 ">
        <SidebarItem
          label="تسک ها"
          tabKey="tasks"
          icon={<BriefcaseIcon className="w-5 h-5" />}
          isExpandded={isExpandded}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <SidebarItem
          label="تسک ها"
          tabKey="tasسks"
          icon={<BriefcaseIcon className="w-5 h-5" />}
          isExpandded={isExpandded}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          setModalText("آیا مطمئنی میخوای خارج بشی؟");

          setYesHandler(() => () => {
            logoutHandler();
          });

          setModalOpen(true);
        }}
        className="w-full mt-4 p-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
      >
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
