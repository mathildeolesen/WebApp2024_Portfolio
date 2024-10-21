import { z } from "zod";



export const projectSchema = z.object({
  id: z.string().uuid(), // UUID for prosjektet
  title: z.string().min(1), // Prosjekttittel, minimum 1 tegn
  tags: z.array(z.string()), // Tags som en ARRAY av strenger
  description: z.string(),
  createdAt: z.string().datetime(),
});

// Hvis du har spesifikke felt fra databasen, kan du opprette et annet skjema
export const projectFromDbSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  tags: z.string(), // Tags som KOMMA-SEPARERT STRENG fra databasen (siden sqlite3 ikke kan lagre array med string)
  description: z.string(),
  created_at: z.string().datetime(), 
});

export const createProjectSchema = z.object({
    //id: z.string().uuid(), // Forventer ikke / vil ikke ha ID fra frontend ved opprettelse
    title: z.string().min(1),
    tags: z.array(z.string()), // Tags som en ARRAY av strenger
    description: z.string(),
    createdAt: z.string().datetime(),
  });


// Definerer typer - trenger ikke en types.ts fil
export type Project = z.infer<typeof projectSchema>;
export type ProjectFromDb = z.infer<typeof projectFromDbSchema>;

// Valideringsfunksjoner
export const validateCreateProject = (data: unknown) => {
  return createProjectSchema.safeParse(data);
};

export const validateProject = (data: unknown) => {
  return projectSchema.safeParse(data);
};
