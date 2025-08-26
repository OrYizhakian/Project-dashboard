import ProjectCard from "./Projectcard";

function Main({
  generalProjects,
  folders,
  selectedFolderIndex,
  searchTerm,
  onProjectClick,
  onRename,
  onDuplicate,
  onDelete,
  onAddProject
}) {
  let allProjects = [];

  if (selectedFolderIndex === null) {
    allProjects = [
      ...generalProjects.map((project, index) => ({
        ...project,
        folderIdx: null,
        projectIdx: index,
      })),
      ...folders.flatMap((folder, folderIdx) =>
        folder.projects.map((project, projectIdx) => ({
          ...project,
          folderIdx,
          projectIdx,
        }))
      ),
    ];
  } else {
    const selectedFolder = folders[selectedFolderIndex];
    if (!selectedFolder) {
      return (
        <div className="p-6 text-red-400">
          ⚠️ Folder not found or failed to load.
        </div>
      );
    }

    allProjects = selectedFolder.projects.map((project, projectIdx) => ({
      ...project,
      folderIdx: selectedFolderIndex,
      projectIdx,
    }));
  }

  const filtered = allProjects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 overflow-y-auto">
      <div className="flex flex-wrap gap-6">
        {filtered.map((project, i) => (
          <div
            key={i}
            onClick={() => onProjectClick(project.folderIdx, project.projectIdx)}
            className="cursor-pointer"
          >
            <ProjectCard
              title={project.title}
              edited={project.edited}
              image={project.image}
              onRename={() => onRename(project.folderIdx, project.projectIdx)}
              onDuplicate={() => onDuplicate(project.folderIdx, project.projectIdx)}
              onDelete={() => onDelete(project.folderIdx, project.projectIdx)}
              onClick={() => onProjectClick(project.folderIdx, project.projectIdx)}
            />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <button
          onClick={onAddProject}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm shadow-md transition"
        >
          + New Project
        </button>
      </div>
    </div>
  );
}

export default Main;
