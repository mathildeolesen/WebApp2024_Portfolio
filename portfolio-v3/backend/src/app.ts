import { readFile } from "fs/promises";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get('/projects', async (c) => { 
    const data = await readFile("src/projects.json", 'utf-8');
    return c.json(JSON.parse(data))
});

export default app;