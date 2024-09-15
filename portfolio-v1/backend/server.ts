import { serve } from "@hono/node-server"; // Start server
import { Hono } from "hono"; // Hono utilities
import { cors } from "hono/cors"; // Allow port to port communcation
import { serveStatic } from "@hono/node-server/serve-static"; // Static files, css, icons, logo, images
import {readFile, writeFile} from "node:fs/promises"; // Read files

import { ProjectSchema, Project } from "./types";
import { resolve } from "node:path";

const app = new Hono();

// Allow access to server -> "/*" let everything through
app.use("/*", cors());

// Config to serve static files
app.use("/statics/*", serveStatic({ root: "./" }));

// Listen to a GET request on address + /json (ex. http://localhost:3999/projects) and serve projects.json
app.get('/projects', async (c) => { 
    const data = await readFile("backend/data/projects.json", "utf-8")
    return c.json(JSON.parse(data))
});


app.post('/add', async (c) => {
    try {
        const newProject = await c.req.json();
        const project = ProjectSchema.parse(newProject);
        if(!project) return c.json({ error: "Invalid project" }, { status: 400 });

        const data = await readFile("backend/data/projects.json", "utf-8");

        // Data to JSON
        const dataAsJson = JSON.parse(data);
        const projects = dataAsJson.projects;

        //console.log(data)
        //console.log(dataAsJson)
        //console.log(projects)
        
        // Adding new project to "projects" in the json "dataAsJson"
        projects.push(newProject);

        await writeFile(
            resolve(import.meta.dirname, "..", "backend", "data", "projects.json"),
            JSON.stringify(dataAsJson, null, 2)
        );

        return c.json<Project[]>(projects, { status: 201 });
    } catch (error) {
        console.error("Error processing POST request:", error);
        return c.json({ error: "Invalid project data" }, { status: 400 });
    }
})

const port = 3999;

console.log("Server is running YEAH");

// Start server
serve({
    fetch: app.fetch,
    port,
})