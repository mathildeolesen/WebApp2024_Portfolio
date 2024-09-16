
type Project = {

    id: string, // UUID er en streng
    title: string,
    tags: string[],
    description: string
  }

type ProjectCardProps = {
    project: Project;
}


export default function ProjectCard({ project } : ProjectCardProps) {

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
        </article>
    )
}