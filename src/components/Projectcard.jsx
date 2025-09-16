import { useState, useEffect, useRef } from "react";

function ProjectCard({
  title = "Project 1",
  edited = "Edited 1 hour ago",
  image = "https://placehold.co/400x200/1e1e1e/ffffff?text=Project",
  onRename,
  onDuplicate,
  onDelete,
  onClick
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      onClick={onClick}
      className="relative bg-cyan-800 rounded-xl shadow-md border border-gray-700 hover:border-blue-500 w-72 overflow-hidden transition cursor-pointer"
    >
      <img
        src={image||"https://placehold.co/400x200/1e1e1e/ffffff?text=Project"}
        alt={title}
        className="w-full h-40 object-cover"
      />

      {/* תפריט ⋮ */}
      <div
        className="absolute top-2 right-2 z-20"
        ref={menuRef}
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="text-gray-400 hover:text-blue-400 transition"
        >
          ⋮
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-30 w-40">
            <button
              onClick={() => {
                onRename?.();
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
            >
              Rename
            </button>
            <button
              onClick={() => {
                onDuplicate?.();
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
            >
              Duplicate
            </button>
            <button
              onClick={() => {
                onDelete?.();
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{edited}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
