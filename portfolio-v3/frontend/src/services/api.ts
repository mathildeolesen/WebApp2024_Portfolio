import { projectsSchema } from "@/features/projects/helpers/schema";
import { Project } from "@/types";
import { ofetch } from "ofetch";


  const fetchProjects = async () => {
    try {
      const projects = await ofetch("http://localhost:3000/v1/projects");
      console.log("API response:", projects);
      return projectsSchema.parse(projects) || []; // Returnerer en tom array hvis response er undefined
    } catch (error) {
      console.error(error);
      return []; // Returner en tom array ved feil
    }
  };


const remove = async (id: string) => {
  try { 
    await ofetch(`http://localhost:3000/v1/projects/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Vi sier vi sender med "title", "tags" og description
const create = async (data: Pick<Project, "title" | "tags" | "description">) => {
  try {
    const createdProject = await ofetch("http://localhost:3000/v1/projects", {
      method: "POST",
      body: JSON.stringify(data), // Husk å sende som JSON-string
      headers: {
        'Content-Type': 'application/json', // Definerer at vi sender JSON
      }
    });

    return createdProject;
  } catch (error) {
    console.error("Error creating project:", error);
  }
};



export default { fetchProjects, remove, create }


