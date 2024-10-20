import { z } from "zod";

export { projectSchema, projectsSchema };

const projectSchema = z
  .object({
    id: z.string().uuid(),
    title: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    createdAt: z.string().datetime(),
  })

const projectsSchema = z.array(projectSchema);

export function validateProject(data: unknown) {
  return projectsSchema.safeParse(data);
}