export default function ProjectCard() {

    const dummyProject = 
    { 
        title: "Dummy title", 
        tags: ["dummytag1", "dummytag2"], 
         description: "Dummy description"
    }
    return (
        <article className="displayCard">
            <figure>
                <img src='https://placehold.co/400' alt={dummyProject.title}/>
            </figure>
            <div id="displayCardInfo">
                <h3>{dummyProject.title}</h3>
                <div id="tags">
                    <span id="hashtag">#</span>
                    <ul id="tags">
                        {dummyProject.tags.map((tag: string) => (
                            <li>{tag}</li>
                            ))}
                    </ul>
                </div>
                <p>{dummyProject.description}</p>
            </div>
        </article>
    )
}