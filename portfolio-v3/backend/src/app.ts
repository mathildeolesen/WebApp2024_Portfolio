import { readFile, writeFile } from "fs/promises";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Project } from "./types/types";

const app = new Hono();

app.use("/*", cors());

app.get('/v1/projects', async (c) => { 
    const data = await readFile("src/projects.json", 'utf-8');
    return c.json(JSON.parse(data))
});

app.delete('/v1/projects/:id', async (c) => {
    const id = c.req.param("id");
    console.log("Received ID for deletion:", id);

    const data = await readFile("src/projects.json", 'utf-8');
    const projects: Project[] = JSON.parse(data);

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex === -1) {
        // Returner en 404 hvis prosjektet ikke ble funnet
        return c.json({ message: "Project not found" }, 404); 
    }

    // Opprett en ny liste uten prosjektet som skal slettes
    const updatedProjects = projects.filter((project: Project) => project.id !== id);
    await writeFile("src/projects.json", JSON.stringify(updatedProjects, null, 2));

    // Returner 204 No Content som bekreftelse på slettingen
    return c.json(undefined, 204);
});


app.post('/v1/projects', async (c) => {
    try {
        // Les request-body som JSON
        const newProject = await c.req.json();
        console.log("New Project:", newProject);

        const fileProjects = await readFile("src/projects.json", 'utf-8');
        const objectProjects = JSON.parse(fileProjects);
    
        const createdProject = { id: crypto.randomUUID(), ...newProject };
    
        objectProjects.push(createdProject);

        await writeFile("src/projects.json", JSON.stringify(objectProjects, null, 2));
        console.log("Successfully written to file");

        return c.json(createdProject, 201);
    } catch (error) {
        console.error("Unknown error:", error);
        return c.json({ message: "Internal Server Error: An unknown error occurred." }, 500);
    }
});


export default app;