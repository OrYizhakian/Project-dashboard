import { useState } from "react";
import { Menu, X } from "lucide-react";

function Sidebar({ onSelect }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-50 bg-gray-900 p-2 rounded-md text-white lg:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`bg-[#0f0f0f] text-white h-screen w-60 p-4 flex flex-col fixed top-0 left-0 z-40 border-r border-gray-800 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:relative`}
      >
        <div className="text-sm font-semibold tracking-wide text-gray-300 mb-10 px-2">
          MY DASHBOARD
        </div>

        <ul className="flex flex-col gap-3 text-sm">
          <li
            onClick={() => onSelect("home")}
            className="px-3 py-2 rounded-md cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            🏠 Home
          </li>
          <li
            onClick={() => onSelect("folders")}
            className="px-3 py-2 rounded-md cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            📁 My Folders
          </li>
          <li
            onClick={() => onSelect("settings")}
            className="px-3 py-2 rounded-md cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            ⚙️ Settings
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
