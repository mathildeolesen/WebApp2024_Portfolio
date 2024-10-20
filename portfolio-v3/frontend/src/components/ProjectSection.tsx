import { useState } from "react";
import AddProjectForm from "./AddProjectForm";
import ProjectCard from "./ProjectCard";
import useProjects from "@/features/projects/hooks/useProjects"; // Bruker useProjects-hook
import { Action, Project } from "@/types";

export default function ProjectSection() {
  const { add, remove, status, get, data, error } = useProjects();
  const { projects } = data; // Destrukturerer prosjektene fra data
  const [showForm, setShowForm] = useState(false);

  const handleProjectMutation = (action: Action, data: Partial<Project>) => {
    const { id, ...project } = data;
  
    switch (action) {
      case "add":
        add(project); // Project vil være delvis, men inneholder de nødvendige feltene for `add`
        break;
      case "remove":
        if (id) {
          remove(id);
        }
        break;
      default:
        break;
    }
  };
  

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const countTags = (): Map<string, number> => {
    const tagCounts = new Map<string, number>();

    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag.toLowerCase()) || 0) + 1);
      });
    });

    return tagCounts;
  };
  
  const tagCounts = countTags();

  return (

      <section id="display">
      <div id="displayHeader">
        <h2>Prosjekter</h2>
        <button id="showFormButton" onClick={toggleForm}>Legg til prosjekt</button>
      </div>
      <div id="projectsContainer">
        <div id="tagCount">
          <p>Antall prosjekter per tag:</p>
          <div id="countedTags">
            {Array.from(tagCounts.entries()).map(([tag, count]) => (
            <p key={tag}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}: {count}
            </p>
          ))}
          </div>
        </div>
      {projects.length === 0 
      ? (
        <article className="displayCard">
          <div id="displayCardInfo">
            <h3>Ingen prosjekter 🥲</h3>
          </div>
        </article>
      ) : (
        projects.map((project, index) => (
          <ProjectCard key={index} project={project} handleProjectMutation={handleProjectMutation}/>
      ))
      )}
      
      </div>
      {showForm && <AddProjectForm handleProjectMutation={handleProjectMutation} toggleForm={toggleForm}/>}
      {/* If showForm is true, render component */}
    </section>
  )
}

