import Experience from "../components/Experience";

type Experience = {
    title: string;
    description: string;
};

type ExperiencesProps = {
    experiences: Experience[];
};

export default function ExperienceSection({ experiences }: ExperiencesProps) {

    return (
        <section id="display">
            <div id="displayHeader">
                <h2>Erfaringer</h2>
            </div>
            <div id="projectsContainer">
                {experiences.length === 0 
                ? (
                    <article className="displayCard">
                        <div id="displayCardInfo">
                            <h3>Ingen erfaringer 🥲</h3>
                        </div>
                    </article>
                ) : (
                    experiences.map((experience, index) => (
                        <Experience key={index} experience={experience}/>
                    ))
                )}
            </div>
        </section>
    )
}