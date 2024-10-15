type ExperienceProps = {
    experience: {
        title: string;
        description: string;
    }
}

export default function Experience(props: ExperienceProps) {
    
    const { experience } = props;

    return (
        <article className="displayCard">
           
            <div id="displayCardInfo">
                <h3>{experience.title}</h3>
                <p>{experience.description}</p>
            </div>
        </article>
    )
}


