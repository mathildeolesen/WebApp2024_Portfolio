import ExperienceSection from "./components/ExperienceSection";
import ProjectSection from "./components/ProjectSection";
import WelcomeCard from "./components/WelcomeCard";
import './styling/style.css';

function App() {

  const dummyStudent = 
    { 
      firstName: "Mathilde",
      lastName: "Olesen",
      degree: "Bachelor i Informatikk",
      degreeFinished: 2025,
      email: "mathildeolesen@gmial.com"
    }

  return (
    <main>
      <WelcomeCard student={dummyStudent}/>
      <ProjectSection/>
      <ExperienceSection/>
    </main>
  );
}

export default App;