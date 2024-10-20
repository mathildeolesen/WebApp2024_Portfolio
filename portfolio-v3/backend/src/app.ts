import { Hono } from "hono";
import { cors } from "hono/cors";
import { prisma } from "./prisma";

const app = new Hono();

app.use("/*", cors());

// Hent alle prosjekter
app.get('/v1/projects', async (c) => {
    const projects = await prisma.project.findMany();
    
    // Konverterer tags til array
    const parsedProjects = projects.map(project => ({
        ...project,
        tags: project.tags.split(','), // Del opp tags-strengen til en array
    }));

    return c.json(parsedProjects);
});

// Slett et prosjekt ved ID
app.delete('/v1/projects/:id', async (c) => {
    const id = c.req.param("id");
    console.log("Received ID for deletion:", id);

    try {
        // Sjekk om prosjektet eksisterer
        const project = await prisma.project.findUnique({
            where: { id }
        });

        if (!project) {
            return c.json({ message: "Project not found" }, 404); 
        }

        // Slett prosjektet fra databasen
        await prisma.project.delete({
            where: { id }
        });

        // Returner 204 No Content som bekreftelse på slettingen
        return c.json(undefined, 204);
    } catch (error) {
        console.error("Failed to delete project:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
});

// Legg til et nytt prosjekt
app.post('/v1/projects', async (c) => {
    try {
        const newProject = await c.req.json();
        console.log("New Project:", newProject);

        // Lag et nytt prosjekt i databasen
        const createdProject = await prisma.project.create({
            data: {
                title: newProject.title,
                tags: newProject.tags, // Vet at frontend sender en komma-separert string
                description: newProject.description,
                createdAt: newProject.createdAt, // Sett createdAt til nåværende tid
            },
        });

        return c.json(createdProject, 201);
    } catch (error) {
        console.error("Error creating project:", error);
        return c.json({ message: "Internal Server Error: An unknown error occurred." }, 500);
    }
});


export default app;
