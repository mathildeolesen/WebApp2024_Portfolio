import ExperienceSection from "./components/ExperienceSection";
import ProjectSection from "./components/ProjectSection";
import WelcomeCard from "./components/WelcomeCard";
import './styling/style.css';

function App() {
  return (
    <main>
      <WelcomeCard/>
      <ProjectSection/>
      <ExperienceSection/>
    </main>
  );
}

export default App;