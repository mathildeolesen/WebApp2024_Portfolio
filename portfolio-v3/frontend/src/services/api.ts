import { ofetch } from "ofetch";

type Project = {

    id: string, // UUID er en streng
    title: string,
    tags: string[],
    description: string
  }

// services/api.ts
const fetchProjects = (): Promise<{ data: Project[] }> => {
    return ofetch("http://localhost:3000/projects");
  };


const remove = async (id: string) => {
  try { 
    await ofetch(`http://localhost:3000/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Vi sier vi sender med "title", "tags" og 
const create = async (data: Pick<Project, "title" | "tags" | "description">) => {
  try {
    const createdProject = await ofetch("http://localhost:3000", {
      method: "POST",
      body: data,
    });

    return createdProject;
  } catch (error) {
    console.error(error);
  }
};


export default { fetchProjects, remove, create }


