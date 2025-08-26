function Header({
  folders,
  selectedFolderIndex,
  onSelectFolder,
  onAddFolder,
  onRenameFolder,
  onSearch,
  onGoHome
}) {
  return (
    <div className="flex items-center justify-between gap-6 bg-[#0f0f0f] px-6 py-4 border-b border-gray-800 shadow-sm">
    <div className="flex items-center gap-4 overflow-x-auto">
    <h2
    className={`text-white text-base font-semibold tracking-wide cursor-pointer ${
      selectedFolderIndex === null ? "underline underline-offset-4" : ""
    }`}
    onClick={onGoHome}
    >
    Home
    </h2>
    
    {folders.map((folder, index) => (
      <div key={index} className="relative group">
      <button
      onClick={() => onSelectFolder(index)}
      className={`text-sm px-4 py-1 pr-6 rounded-md transition whitespace-nowrap ${
        selectedFolderIndex === index
        ? "bg-blue-600 text-white"
        : "text-gray-400 hover:text-white hover:bg-gray-800"
      }`}
      >
      {folder.folderName}
      </button>
      <button
      onClick={() => onRenameFolder(index)}
      className="absolute top-1 right-1 hidden group-hover:block text-xs text-gray-400 hover:text-white"
      title="Rename folder"
      >
      ✏️
      </button>
      </div>
    ))}
    
    
    <button
    onClick={onAddFolder}
    className="text-white text-sm font-medium hover:text-blue-400 ml-2"
    >
    + New Folder
    </button>
    </div>
    
    <div className="w-full max-w-sm min-w-[200px]">
    <div className="relative">
    <input
    onChange={(e) => onSearch(e.target.value)}
    className="w-full bg-gray-900 placeholder:text-slate-500 text-white text-sm border border-gray-700 rounded-md pl-3 pr-28 py-2 focus:outline-none focus:border-gray-500 shadow-sm"
    placeholder="Search"
    />
    <button
    type="button"
    className="absolute top-1 right-1 flex items-center rounded bg-gray-800 py-1 px-2.5 border border-gray-700 text-sm text-white hover:shadow"
    >
    🔍
    </button>
    </div>
    </div>
    </div>
  );
}

export default Header;
