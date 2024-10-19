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
    const data = await readFile("src/projects.json", 'utf-8');
    const projects: Project[]= JSON.parse(data)

    const projectIndex = projects.findIndex(project => project.id === id)

    // Hvis prosjektet med id ikke finnes
    if (projectIndex === -1) {
        return c.json(undefined, 404);
    };

    // Fjerner / Filtrerer ut prosjektet med id som skal slettes
    const updatedProjects = projects.filter((project: Project) => project.id !== id);

    await writeFile("src/projects.json", JSON.stringify(updatedProjects, null, 2));
    return c.status(204); // Returnerer 204 No Content
})


app.post('/v1/projects', async (c) => {
    const newProject = await c.req.json(); 
    const projectsData = JSON.parse(await readFile("src/projects.json", 'utf-8'))

    const createdProject = { id:  crypto.randomUUID(), ...newProject };
    
    projectsData.push(createdProject);

    await writeFile("src/projects.json", JSON.stringify(projectsData, null, 2));
    return c.json(createdProject, 201); // Returnerer det lagde prosjektet, med 201 Created
})

export default app;