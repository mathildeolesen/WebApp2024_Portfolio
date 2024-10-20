import { Action } from "@/types";

type Project = {

    id: string, // UUID er en streng
    title: string,
    tags: string[],
    description: string
  }

type ProjectCardProps = {
    project: Project;
    //setProjects: React.Dispatch<React.SetStateAction<Project[]>>
    handleProjectMutation: (action: Action, habit: Partial<Project>) => void;
}


export default function ProjectCard(props : ProjectCardProps) {

    const { project, handleProjectMutation } = props;

    const removeProject = (id: string) => {
        handleProjectMutation("remove", { id });
      };

    return (
        <article className="displayCard">
            <figure>
                <img src='https://placehold.co/400' alt={project.title}/>
            </figure>
            <div id="displayCardInfo">
                <h3>{project.title}</h3>
                <div id="tags">
                    <span id="hashtag">#</span>
                    <ul id="tags">
                        {project.tags.map((tag: string) => (
                            <li key={tag}>{tag}</li>
                            ))}
                    </ul>
                </div>
                <p>{project.description}</p>
            </div>
            <button className="remove-button" onClick={() => removeProject(project.id)} type="button">
                <div className="remove-icon">❌</div>
            </button>
        </article>
    )
}