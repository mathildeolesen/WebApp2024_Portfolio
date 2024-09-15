import { z } from 'zod';

export const ProjectSchema = z.object({
    id: z.string(),
    title: z.string(),
    coverImage: z.string().url().optional(),
    tags: z.array(z.string()),
    description: z.string(),
});

// TypeScript-type fra Zod-skjemaet
export type Project = z.infer<typeof ProjectSchema>;

// Et Objekt med en "projects"-array inni
export const ProjectArraySchema = z.object(
    { projects: z.array(ProjectSchema) }
);