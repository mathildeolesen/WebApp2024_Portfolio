import { projectsSchema } from "@/features/projects/helpers/schema";
import { Project } from "@/types";
import { ofetch } from "ofetch";
import { endpoints } from "@/config/urls";

const url = endpoints.projects;

type Result<T> = {
  success: true;
  data: T;
  status: number;
} | {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

const fetchProjects = async () => {
  try {
      const response: Result<Project[]> = await ofetch(url); // Forventet type fra API
      console.log("API response:", response);

      if (response.success) {
        return projectsSchema.parse(response.data); // Valider med Zod
      } else {
        // Håndter API-feil, med melding fra Result
        console.error("Error from API:", response.error.message);
        return []; // Returnerer en tom array ved feil
      }
      
  } catch (error) {
      console.error("Fetch error:", error);
      return []; // Returnerer en tom array ved feil
  }
};



const remove = async (id: string) => {
  try { 
    const response: Result<null> = await ofetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (response.success) {
      console.log("Project successfully deleted");
      return true; // Sletting var vellykket
    } else {
      console.error("Error deleting project:", response.error.message);
      return false; // Returnerer false hvis slettingen feilet
    }
  } catch (error) {
    console.error("Error with delete request:", error);
    return false; // Returnerer false ved nettverksfeil eller lignende
  }
};

const create = async (data: Pick<Project, "title" | "tags" | "description" | "createdAt">) => {
  try {
    // Sier Pick<Project> uten "id", fordi id skal lages i backend

    const response: Result<Project> = await ofetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.success) {
      return response.data; // Returnerer opprettet prosjekt
    } else {
      console.error("Error from API:", response.error.message);
    }

  } catch (error) {
    console.error("Error creating project:", error);
  }
};

export default { fetchProjects, remove, create };
