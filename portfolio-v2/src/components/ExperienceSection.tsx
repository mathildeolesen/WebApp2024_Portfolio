import Experience from "./Experience";

export default function ExperienceSection() {


    const dummyExperience1 = 
    { 
        title: "Brukerbasert Film-kolleksjon nettside med React og Sanity", 
        description: 'Nettside hvor brukere kan lage kolleksjoner med favoritter, sett og "ønsker-å-se" filmer, så brukere kan sammen finne en film begge liker/har interesse av å se'
    }

    const dummyExperience2 = 
    { 
        title: "Havn-simulering rammeverk i .NET med C#", 
        description: 'Et rammeverk for å simulere havnaktivitet som av- og pålessing av containere, utsending av båter, levering av containere fra havnen, m.m. Laget med .NET og C#.'
    }

    return (
        <section id="display">
            <div id="displayHeader">
                <h2>Erfaringer</h2>
            </div>
            <div id="projectsContainer">
                <Experience experience={dummyExperience1}/>
                <Experience experience={dummyExperience2}/>
            </div>
        </section>
    )
}