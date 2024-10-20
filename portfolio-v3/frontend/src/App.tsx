import Contact from "./components/Contact";
import ExperienceSection from "./features/experiences/pages/ExperienceSection";
import Layout from "./components/Layout";
import ProjectSection from "./features/projects/pages/ProjectSection";
import WelcomeCard from "./components/WelcomeCard";
import './styling/style.css';

function App() {

  const dummyStudent = 
    { 
      firstName: "Mathilde",
      lastName: "Olesen",
      degree: "Bachelor i Informatikk",
      degreeFinished: 2025,
      email: "mathildeolesen@gmial.com",

      experiences: [
        { 
          title: "Brukerbasert Film-kolleksjon nettside med React og Sanity", 
          description: 'Nettside hvor brukere kan lage kolleksjoner med favoritter, sett og "ønsker-å-se" filmer, så brukere kan sammen finne en film begge liker/har interesse av å se'
        },
        { 
          title: "Havn-simulering rammeverk i .NET med C#", 
          description: 'Et rammeverk for å simulere havnaktivitet som av- og pålessing av containere, utsending av båter, levering av containere fra havnen, m.m. Laget med .NET og C#.'
        }
      ]
    }

  return (
    <Layout>
      <WelcomeCard student={dummyStudent}/>
      <ProjectSection/>
      <ExperienceSection experiences={dummyStudent.experiences}/>
      <Contact email="mathildeolesen@gmail.com"/>
    </Layout>
  );
}

export default App;