import AddProjectForm from "./AddProjectForm";
import ProjectCard from "./ProjectCard";

export default function ProjectSection() {

    return (

        <section id="display">
        <div id="displayHeader">
          <h2>Prosjekter</h2>
          <button id="showFormButton">Legg til prosjekt</button>
        </div>
        <div id="projectsContainer">
        <ProjectCard/>
        </div>
        <AddProjectForm/>
      </section>
    )
}