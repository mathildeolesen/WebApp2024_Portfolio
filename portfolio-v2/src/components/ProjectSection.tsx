import { useState } from "react";
import AddProjectForm from "./AddProjectForm";
import ProjectCard from "./ProjectCard";

export default function ProjectSection() {

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
        <ProjectCard/>
        </div>
        {showForm && <AddProjectForm toggleForm={toggleForm}/>}
        {/* If showForm is true, render component */}
      </section>
    )
}