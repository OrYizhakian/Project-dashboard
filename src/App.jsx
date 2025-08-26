import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Main from "./components/Main";
import CanvasPage from "./components/Canvaspage";

function App() {
  const [folders, setFolders] = useState([]);
  const [generalProjects, setGeneralProjects] = useState([]);
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextProjectId, setNextProjectId] = useState(1);

  const handleRenameFolder = (index) => {
    const newName = prompt("Enter new folder name:");
    if (!newName) return;
    
    const updated = [...folders];
    updated[index].folderName = newName;
    setFolders(updated);
  };
  
  const handleAddFolder = () => {
    const name = prompt("Enter folder name:");
    if (!name) return;
    
    const newFolder = {
      folderName: name,
      projects: [],
    };
    
    
    setFolders([...folders, newFolder]);
    
    
  };
  
  
  const handleAddProject = () => {
    const newProject = {
      title: `New Project ${nextProjectId}`,
      edited: "Just now",
      image: null,
      paths: [],
    };
    
    if (selectedFolderIndex === null) {
      setGeneralProjects([...generalProjects, newProject]);
    } else {
      const folder = folders[selectedFolderIndex];
      if (!folder) {
        alert("⚠️ לא קיימת תיקייה כדי להוסיף לתוכה פרויקט.");
        return;
      }
      
      const updated = [...folders];
      updated[selectedFolderIndex] = {
        ...folder,
        projects: [...folder.projects, newProject],
      };
      setFolders(updated);
    }
    setNextProjectId(prev => prev + 1);
  };
  
  
  const handleRenameProject = (folderIdx, projectIdx) => {
    const newTitle = prompt("Enter new name:");
    if (!newTitle) return;
    
    if (folderIdx === null) {
      const updated = [...generalProjects];
      updated[projectIdx].title = newTitle;
      updated[projectIdx].edited = "Just now";
      setGeneralProjects(updated);
    } else {
      const updated = [...folders];
      updated[folderIdx].projects[projectIdx].title = newTitle;
      updated[folderIdx].projects[projectIdx].edited = "Just now";
      setFolders(updated);
    }
  };
  
  const handleDuplicateProject = (folderIdx, projectIdx) => {
    if (folderIdx === null) {
      const project = generalProjects[projectIdx];
      const copy = { ...project, title: `${project.title} (Copy)`, edited: "Just now" };
      const updated = [...generalProjects];
      updated.splice(projectIdx + 1, 0, copy);
      setGeneralProjects(updated);
    } else {
      const project = folders[folderIdx].projects[projectIdx];
      const copy = { ...project, title: `${project.title} (Copy)`, edited: "Just now" };
      const updated = [...folders];
      updated[folderIdx].projects.splice(projectIdx + 1, 0, copy);
      setFolders(updated);
    }
  };
  
  const handleDeleteProject = (folderIdx, projectIdx) => {
    if (folderIdx === null) {
      const updated = generalProjects.filter((_, i) => i !== projectIdx);
      setGeneralProjects(updated);
    } else {
      const updated = [...folders];
      updated[folderIdx].projects.splice(projectIdx, 1);
      setFolders(updated);
    }
  };
  
  const handleProjectClick = (folderIdx, projectIdx) => {
    setSelectedFolderIndex(folderIdx);
    setSelectedProjectIndex(projectIdx);
  };
  
  const handleSaveDrawing = (imageDataURL, savedPaths) => {
    if (selectedFolderIndex === null) {
      const updated = [...generalProjects];
      updated[selectedProjectIndex] = {
        ...updated[selectedProjectIndex],
        image: imageDataURL,
        paths: savedPaths,
        edited: "Saved just now",
      };
      setGeneralProjects(updated);
    } else {
      const updated = [...folders];
      updated[selectedFolderIndex].projects[selectedProjectIndex] = {
        ...updated[selectedFolderIndex].projects[selectedProjectIndex],
        image: imageDataURL,
        paths: savedPaths,
        edited: "Saved just now",
      };
      setFolders(updated);
    }
    setSelectedProjectIndex(null);
  };
  
  return (
    <div className="flex h-screen bg-black">
    <Sidebar
    folders={folders}
    onAddFolder={handleAddFolder}
    onSelectFolder={setSelectedFolderIndex}
    />
    
    <div className="flex flex-col flex-1">
    <Header
    folders={folders}
    selectedFolderIndex={selectedFolderIndex}
    onSelectFolder={setSelectedFolderIndex}
    onAddFolder={handleAddFolder}
    onRenameFolder={handleRenameFolder}
    onSearch={setSearchTerm}
    onGoHome={() => {
      setSelectedFolderIndex(null);
      setSelectedProjectIndex(null);
    }}
    
    />
    
    {selectedProjectIndex !== null ? (
      <CanvasPage
      onSave={handleSaveDrawing}
      initialPaths={
        selectedFolderIndex === null
        ? generalProjects[selectedProjectIndex]?.paths || []
        : folders[selectedFolderIndex]?.projects[selectedProjectIndex]?.paths || []
      }
      />
    ) : (
      <Main
      generalProjects={generalProjects}
      folders={folders}
      selectedFolderIndex={selectedFolderIndex}
      searchTerm={searchTerm}
      onProjectClick={handleProjectClick}
      onRename={handleRenameProject}
      onDuplicate={handleDuplicateProject}
      onDelete={handleDeleteProject}
      onAddProject={handleAddProject}
      />
      
    )}
    </div>
    </div>
  );
}

export default App;
