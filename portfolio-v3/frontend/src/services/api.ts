import { projectsSchema } from "@/features/projects/helpers/schema";
import { Project } from "@/types";
import { ofetch } from "ofetch";
import { endpoints } from "@/config/urls";

const url = endpoints.projects;

type ProjectResponse = {
  id: string;
  title: string;
  tags: string; // Forventet som kommaseparert streng fra API
  description: string;
  createdAt: string;
};

const fetchProjects = async () => {
  try {
      const projects: ProjectResponse[] = await ofetch(url); // Forventet type fra API
      console.log("API response:", projects);

      // Returner direkte uten å mappe over prosjektene
      return projectsSchema.parse(projects); // Valider med Zod
  } catch (error) {
      console.error("Fetch error:", error);
      return []; // Returner en tom array ved feil
  }
};



const remove = async (id: string) => {
  try { 
    await ofetch(`${url}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const create = async (data: Pick<Project, "title" | "tags" | "description" | "createdAt">) => {
  try {
    // Konverter tags til kommaseparert streng før sending
    const payload = {
      ...data,
      tags: data.tags.join(','), // Konverter tags fra array til streng
    };

    const createdProject = await ofetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return createdProject;
  } catch (error) {
    console.error("Error creating project:", error);
  }
};

export default { fetchProjects, remove, create };
