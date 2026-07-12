import { useState } from "react";
import { ChevronRightIcon, Waves } from "../../services/icons";
import { ArrowLeftStartOnRectangleIcon } from "../../services/icons";
import SidebarItem from "../SidebarItem/SidebarItem";
import { BriefcaseIcon } from "../../services/icons";
import { useModal } from "../../context/ModalContext";

const Sidebar = ({ activeTab, setActiveTab, logoutHandler }) => {
  const [isExpandded, setIsExpanded] = useState(false);
  const { setModalOpen, setModalText, setYesHandler } = useModal();
  const openLogoutModal = () => {
    setModalText("آیا مطمئنی میخوای خارج بشی؟");

    setYesHandler(() => logoutHandler);

    setModalOpen(true);
  };

  return (
    <div
      className={`
    fixed right-0 top-16
    h-[calc(100vh-4rem)]
    z-40
    flex flex-col py-4
    transition-all duration-300

    bg-fluxa-bg
    border-l
    border-fluxa-border-light
    

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
      <div className="flex flex-col  mt-5 ">
        <SidebarItem
          label="تسک ها"
          tabKey="tasks"
          icon={<BriefcaseIcon className="w-5 h-5" />}
          isExpandded={isExpandded}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="flex flex-col flex-1  mt-2 ">
        <SidebarItem
          label="فلو"
          tabKey="flow"
          icon={<Waves className="w-5 h-5" />}
          isExpandded={isExpandded}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Logout */}
      <div className="p-2 py-3 pr-2.5">
        <button
          onClick={openLogoutModal}
          className="flex items-center w-full p-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
        >
          <ArrowLeftStartOnRectangleIcon className="w-full h-5 flex-shrink-0" />

          <span
            className={`
            overflow-hidden whitespace-nowrap
            transition-all duration-300 ease-in-out
            ${isExpandded ? "max-w-40 opacity-100 mr-2" : "max-w-0 opacity-0 mr-0"}
            `}
          >
            خروج
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
