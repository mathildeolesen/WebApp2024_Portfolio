import Experience from "./Experience";

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
                {experiences.map((experience, index) => (
                    <Experience key={index} experience={experience}/>
                ))}
            </div>
        </section>
    )
}