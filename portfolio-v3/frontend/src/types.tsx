import type { z } from "zod";

import { projectSchema } from "./features/projects/helpers/schema";


/*
export type Project = {

  id: string, // UUID er en streng
  title: string,
  tags: string[],
  description: string
};
*/


export const actions = {
  add: "add",
  remove: "remove",
};

export type Action = (typeof actions)[keyof typeof actions];

export type Project = z.infer<typeof projectSchema>;