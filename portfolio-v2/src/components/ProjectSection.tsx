import { useState } from "react";
import AddProjectForm from "./AddProjectForm";
import ProjectCard from "./ProjectCard";

type Project = {

  id: string, // UUID er en streng
  title: string,
  tags: string[],
  description: string
}

export default function ProjectSection() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    return (

        <section id="display">
        <div id="displayHeader">
          <h2>Prosjekter</h2>
          <button id="showFormButton" onClick={toggleForm}>Legg til prosjekt</button>
        </div>
        <div id="projectsContainer">
        {projects.length === 0 
        ? (
          <article className="displayCard">
            <div id="displayCardInfo">
              <h3>Ingen prosjekter 🥲</h3>
            </div>
          </article>
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={index} project={project}/>
        ))
        )}
        
        </div>
        {showForm && <AddProjectForm setProjects={setProjects} toggleForm={toggleForm}/>}
        {/* If showForm is true, render component */}
      </section>
    )
}
